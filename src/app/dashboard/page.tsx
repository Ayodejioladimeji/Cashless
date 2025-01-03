"use client"
import { AddMoneyModal } from "@/components/layout/add-money-modal";
import Header from "@/components/layout/header"
import { ACTIONS } from "@/store/Actions";
import { DataContext } from "@/store/GlobalState";
import { EyeIcon, EyeOffIcon } from "lucide-react"
import React, { useContext, useState } from "react"

const transactions = [
    {
        id: 1,
        recipient: "John Doe",
        amount: "$500",
        transactionType: "credit",
        transactionNo: "TXN12345",
        transactionDate: "2025-01-02",
    },
    {
        id: 2,
        recipient: "Jane Smith",
        amount: "$300",
        transactionType: "debit",
        transactionNo: "TXN12346",
        transactionDate: "2025-01-01",
    },
    {
        id: 3,
        recipient: "Alice Johnson",
        amount: "$700",
        transactionType: "credit",
        transactionNo: "TXN12347",
        transactionDate: "2025-01-01",
    },
    {
        id: 4,
        recipient: "John Doe",
        amount: "$500",
        transactionType: "credit",
        transactionNo: "TXN12345",
        transactionDate: "2025-01-02",
    },
    {
        id: 5,
        recipient: "Jane Smith",
        amount: "$300",
        transactionType: "debit",
        transactionNo: "TXN12346",
        transactionDate: "2025-01-01",
    },
    {
        id: 6,
        recipient: "Alice Johnson",
        amount: "$700",
        transactionType: "credit",
        transactionNo: "TXN12347",
        transactionDate: "2025-01-01",
    },
    {
        id: 7,
        recipient: "John Doe",
        amount: "$500",
        transactionType: "credit",
        transactionNo: "TXN12345",
        transactionDate: "2025-01-02",
    },
    {
        id: 8,
        recipient: "Jane Smith",
        amount: "$300",
        transactionType: "debit",
        transactionNo: "TXN12346",
        transactionDate: "2025-01-01",
    },
    {
        id: 9,
        recipient: "Alice Johnson",
        amount: "$700",
        transactionType: "credit",
        transactionNo: "TXN12347",
        transactionDate: "2025-01-01",
    },
    {
        id: 10,
        recipient: "John Doe",
        amount: "$500",
        transactionType: "credit",
        transactionNo: "TXN12345",
        transactionDate: "2025-01-02",
    },
    {
        id: 11,
        recipient: "Jane Smith",
        amount: "$300",
        transactionType: "debit",
        transactionNo: "TXN12346",
        transactionDate: "2025-01-01",
    },
    {
        id: 12,
        recipient: "Alice Johnson",
        amount: "$700",
        transactionType: "credit",
        transactionNo: "TXN12347",
        transactionDate: "2025-01-01",
    },
];

const Overview = () => {
    const [visible, setVisible] = useState(false)
    const { state, dispatch } = useContext(DataContext)
    console.log(state?.user)

    // 

    return (
        <>
            <Header title="Dashboard" />
            <section className="p-3 sm:p-5">

                <div className="flex flex-col sm:flex-row sm:items-center  sm:justify-between">
                    <div>
                        <h1 className="text-xl md:text-2xl font-semibold">Welcome Back!</h1>
                        <p className="text-lg font-medium">{state?.user?.fullname}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={() => dispatch({ type: ACTIONS.ADD_MONEY_MODAL, payload: true })} className="bg-primary-500 text-white rounded-3xl flex items-center justify-center px-6 py-3 text-sm border border-transparent hover:bg-white hover:text-primary-500 hover:border-primary-500 transition duration-200">Add Money</button>
                        <button
                            // onClick={() => dispatch({ type: ACTIONS.ADD_MONEY_MODAL, payload: true })}
                            className="bg-white text-primary-500 border border-primary-500 rounded-3xl flex items-center justify-center px-6 py-3 text-sm hover:bg-primary-500 hover:text-white hover:border-transparent transition duration-200">Withdraw
                        </button>
                    </div>

                </div>

                <div className="border rounded-md p-5 sm:w-[300px] mt-5">
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold">Balance</span>
                        {!visible ? <EyeIcon size={20} className="text-gray-500 cursor-pointer" onClick={() => setVisible(true)} />
                            : <EyeOffIcon size={20} className="text-gray-500 cursor-pointer" onClick={() => setVisible(false)} />}

                    </div>
                    <h1 className="text-3xl font-bold text-primary-500">{visible ? "₦55,000" : "*****"}</h1>
                </div>

                <div className="mt-10">
                    <h2 className="mb-5 font-semibold text-lg">Recent Transactions</h2>

                    <div className="relative overflow-x-auto">
                        <table className="w-[900px] lg:min-w-full bg-white border border-gray-200 rounded-lg">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
                                    <th className="py-5 px-6 text-center">ID</th>
                                    <th className="py-5 px-6 text-left">Recipient</th>
                                    <th className="py-5 px-6 text-center">Amount</th>
                                    <th className="py-5 px-6 text-center">Transaction Type</th>
                                    <th className="py-5 px-6 text-center">Transaction No</th>
                                    <th className="py-5 px-6 text-center">Transaction Date</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {transactions.map((transaction) => (
                                    <tr
                                        key={transaction.id}
                                        className="border-b border-gray-200 hover:bg-gray-100"
                                    >
                                        <td className="py-5 px-6 text-center">{transaction.id}</td>
                                        <td className="py-5 px-6">{transaction.recipient}</td>
                                        <td className="py-5 px-6 text-center">{transaction.amount}</td>
                                        <td className="py-5 px-6 text-center">
                                            <span
                                                className={`py-1 px-4 rounded-lg ${transaction.transactionType === "credit"
                                                    ? "bg-green-200"
                                                    : "bg-red-200"
                                                    }`}
                                            >
                                                {transaction.transactionType}
                                            </span>
                                        </td>
                                        <td className="py-5 px-6 text-center">{transaction.transactionNo}</td>
                                        <td className="py-5 px-6 text-center">{transaction.transactionDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </section>

            {state?.addMoneyModal && <AddMoneyModal />}
        </>
    )
}

export default Overview