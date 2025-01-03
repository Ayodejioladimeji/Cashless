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

    // Check if the user has any active loans
    const existingLoan = await Loan.findOne({ user: user._id, status: "active" });

    if (existingLoan) {
      return NextResponse.json(
        { message: "You have an outstanding loan. Please repay it before applying for a new loan." },
        { status: 400 }
      );
    }

    const loanLimit = 200000

    // Parse request body
    const body = await req.json();
    const { loanAmount, tenure, purpose } = body;

    if (!loanAmount || !tenure || !purpose) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // check if user is trying to bypass limit
    if (loanAmount > loanLimit) {
      return NextResponse.json(
        { message: `Loan amount exceeds the limit of ${loanLimit}.` },
        { status: 400 }
      );
    }

    // Interest rate (5% per month)
    const interestRate = 0.05;
    const interest = loanAmount * interestRate * parseInt(tenure); 

    // Calculate repayment amount (loanAmount + interest)
    const repaymentAmount = loanAmount + interest;

    // Set disbursement date to the current date in ISO format
    const disbursementDate = new Date().toISOString();

    // Calculate repayment date based on tenure (in months), and set it in ISO format
    const repaymentDate = new Date();
    repaymentDate.setMonth(repaymentDate.getMonth() + parseInt(tenure));
    const repaymentDateISO = repaymentDate.toISOString();

    // Create the new loan with status "active"
    const newLoan = new Loan({
      user: user._id,
      loanAmount,
      repaymentAmount,
      interest,
      tenure,
      purpose,
      disbursementDate,
      repaymentDate: repaymentDateISO,
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




export async function GET(req: NextRequest) {
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

    // Fetch loans for the authenticated user
    const loans = await Loan.find({ user: user_auth.id }).sort("-createdAt");

    // If no loans are found
    if (loans.length === 0) {
      return NextResponse.json(
        { message: "No loans found for the user." },
        { status: 404 }
      );
    }

    // Return the loans
    return NextResponse.json(
      loans,
    );
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