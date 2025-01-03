import connectDB from "../../utils/connectDB";
import User from "../../models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'


connectDB();

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();
    const { fullname, email, password } = body;

    if (!fullname || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await User.findOne({email})
    if (user) 
      return NextResponse.json(
      { message: "This email already exists" },
      { status: 400 }
    );

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new User({
      fullname,
      email,
      password: passwordHash,
    });

    await newUser.save();

    return NextResponse.json({
      message: "Account Registration Successful!",
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



