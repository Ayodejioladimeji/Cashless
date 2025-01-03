import connectDB from "../utils/connectDB";
import Transaction from "../models/transaction";
import auth from "../middleware/auth";
import { NextRequest, NextResponse } from "next/server";

connectDB();

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

        // Fetch all transactions for the authenticated user
        const transactions = await Transaction.find({ user: user_auth.id }).sort({
            createdAt: -1,
        });

        return NextResponse.json(
            transactions
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
