import jwt from "jsonwebtoken";
import Users from "../models/user";
import { NextRequest} from "next/server";


interface JwtPayload {
  id: string;
}

const auth = async (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return new Response(JSON.stringify({ err: "Invalid Authentication." }), {
      status: 400,
    });
  }

  try {
    const token = authHeader.split(" ")[1]; // Bearer token
    const decoded = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET as string
    ) as JwtPayload;

    if (!decoded || !decoded.id) {
      return new Response(JSON.stringify({ err: "Invalid Authentication." }), {
        status: 400,
      });
    }

    const user = await Users.findOne({ _id: decoded.id });
    if (!user) {
      return new Response(JSON.stringify({ err: "User not found." }), {
        status: 404,
      });
    }

    // Return user data for use in other handlers
    return { id: user._id, role: user.role };
  } catch (err) {
    return new Response(JSON.stringify({ err: "Invalid Authentication." }), {
      status: 400,
    });
  }
};

export default auth;
