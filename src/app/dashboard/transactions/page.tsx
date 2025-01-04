"use client"
import Header from "@/components/layout/header"
import React, { useContext, useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DataContext } from "@/store/GlobalState";
import { GetRequest } from "@/utils/request";
import Loading from "@/components/ui/loading";
import { filterData, sortData } from "@/utils/utils";

interface TransactionProps {
    _id: string,
    amount: number,
    type: string,
    recipient: string,
    reference: string,
    createdAt: string
}

const Transactions = () => {
    const [transactions, setTransactions] = useState<TransactionProps[]>([])
    const { state} = useContext(DataContext)
    const [loading, setLoading] = useState(true)
    const [sortInput, setSortInput] = useState<string>("all")
    const [filterInput, setFilterInput] = useState<string>("")


    useEffect(() => {
        if (state?.token) {
            const getTransactions = async () => {
                const res = await GetRequest("/transaction", state?.token)
                if (res?.status === 200 || res?.status === 201) {
                    setTransactions(res?.data)
                }
                setLoading(false)
            }
            getTransactions()
        }
    }, [state?.token, state?.callback])

    const sortedData = sortData(transactions, sortInput)
    const filteredData = filterData(sortedData, filterInput)

    // 

    return (
        <>
            <Header title="Transactions" />
            <section className="p-5">

                <div className="flex flex-col xs:flex-row xs:items-center justify-between">
                    <Select onValueChange={(value) => setSortInput(value)} value={sortInput}>
                        <SelectTrigger className="w-full xs:w-[200px] h-[45px] mb-4 xs:mb-0 p-3 text-primary border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-300">
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>

                        <SelectContent className="bg-white">
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="credit">Credit</SelectItem>
                            <SelectItem value="debit">Debit</SelectItem>
                        </SelectContent>
                    </Select>


                    <input type="search" value={filterInput} onChange={(e) => setFilterInput(e.target.value)} placeholder="Search transactions" className="border p-3 w-full xs:w-[250px] lg:w-[300px] rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-300" />
                </div>

                <div className="mt-10">
                    <h2 className="mb-5 font-semibold text-lg">All Transactions</h2>

                    <div className="overflow-x-auto">
                        {loading ? <div className="flex justify-center my-20">
                            <Loading width="40" height="40" color="#7141F8" />
                        </div>
                            :
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
                                    {filteredData?.map((transaction, index) => (
                                        <tr
                                            key={transaction._id}
                                            className="border-b border-gray-200 hover:bg-gray-100"
                                        >
                                            <td className="py-5 px-6 text-center">{index + 1}</td>
                                            <td className="py-5 px-6">{transaction.recipient}</td>
                                            <td className="py-5 px-6 text-center">₦ {transaction.amount}</td>
                                            <td
                                                className={`py-5 px-6 text-center`}
                                            >
                                                <span className={`py-1 px-4 rounded-lg ${transaction.type === "credit"
                                                    ? "bg-green-200"
                                                    : "bg-red-200"
                                                    }`}>
                                                    {transaction.type}
                                                </span>

                                            </td>
                                            <td className="py-5 px-6 text-center">{transaction.reference}</td>
                                            <td className="py-5 px-6 text-center">{transaction.createdAt}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }

                        {!loading && (transactions?.length === 0 || filteredData?.length ===0) && <p className="text-gray-500 text-center mt-20">No transactions found</p>}

                    </div>
                </div>
            </section>
        </>
    )
}

export default Transactions