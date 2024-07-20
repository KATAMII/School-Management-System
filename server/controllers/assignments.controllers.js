import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createAssignment = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newAssignment = await prisma.assignments.create({
      data: {
        title,
        content,
      },
    });
    res.status(201).json({ success: true, message: "Assignment created successfully", data: newAssignment });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'Failed to create assignment' });
  }
};

export const getAssignments = async (req, res) => {
  try {
    const assignments = await prisma.assignments.findMany();
    res.status(200).json({ success: true, data: assignments });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch assignments' });
  }
};
export const getAssignmentsCount = async (req, res) => {
  try {
    const count = await prisma.assignments.count();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
