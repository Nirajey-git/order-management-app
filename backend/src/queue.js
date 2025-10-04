import Queue from 'bull';
import prisma from './prisma.js';

const orderQueue = new Queue('order-confirmation',{
    redis: { host: process.env.REDIS_HOST || "localhost", port: 6379},
});

orderQueue.process(async (job) => {
    const { orderId } = job.data;
    console.log("Confirming order", orderId);
    await new Promise((res) => setTimeout(res, 2000));
    await prisma.order.update({
    where: { id: orderId },
    data: { status: "CONFIRMED" },
    });
});

export default orderQueue;