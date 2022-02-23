import jwt from "jsonwebtoken";
import UnAuthenticatedError from "../errors/unauthenticated.js";

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("unauthorized");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    throw new UnAuthenticatedError("unauthorized");
  }
};

export { authenticateUser };
