import connectDB from "../utils/connectDB";
import Loan from "../models/loan";
import User from "../models/user";
import auth from "../middleware/auth";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const user_auth = await auth(req);
    if (!user_auth) {
      return NextResponse.json(
        { message: "Invalid Authentication" },
        { status: 401 }
      );
    }

    if (user_auth instanceof Response) {
      return user_auth;
    }

    const user = await User.findById(user_auth.id);

    // Parse request body
    const body = await req.json();
    const { loanAmount, tenure, purpose } = body;

    if (!loanAmount || !tenure || !purpose) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Interest rate (flat) is 4%
    const interestRate = 0.04;
    const interest = loanAmount * interestRate;

    // Calculate repayment amount
    const repaymentAmount = loanAmount + interest;

    // Set disbursement date to the current date
    const disbursementDate = new Date();

    // Calculate repayment date based on tenure (in months)
    const repaymentDate = new Date(disbursementDate);
    repaymentDate.setMonth(repaymentDate.getMonth() + tenure);

    // Create the new loan with status "active"
    const newLoan = new Loan({
      user:user._id,
      loanAmount,
      repaymentAmount,
      interest,
      tenure,
      purpose,
      disbursementDate,
      repaymentDate,
      status: "active",
    });

    await newLoan.save();

    return NextResponse.json({
      message: "Loan added successfully!",
      loan: newLoan,
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



