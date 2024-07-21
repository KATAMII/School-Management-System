import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const createTeacher = async (req, res) => {
  try {
    const { name, email, password, teachersclass, subject } = req.body;

    const hashpassword = bcrypt.hashSync(password, 10);
    const newTeacher = await prisma.teacher.create({
      data: {
        name,
        email,
        password: hashpassword,
        teachersclass,
        subject,
      },
    });
    res.status(201).json({ success: true, message: "Teacher registered successfully" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ success: false, message: "An error occurred in the server" });
  }
};

export const loginTeacher = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.teacher.findFirst({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "Wrong login credentials" });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Wrong login credentials" });
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.cookie("teacher_access_token", token);
    return res.status(200).json({ success: true, data: payload, token });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};

export const getTeachers = async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany();
    res.status(200).json({ success: true, data: teachers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching teachers' });
  }
};

export const getTeachersCount = async (req, res) => {
  try {
    const count = await prisma.teacher.count();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.json({ students });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentsByTeacher = async (req, res) => {
  const teacherId = req.user.id; 
  try {
    const students = await prisma.student.findMany({
      where: { teacherId: teacherId },
    });
    res.json({ students });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const submitGrade = async (req, res) => {
  const { studentId, subject, marks } = req.body;

  try {
    const grade = await prisma.grade.create({
      data: {
        studentId,
        teacherId: req.user.id,  
        subject,
        marks,
      },
    });
    res.json({ grade });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGradesByStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    const grades = await prisma.grade.findMany({
      where: { studentId },
    });

    res.json({ grades });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};