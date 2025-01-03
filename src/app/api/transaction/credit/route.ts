import connectDB from "../../utils/connectDB";
import Transaction from "../../models/transaction";
import Wallet from "../../models/wallet";
import User from "../../models/user";
import auth from "../../middleware/auth";
import { NextRequest, NextResponse } from "next/server";
import { generateTransactionReference } from "@/utils/utils";

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
        const { amount, recipient } = body;

        if (!amount || !recipient) {
            return NextResponse.json(
                { message: "Amount and recipient are required." },
                { status: 400 }
            );
        }

        if (amount <= 0) {
            return NextResponse.json(
                { message: "Amount must be greater than 0." },
                { status: 400 }
            );
        }

        // Find or create wallet for the user
        let wallet = await Wallet.findOne({ user: user._id });
        if (!wallet) {
            wallet = new Wallet({ user: user._id });
        }

        // Update wallet balance
        wallet.balance += amount;
        await wallet.save();

        // Log the transaction
        const newTransaction = new Transaction({
            user: user._id,
            amount,
            type: "credit",
            recipient,
            reference:generateTransactionReference()
        });

        await newTransaction.save();

        return NextResponse.json({
            message: "Wallet credited successfully!",
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
