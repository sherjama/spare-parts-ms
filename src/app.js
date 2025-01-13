import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

//router declaration
import userRouter from "./routes/user.routes.js";
import partsRouter from "./routes/parts.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/parts", partsRouter);

export { app };
