import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("../prisma/.env") });

const prisma = new PrismaClient();
export default prisma;
