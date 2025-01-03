"use client"
import Header from "@/components/layout/header"
import { RepayLoanModal } from "@/components/layout/repay-loan";
import { RequestLoanModal } from "@/components/layout/request-loan-modal";
import Loading from "@/components/ui/loading";
import { ACTIONS } from "@/store/Actions";
import { DataContext } from "@/store/GlobalState";
import { GetRequest } from "@/utils/request";
import { formatNumbers } from "@/utils/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react"
import moment from "moment";
import React, { useContext, useEffect, useState } from "react"

// Define the Loan type
interface Loan {
    _id: number;
    bankName: string;
    loanAmount: string;
    repaymentAmount: string;
    interest: string;
    bankAccount: string;
    disbursementDate: string;
    repaymentDate: string;
    status: "active" | "inactive";
}

const Loans = () => {
    const [visible, setVisible] = useState(false)
    const [showlimit, setShowlimit] = useState(false)
    const { state, dispatch } = useContext(DataContext)
    const [loans, setLoans] = useState<Loan[]>([])
    const [loading, setLoading] = useState(true)
    const [activeLoan, setActiveLoan] = useState<Loan | null>(null)
    // get loans
    useEffect(() => {
        if (state?.token) {
            const getLoans = async () => {
                const res = await GetRequest("/loan", state?.token)
                if (res?.status === 200 || res?.status === 201) {
                    setLoans(res?.data)

                    // get active loan
                    const active_loan = res?.data?.find((item: any) => item?.status === "active")
                    setActiveLoan(active_loan)
                }
                setLoading(false)
            }
            getLoans()
        }
    }, [state?.token, state?.callback])


    // 

    return (
        <>
            <Header title="Loans" />
            <section className="px-3 py-5 md:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                        {!activeLoan ? <p className="text-base text-primary-500 font-medium">You have no active loan</p> : <p className="text-base text-primary-500 font-medium">Loan Amount ₦{activeLoan?.loanAmount} Due on {moment(activeLoan?.repaymentDate).format("ll")}</p>}
                    </div>

                    <div className="flex items-center gap-3 my-5 sm:my-0">
                        <button
                            onClick={() => dispatch({ type: ACTIONS.REQUEST_LOAN_MODAL, payload: true })}
                            className="bg-primary-500 text-white rounded-3xl flex items-center justify-center px-6 py-3 text-sm border border-transparent hover:bg-white hover:text-primary-500 hover:border-primary-500 transition duration-200">Request Loan
                        </button>

                        <button
                            onClick={() => dispatch({ type: ACTIONS.REPAY_LOAN_MODAL, payload: true })}
                            className="bg-white text-primary-500 border border-primary-500 rounded-3xl flex items-center justify-center px-6 py-3 text-sm">Repay Loan
                        </button>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-5">
                    <div className="border rounded-md p-5 sm:w-[300px] mt-5">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold">Outstanding Loan</span>
                            {!visible ? <EyeIcon size={20} className="text-gray-500 cursor-pointer" onClick={() => setVisible(true)} />
                                : <EyeOffIcon size={20} className="text-gray-500 cursor-pointer" onClick={() => setVisible(false)} />}
                        </div>
                        <h1 className="text-3xl font-bold text-primary-500">{visible ? `₦${!activeLoan ? "0" : formatNumbers(activeLoan?.loanAmount)}` : "*****"}</h1>
                    </div>

                    <div className="border rounded-md p-5 sm:w-[300px] mt-5">
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
                        {loading ? <div className="flex justify-center my-20">
                            <Loading width="40" height="40" color="#7141F8" />
                        </div>
                            :
                            <table className="w-[900px] lg:min-w-full bg-white border border-gray-200 rounded-lg">
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
                                    {loans.map((loan, index: number) => (
                                        <tr
                                            key={index}
                                            className="border-b border-gray-200 hover:bg-gray-100"
                                        >
                                            <td className="py-5 px-6 text-center">{index + 1}</td>
                                            <td className="py-5 px-6 text-center">₦{formatNumbers(loan.loanAmount)}</td>
                                            <td className="py-5 px-6 text-center">₦{formatNumbers(loan.repaymentAmount)}</td>
                                            <td className="py-5 px-6 text-center">₦{formatNumbers(loan.interest)}</td>
                                            <td className={`py-5 px-6 text-center`}>
                                                <span className={`block py-1 w-[80px] rounded-md text-xs ${loan.status === "active"
                                                    ? "bg-green-200"
                                                    : "bg-red-200"
                                                    }`}>
                                                    {loan.status}
                                                </span>
                                            </td>
                                            <td className="py-5 px-6 text-center">{moment(loan.disbursementDate).format("ll")}</td>
                                            <td className="py-5 px-6 text-center">{moment(loan.repaymentDate).format("ll")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }
                    </div>

                    {!loading && loans?.length === 0 && <p className="text-gray-500 text-center mt-20">No available loans</p>}

                </div>
                {state?.requestLoanModal && <RequestLoanModal />}
                {state?.repayLoanModal && <RepayLoanModal />}
            </section>
        </>
    )
}

export default Loans
