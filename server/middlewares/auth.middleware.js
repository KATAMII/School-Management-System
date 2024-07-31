import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.teacher_access_token;
  console.log(`Read cookie: ${token}`);
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(`Token valid: ${decoded}`);
    next();
  } catch (error) {
    console.log(`Token invalid: ${error.message}`);
    res.status(400).json({ message: "Invalid token" });
  }
};
