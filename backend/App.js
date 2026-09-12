import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import productsRouter from "./router/products.mjs";
import cartRouter from "./router/cart.mjs";
import mongoose from "mongoose";

const URL =
  "mongodb+srv://dhinesh:2012428@readify.efo1rnz.mongodb.net/?appName=Readify";
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

async function Run() {
  try {
    const client= await mongoose.connect(URL, { dbName: "Readify" });
    console.log("connected DB");
    app.listen(PORT, () => {
      console.log("Server running on port 3000");
    });
  } catch (error) {
    console.log("connection failed");
    console.log(error.message);
  }
}

Run();

app.use(cors());

app.use(express.json());
app.use(productsRouter);
app.use(cartRouter);

app.get("/", (req, res) => {
  console.log(new Date());
  res.status(200).send("api is running");
});

app.get("/api", (req, res) => {
  res.status(200).sendFile("./data/info.txt", { root: __dirname });
});
