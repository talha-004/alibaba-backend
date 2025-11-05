import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./Routers/users.route.js";
import productsRoutes from "./Routers/products.route.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use("/api/v1", userRoute);
app.use("/api/v1", productsRoutes);

app.listen(PORT, () => {
  console.log(`⭐ Server is running on PORT: ${PORT}`);
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log(`DB Connected Successfully!`);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: "DB Error", err: err.message });
    });
});
