import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import usersRouter from "./routes/users.route.js"
import studentsRouter from "./routes/students.routes.js"
import teachersRouter from "./routes/teachers.routes.js"
import assignmentsRouter from "./routes/assignments.routes.js"
import announcementsRouter from "./routes/announcements.routes.js"
import classesRouter from "./routes/classes.router.js"
import submitRouter from "./routes/submit.routes.js";
import { fileURLToPath } from 'url';
import path from "path"; 



import cors from "cors";

config();
const app = express(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE","PUT"],
    credentials: true 
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api/admin", usersRouter);
app.use("/api/student", studentsRouter);
app.use("/api/teacher", teachersRouter);
app.use("/api/assignment", assignmentsRouter);
app.use("/api/announcement", announcementsRouter);
app.use("/api/class", classesRouter);
app.use("/api/submit", submitRouter);


app.listen(3000, () => {
  console.log("Server running on port 3000 ...");
});