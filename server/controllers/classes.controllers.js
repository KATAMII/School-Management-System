import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getClasses = async (req, res) => {
  try {
    const classes = await prisma.class.findMany();
    res.json({ success: true, data: classes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createClass = async (req, res) => {
  const { className, classTeacher } = req.body;
  try {
    const newClass = await prisma.class.create({
      data: { className, classTeacher },
    });
    res.json({ success: true, data: newClass });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const deleteClass = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.class.delete({
      where: { id: id },
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getClassesCount = async (req, res) => {
  try {
    const count = await prisma.class.count();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
