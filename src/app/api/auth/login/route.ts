import connectDB from "../../utils/connectDB";
import User from "../../models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../../utils/generateToken";


connectDB();

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // check if user already exists
    const user = await User.findOne({email})

    if (!user) 
      return NextResponse.json(
      { message: "This user does not exists" },
      { status: 400 }
    );

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return NextResponse.json(
        { message: "Incorrect Password" },
        { status: 400 })

        const token = createAccessToken({ id: user._id });


    return NextResponse.json({
      message: "Login Successful!", token, user
    });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }

}



