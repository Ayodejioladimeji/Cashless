import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        recipient: {
            type: String,
            required: true,
        },
        amount: {
            type: String,
            required: true,
        },
        reference: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: "",
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        }
    },
    {
        timestamps: true,
    }
);

const Dataset = mongoose.models.transaction || mongoose.model("transaction", transactionSchema);
export default Dataset;