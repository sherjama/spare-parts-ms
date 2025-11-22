import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";
import path from "path";

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

const allowedOrigins = process.env.CORS_ORIGIN.split(",");

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
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
import shelfRouter from "./routes/shelf.routes.js";
import reportsRouter from "./routes/reports.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/parts", partsRouter);
app.use("/api/v1/shelf", shelfRouter);
app.use("/api/v1/reports", reportsRouter);

//for error
app.use(errorHandler);
export { app };
