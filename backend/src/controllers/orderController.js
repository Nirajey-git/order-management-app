import prisma from '../prisma.js';
import redis from '../redis.js';
import orderQueue from '../queue.js';
import { getCacheKey } from '../helpers/cacheKey.js';


// create order
export async function createOrder(req, res) {
const { userId, items } = req.body;
if (!userId || !items?.length) return res.status(400).json({ error: "Invalid data" });

try {
    const result = await prisma.$transaction(async (tx) => {
    let total = 0;
    for (let it of items) {
        const p = await tx.product.findUnique({ where: { id: it.productId } });
        if (!p) throw new Error(`Product ${it.productId} not found`);
        if (p.stock < it.quantity) throw new Error(`Insufficient stock for product ${p.id}`);
        total += p.price * it.quantity;
    }

    const order = await tx.order.create({
    data: {
    user: { connect: { id: Number(userId) } }, 
    status: "PENDING",
    total,
    },
});


    for (let it of items) {
        const p = await tx.product.update({
            where: { id: it.productId },
            data: { stock: { decrement: it.quantity } },
        });

        await tx.orderItem.create({
        data: { orderId: order.id, productId: it.productId, quantity: it.quantity, price: p.price },
        });
    }

        return order;
    });

    // Invalidate cache
    const keys = await redis.keys("orders:*");
    if (keys.length) await redis.del(keys);

    // Queue confirmation
    await orderQueue.add({ orderId: result.id });

    res.json({ success: true, orderId: result.id });
    } catch (err) {
    res.status(500).json({ error: err.message });
}
}

// Get orders with pagination & search
export async function getOrders(req, res) {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const search = req.query.search || "";

    const cacheKey = getCacheKey(page, perPage, search);
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const where = search
    ? {
        OR: [
        { user: { name: { contains: search, mode: "insensitive" } } },
        { items: { some: { product: { name: { contains: search, mode: "insensitive" } } } } },
        ],
    }
    : {};

    const [orders, total] = await Promise.all([
    prisma.order.findMany({
        where,
        include: { user: true, items: { include: { product: true } } },
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy: { createdAt: "desc" },
    }),
    prisma.order.count({ where }),
    ]);

    const payload = { orders, total, page, perPage };
    await redis.set(cacheKey, JSON.stringify(payload), "EX", 30);

    res.json(payload);
}
