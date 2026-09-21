import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import productsRouter from "./router/products.mjs";
import cartRouter from "./router/cart.mjs";
import registerRouter from "./router/users.mjs";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";

const DBURL =
  "mongodb+srv://dhinesh:2012428@readify.efo1rnz.mongodb.net/?appName=Readify";
const PORT = 3000;
const SESSION_SECRET = "nike11";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

async function Run() {
  try {
    const client = await mongoose.connect(DBURL, { dbName: "Readify" });
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

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: DBURL,
      dbName: "Readify",
      collectionName: "sessions",
      ttl: 24 * 60 * 60,
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use(registerRouter);
app.use(productsRouter);
app.use(cartRouter);

app.get("/", (req, res) => {
  console.log(new Date());
  res.status(200).send("api is running");
});

app.get("/api", (req, res) => {
  res.status(200).sendFile("./data/info.txt", { root: __dirname });
});
