"use client"
import Header from "@/components/layout/header"
import React, { useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const transactions = [
    {
        id: 1,
        recipient: "John Doe",
        amount: "500",
        transactionType: "credit",
        transactionNo: "TXN12345",
        transactionDate: "2025-01-02",
    },
    {
        id: 2,
        recipient: "Jane Smith",
        amount: "300",
        transactionType: "debit",
        transactionNo: "TXN12346",
        transactionDate: "2025-01-01",
    },
    {
        id: 3,
        recipient: "Alice Johnson",
        amount: "700",
        transactionType: "credit",
        transactionNo: "TXN12347",
        transactionDate: "2025-01-01",
    },
    {
        id: 4,
        recipient: "John Doe",
        amount: "500",
        transactionType: "credit",
        transactionNo: "TXN12345",
        transactionDate: "2025-01-02",
    },
    {
        id: 5,
        recipient: "Jane Smith",
        amount: "300",
        transactionType: "debit",
        transactionNo: "TXN12346",
        transactionDate: "2025-01-01",
    },
    {
        id: 6,
        recipient: "Alice Johnson",
        amount: "700",
        transactionType: "credit",
        transactionNo: "TXN12347",
        transactionDate: "2025-01-01",
    },
    {
        id: 7,
        recipient: "John Doe",
        amount: "500",
        transactionType: "credit",
        transactionNo: "TXN12345",
        transactionDate: "2025-01-02",
    },
    {
        id: 8,
        recipient: "Jane Smith",
        amount: "300",
        transactionType: "debit",
        transactionNo: "TXN12346",
        transactionDate: "2025-01-01",
    },
    {
        id: 9,
        recipient: "Alice Johnson",
        amount: "700",
        transactionType: "credit",
        transactionNo: "TXN12347",
        transactionDate: "2025-01-01",
    },
    {
        id: 10,
        recipient: "John Doe",
        amount: "500",
        transactionType: "credit",
        transactionNo: "TXN12345",
        transactionDate: "2025-01-02",
    },
    {
        id: 11,
        recipient: "Jane Smith",
        amount: "300",
        transactionType: "debit",
        transactionNo: "TXN12346",
        transactionDate: "2025-01-01",
    },
    {
        id: 12,
        recipient: "Alice Johnson",
        amount: "700",
        transactionType: "credit",
        transactionNo: "TXN12347",
        transactionDate: "2025-01-01",
    },
];

const Transactions = () => {
    const [visible, setVisible] = useState(false)
    const [transactionType, setTransactionType] = useState("all")

    // 

    return (
        <>
            <Header title="Transactions" />
            <section className="p-5">

                <div className="flex items-center justify-between">
                    <Select onValueChange={(value) => setTransactionType(value)} value={transactionType}>
                        <SelectTrigger className="w-[200px] h-[45px] p-3 text-primary border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-300">
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>

                        <SelectContent className="bg-white">
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="success">Credit</SelectItem>
                            <SelectItem value="error">Debit</SelectItem>
                        </SelectContent>
                    </Select>


                    <input type="search" placeholder="Search transactions" className="border p-3 w-[300px] rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-300"/>
                </div>

                <div className="mt-10">
                    <h2 className="mb-5 font-semibold text-lg">All Transactions</h2>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
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
                                        <td className="py-5 px-6 text-center">₦ {transaction.amount}</td>
                                        <td
                                            className={`py-5 px-6 text-center`}
                                        >
                                            <span className={`py-1 px-4 rounded-lg ${transaction.transactionType === "credit"
                                                ? "bg-green-200"
                                                : "bg-red-200"
                                                }`}>
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
        </>
    )
}

export default Transactions