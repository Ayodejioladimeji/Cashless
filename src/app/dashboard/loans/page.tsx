"use client"
import Header from "@/components/layout/header"
import { RequestLoanModal } from "@/components/layout/request-loan-modal";
import { ACTIONS } from "@/store/Actions";
import { DataContext } from "@/store/GlobalState";
import { EyeIcon, EyeOffIcon } from "lucide-react"
import React, { useContext, useState } from "react"

const loans = [
    {
        id: 1,
        bankName: "First National Bank",
        loanAmount: "10,000",
        repaymentAmount: "11,500",
        interest: "15",
        bankAccount: "1234567890",
        disbursementDate: "2025-01-01",
        repaymentDate: "2025-12-31",
        status:"active"
    },
    {
        id: 2,
        bankName: "Citibank",
        loanAmount: "5,000",
        repaymentAmount: "5,750",
        interest: "15",
        bankAccount: "9876543210",
        disbursementDate: "2025-02-15",
        repaymentDate: "2025-11-15",
        status:"inactive"
    },
    {
        id: 3,
        bankName: "Chase Bank",
        loanAmount: "20,000",
        repaymentAmount: "23,000",
        interest: "15",
        bankAccount: "4561237890",
        disbursementDate: "2025-03-20",
        repaymentDate: "2026-03-20",
        status:"active"
    },
    {
        id: 4,
        bankName: "First National Bank",
        loanAmount: "10,000",
        repaymentAmount: "11,500",
        interest: "15",
        bankAccount: "1234567890",
        disbursementDate: "2025-01-01",
        repaymentDate: "2025-12-31",
        status:"active"
    },
    {
        id: 5,
        bankName: "Citibank",
        loanAmount: "5,000",
        repaymentAmount: "5,750",
        interest: "15",
        bankAccount: "9876543210",
        disbursementDate: "2025-02-15",
        repaymentDate: "2025-11-15",
        status:"inactive"
    },
    {
        id: 6,
        bankName: "Chase Bank",
        loanAmount: "20,000",
        repaymentAmount: "23,000",
        interest: "15",
        bankAccount: "4561237890",
        disbursementDate: "2025-03-20",
        repaymentDate: "2026-03-20",
        status:"active"
    },
];


const Loans = () => {
    const [visible, setVisible] = useState(false)
    const [showlimit, setShowlimit] = useState(false)
    const {state, dispatch} = useContext(DataContext)

    // 

    return (
        <>
            <Header title="Loans" />
            <section className="p-5">

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-base text-primary-500 font-medium">Loan Amount ₦50,000 Due on 30th Feb, 2025</p>
                    </div>

                    <button 
                     onClick={() => dispatch({type:ACTIONS.REQUEST_LOAN_MODAL, payload:true})}
                    className="bg-primary-500 text-white rounded-3xl flex items-center justify-center px-6 py-3 text-sm">Request Loan</button>

                </div>

                <div className="flex gap-5">
                    <div className="border rounded-md p-5 w-[300px] mt-5">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold">Outstanding Loan</span>
                            {!visible ? <EyeIcon size={20} className="text-gray-500 cursor-pointer" onClick={() => setVisible(true)} />
                                : <EyeOffIcon size={20} className="text-gray-500 cursor-pointer" onClick={() => setVisible(false)} />}

                        </div>
                        <h1 className="text-3xl font-bold text-primary-500">{visible ? "₦55,000" : "*****"}</h1>
                    </div>

                    <div className="border rounded-md p-5 w-[300px] mt-5">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold">Loan Limit</span>
                            {!showlimit ? <EyeIcon size={20} className="text-gray-500 cursor-pointer" onClick={() => setShowlimit(true)} />
                                : <EyeOffIcon size={20} className="text-gray-500 cursor-pointer" onClick={() => setShowlimit(false)} />}

                        </div>
                        <h1 className="text-3xl font-bold text-primary-500">{showlimit ? "₦500,000" : "*****"}</h1>
                    </div>
                </div>


                <div className="mt-10">
                    <h2 className="mb-5 font-semibold text-lg">Loan History</h2>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
                                    <th className="py-5 px-6 text-center">ID</th>
                                    <th className="py-5 px-6 text-center">Amount</th>
                                    <th className="py-5 px-6 text-center">Repayment Amount</th>
                                    <th className="py-5 px-6 text-center">interest</th>
                                    <th className="py-5 px-6 text-center">Status</th>
                                    <th className="py-5 px-6 text-center">Disburstment Date</th>
                                    <th className="py-5 px-6 text-center">Repayment Date</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {loans.map((loan) => (
                                    <tr
                                        key={loan.id}
                                        className="border-b border-gray-200 hover:bg-gray-100"
                                    >
                                        <td className="py-5 px-6 text-center">{loan.id}</td>
                                        <td className="py-5 px-6 text-center">₦{loan.loanAmount}</td>
                                        <td className="py-5 px-6 text-center">₦{loan.repaymentAmount}</td>
                                        <td className="py-5 px-6 text-center">{loan.interest}%</td>
                                        <td
                                            className={`py-5 px-6 text-center`}
                                        >
                                            <span className={`py-1 px-4 rounded-lg ${loan.status === "active"
                                                ? "bg-green-200"
                                                : "bg-red-200"
                                                }`}>
                                                {loan.status}
                                            </span>
                                        </td>
                                        <td className="py-5 px-6 text-center">{loan.disbursementDate}</td>
                                        <td className="py-5 px-6 text-center">{loan.repaymentDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

           {state?.requestLoanModal && <RequestLoanModal/>}
        </>
    )
}

export default Loans