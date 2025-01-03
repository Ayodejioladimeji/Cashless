import connectDB from "../utils/connectDB";
import Wallet from "../models/wallet";
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

        // Fetch wallet for the user
        const wallet = await Wallet.findOne({ user: user_auth.id });

        if (!wallet) {
            return NextResponse.json(
                { message: "Wallet not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            wallet,
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
