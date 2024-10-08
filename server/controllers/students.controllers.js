import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const createStudent = async (req, res) => {
  try {
    const { name, email, password, studentclass, teacherId } = req.body;

    const hashpassword = bcrypt.hashSync(password, 10);
    const newstudent = await prisma.student.create({
      data: {
        name,
        email,
        password: hashpassword,
        studentclass,
        teacherId,
      },
    });
    res
      .status(201)
      .json({ success: true, message: "student registered successfully" });
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .json({ success: false, message: "An error occurred in the server" });
  }
};

export const loginStudent = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.student.findFirst({
      where: { email },
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong login credentials" });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong login credentials" });
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.cookie("student_access_token", token);
    return res.status(200).json({ success: true, data: payload, token });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};
export const getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching students" });
  }
};
export const getStudentsCount = async (req, res) => {
  try {
    const count = await prisma.student.count();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentDetails = async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { id: req.user.id },
    });
    if (student) {
      res.json({ success: true, data: student });
    } else {
      res.status(404).json({ success: false, message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletestudent = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.student.delete({
      where: { id: id },
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
