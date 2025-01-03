import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
    {
        loanAmount: {
            type: Number,
            required: true,
        },
        repaymentAmount: {
            type: Number,
            required: true,
        },
        interest: {
            type: String,
            required: true,
        },
        tenure: {
            type: String,
            required: true,
        },
        purpose: {
            type: String,
            required: true,
        },
        disbursementDate: {
            type: String,
            required: true,
        },
        repaymentDate: {
            type: String,
            required: true,
        },
        status: {
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

let Dataset = mongoose.models.loan || mongoose.model("loan", loanSchema);
export default Dataset;