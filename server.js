//express
import express from "express";
const app = express();
//dotenv
import dotenv from "dotenv";
dotenv.config();

//express async errors
import "express-async-errors";

//morgan
import morgan from "morgan";

// DEPLOY
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

//SECURE CONNECTIONS IMPORTS
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// db connection
import connectDB from "./db/connect.js";

//routers
import authRoutes from "./routes/authRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";

//middleware import
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandleMiddleware from "./middleware/error-handler.js";
import { authenticateUser } from "./middleware/authenticateUser.js";
//morgan
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
// as body parser
app.use(express.json());

//SECURE CONNECTIONS
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

//DEPLOY && using express static to make them public to access
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", authenticateUser, jobsRoutes);

// get routes for deployment
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
//middleware
app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

const port = process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.DB);
    app.listen(port, () => {
      console.log("Server is running on " + port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
