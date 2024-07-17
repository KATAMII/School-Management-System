import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import usersRouter from "./routes/users.route.js"
import cors from "cors";

config();
const app = express(); 

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true 
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); 
app.use("/api/admin", usersRouter);



app.listen(3000, () => {
  console.log("Server running on port 3000 ...");
});