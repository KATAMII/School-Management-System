import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const validateInformation = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name)
    return res
      .status(400)
      .json({ success: false, message: "lastname  is required" });
  if (!email)
    return res
      .status(400)
      .json({ success: false, message: "email is required" });
  if (!password)
    return res
      .status(400)
      .json({ success: false, message: "password is required" });
  const userWithEmail = await prisma.user.findFirst({
    where: { email: email },
  });
  if (userWithEmail)
    return res
      .status(400)
      .json({ success: false, message: "Email already exist" });
  next();
};
