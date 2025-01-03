import jwt from "jsonwebtoken";
import Users from "../models/user";
import { NextApiRequest, NextApiResponse } from "next";

interface JwtPayload {
  id: string; 
}

const auth = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({ err: "Invalid Authentication." });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET as string 
    ) as JwtPayload;

    if (!decoded || !decoded.id) {
      return res.status(400).json({ err: "Invalid Authentication." });
    }

    const user = await Users.findOne({ _id: decoded.id });
    if (!user) {
      return res.status(404).json({ err: "User not found." });
    }

    return { id: user._id, role: user.role };
  } catch (err) {
    return res.status(400).json({ err: "Invalid Authentication." });
  }
};

export default auth;
