import { Router } from "express";
import {
  usersRegisterSchema,
  usersLoginSchema,
} from "../utils/validationSchemas.mjs";
import Users from "../modles/userModle.mjs";
import bcrypt from "bcrypt";

const router = Router();

router.post("/api/auth/register", async (req, res) => {
  const { error, value } = usersRegisterSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  const { email, password } = value;
  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({ ...value, password: hashPassword });
    res.status(200).send({ message: "User Created" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/api/auth/login", async (req, res) => {
  const { error, value } = usersLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  const { email, password } = value;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const samePassword = await bcrypt.compare(password, user.password);
    if (!samePassword) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    req.session.userId = user._id;
    //console.log("USER ID:", user._id);
    //console.log("SESSION:", req.session);

    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
