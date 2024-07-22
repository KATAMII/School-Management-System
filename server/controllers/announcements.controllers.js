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

export const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.announcements.delete({
      where: { id: id }, 
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const updateAnnouncement = async (req, res) => {
  const { id, title, content } = req.body;
  try {
    const updatedAnnouncement = await prisma.announcements.update({
      where: { id: id },
      data: { title, content },
    });
    res.json({ success: true, data: updatedAnnouncement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};