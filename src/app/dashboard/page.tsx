"use client"
import { AddMoneyModal } from "@/components/layout/add-money-modal";
import Header from "@/components/layout/header"
import { WithdrawMoneyModal } from "@/components/layout/withdraw";
import Loading from "@/components/ui/loading";
import { ACTIONS } from "@/store/Actions";
import { DataContext } from "@/store/GlobalState";
import { GetRequest } from "@/utils/request";
import { formatMoney, formatNumbers } from "@/utils/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react"
import moment from "moment";
import React, { useContext, useEffect, useState } from "react"


interface TransactionProps {
    _id: string,
    amount: number,
    type: string,
    recipient: string,
    reference: string,
    createdAt: string
}

const Overview = () => {
    const [visible, setVisible] = useState(false)
    const { state, dispatch } = useContext(DataContext)
    const [balance, setbalance] = useState<number>(0)
    const [recentTransactions, setRecentTransactions] = useState<TransactionProps[]>([])
    const [loading, setLoading] = useState(true)

    // get user balance
    useEffect(() => {
        if (state?.token) {
            const getBalance = async () => {
                const res = await GetRequest("/balance", state?.token)
                if (res?.status === 200 || res?.status === 201) {
                    setbalance(res?.data?.balance)
                }
            }
            getBalance()
        }
    }, [state?.token, state?.callback])

    // get recent transactions
    useEffect(() => {
        if (state?.token) {
            const getTransactions = async () => {
                const res = await GetRequest("/transaction", state?.token)
                if (res?.status === 200 || res?.status === 201) {
                    setRecentTransactions(res?.data)
                }
                setLoading(false)
            }
            getTransactions()
        }
    }, [state?.token, state?.callback])

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

                    <div className="flex items-center gap-3 mt-5 md:mt-0">
                        <button onClick={() => dispatch({ type: ACTIONS.ADD_MONEY_MODAL, payload: true })} className="bg-primary-500 text-white rounded-3xl flex items-center justify-center px-6 py-3 text-sm border border-transparent hover:bg-white hover:text-primary-500 hover:border-primary-500 transition duration-200">Add Money</button>
                        <button
                            onClick={() => dispatch({ type: ACTIONS.WITHDRAW_MONEY_MODAL, payload: true })}
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
                    <h1 className="text-3xl font-bold text-primary-500">{visible ? `₦ ${formatMoney(balance)}` : "*****"}</h1>
                </div>

                <div className="mt-10">
                    <h2 className="mb-5 font-semibold text-lg">Recent Transactions</h2>

                    <div className="relative overflow-x-auto">
                        {loading ? <div className="flex justify-center my-20">
                            <Loading width="40" height="40" color="#7141F8" />
                        </div>
                            :
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
                                    {recentTransactions?.slice(0, 10)?.map((transaction, index) => (
                                        <tr
                                            key={transaction._id}
                                            className="border-b border-gray-200 hover:bg-gray-100"
                                        >
                                            <td className="py-5 px-6 text-center">{index + 1}</td>
                                            <td className="py-5 px-6">{transaction.recipient}</td>
                                            <td className="py-5 px-6 text-center">₦{formatNumbers(transaction.amount)}</td>
                                            <td className="py-5 px-6 text-center">
                                                <span
                                                    className={`py-1 px-4 rounded-lg ${transaction.type === "credit"
                                                        ? "bg-green-200"
                                                        : "bg-red-200"
                                                        }`}
                                                >
                                                    {transaction.type}
                                                </span>
                                            </td>
                                            <td className="py-5 px-6 text-center">{transaction.reference}</td>
                                            <td className="py-5 px-6 text-center">{moment(transaction.createdAt).format("ll")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }

                        {!loading && recentTransactions?.length === 0 && <p className="text-gray-500 text-center mt-20">No recent transactions</p>}

                    </div>

                </div>
            </section>

            {state?.addMoneyModal && <AddMoneyModal />}
            {state?.withdrawMoneyModal && <WithdrawMoneyModal />}
        </>
    )
}

export default Overview