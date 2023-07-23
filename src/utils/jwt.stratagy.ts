import jwt from "jsonwebtoken";

interface tokenPayload {
  id: string;
  username: string;
}

export const generateToken = (payload: tokenPayload) => {
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secretKey as string, { expiresIn: "1h" });
  return token;
};
