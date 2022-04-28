import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config";
const authenticate: RequestHandler = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader)
      throw new Error("No authrization header provided");
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET);

    next();
  } catch (err: any) {
    res.status(401);
    res.json(err.message);
    return;
  }
};
export default authenticate;
