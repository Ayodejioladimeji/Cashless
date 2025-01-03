import connectDB from "../../utils/connectDB";
import Loan from "../../models/loan";
import User from "../../models/user";
import auth from "../../middleware/auth";
import { NextRequest, NextResponse } from "next/server";

connectDB();

// POST request to repay loan
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

        // Parse request body (repayment amount)
        const body = await req.json();
        const { repaymentAmount } = body;

        if (!repaymentAmount || repaymentAmount <= 0) {
            return NextResponse.json(
                { message: "Please provide a valid repayment amount." },
                { status: 400 }
            );
        }

        // Fetch the user's active loan
        const existingLoan = await Loan.findOne({ user: user._id, status: "active" });

        if (!existingLoan) {
            return NextResponse.json(
                { message: "No active loan found for this user." },
                { status: 400 }
            );
        }

        // Check if the repayment amount is enough to repay the loan
        if (repaymentAmount < existingLoan.repaymentAmount) {
            return NextResponse.json(
                { message: `The repayment amount should be at least ${existingLoan.repaymentAmount}.` },
                { status: 400 }
            );
        }

        // Update loan status to "inactive" and set repayment date
        existingLoan.status = "inactive";
        existingLoan.repaymentDate = new Date().toISOString(); // Set repayment date to current date

        // Optionally, we can store the repayment amount if needed for tracking purposes
        existingLoan.amountRepaid = repaymentAmount;

        // Save the updated loan
        await existingLoan.save();

        return NextResponse.json({
            message: "Loan repaid successfully!",
            loan: existingLoan,
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
