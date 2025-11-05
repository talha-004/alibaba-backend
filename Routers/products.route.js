import express from "express";
import { getAllProducts } from "../Controllers/products.controller.js";

const router = express.Router();

router.get("/products", getAllProducts);

export default router;
