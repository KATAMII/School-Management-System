import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

export const submitAssignment = async (req, res) => {
  const { title, content } = req.body;
  const file = req.file;

  if (!file) {
    return res
      .status(400)
      .json({ success: false, message: "File is required" });
  }

  try {
    const fileName = `${uuidv4()}_${file.originalname}`;
    const filePath = path.join(process.cwd(), "uploads", fileName);

    fs.renameSync(file.path, filePath);

    const assignmentData = {
      title,
      content,
      fileUrl: `/uploads/${fileName}`,
    };

    if (req.body.studentId) {
      assignmentData.studentId = req.body.studentId;
    }

    const assignment = await prisma.submittedAssignment.create({
      data: assignmentData,
    });

    res.status(201).json({ success: true, data: assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
