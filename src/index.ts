import express, { Express } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/users";

const app: Express = express();

dotenv.config();

const port: string | undefined = process.env.PORT;

//middlewares
app.use(express.json());

//routes
app.use("/api", [userRoutes]);

app.listen(port, () => {
  console.log(`API is working on port ${port}`);
});
