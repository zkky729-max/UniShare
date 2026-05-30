import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ⚠️ قاعدة بيانات مؤقتة (لاحقًا نستبدلوها بـ MongoDB)
const users: any[] = [];

// 🔑 Secret key (لاحقًا نحطوها في .env)
const JWT_SECRET = "secret_key";

// ======================
// 🟢 REGISTER
// ======================
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // check user exists
  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const user = {
    id: Date.now(),
    email,
    password: hashedPassword
  };

  users.push(user);

  res.json({
    message: "User created successfully"
  });
};

// ======================
// 🔵 LOGIN
// ======================
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // find user
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // check password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // create token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email
    }
  });
};

// ======================
// 🟡 ME (test route)
// ======================
export const me = (req: Request, res: Response) => {
  res.json({
    message: "Protected route working (not secured yet)"
  });
};