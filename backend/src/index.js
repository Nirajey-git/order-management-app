import express from 'express';
import ordersRouter from './routes/orders.js';
import productsRouter from './routes/products.js';
import usersRouter from './routes/users.js';
import cors from "cors";






const app = express();
app.use(cors());
app.use(express.json());

app.use("/orders", ordersRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});