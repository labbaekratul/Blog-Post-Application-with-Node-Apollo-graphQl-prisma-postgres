import { tokenParams } from "interfaces/mixin";
import jwt from "jsonwebtoken";

export const generateToken = (payload: tokenParams) => {
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secretKey as string, { expiresIn: "1h" });
  return token;
};
