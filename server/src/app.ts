import express from "express";
import cors from "cors";
import path from "path";

const app = express();

// middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// static uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

export default app;