import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createAnnouncements = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newAssignment = await prisma.announcements.create({
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

export const getAnnouncements = async (req, res) => {
  try {
    const assignments = await prisma.announcements.findMany();
    res.status(200).json({ success: true, data: assignments });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch assignments' });
  }
};
