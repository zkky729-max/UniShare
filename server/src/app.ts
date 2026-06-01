import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import storageRoutes from "./routes/storage.routes";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/storage", storageRoutes);

export default app;