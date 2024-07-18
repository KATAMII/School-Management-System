import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashpassword = bcrypt.hashSync(password, 10);
    const newuser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashpassword,
        
      },
    });
    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ success: false, message: "An error occurred in the server" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
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
      name:user.name,
      email: user.email,
      
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.cookie("admin_access_token", token);
    return res.status(200).json({ success: true, data: payload, token });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};