"use client";
import React, { useRef } from "react";
import { useState, useContext } from "react";
import Loading from "@/components/ui/loading";
import { PostRequest } from "@/utils/request";
import { DataContext } from "@/store/GlobalState";
import { ACTIONS } from "@/store/Actions";
import { formatMoney, removeNum } from "@/utils/utils";
import cogoToast from '@successtar/cogo-toast';

export const RepayLoanModal = () => {
    const [amount, setAmount] = useState<string>("")
    const [requestloading, setRequestloading] = useState<boolean>(false);
    const inputRef = useRef<any>(null);
    const { state, dispatch } = useContext(DataContext)
    const [errors, setErrors] = useState({ amount: "" });

    // validate form
    const validateForm = () => {
        const newErrors = { amount: "", };
        if (!amount) {
            newErrors.amount = "Amount is required";
        }

        setErrors(newErrors);
        return !newErrors.amount;
    };

    // handle submit
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const token = localStorage.getItem("token") || ""

        const payload = {
            repaymentAmount: Number(removeNum(amount)),
        }

        if (validateForm()) {
            setRequestloading(true)

            const res = await PostRequest("/loan/repay", payload, token)
            if (res?.status === 200 || res?.status === 201) {
                dispatch({ type: ACTIONS.CALLBACK, payload: !state?.callback })
                cogoToast.success(res?.data?.message)
                dispatch({ type: ACTIONS.REPAY_LOAN_MODAL, payload: false })
            }

            setRequestloading(false)
        }

    };

    //

    return (
        <div className="w-screen z-50 h-screen fixed top-0 right-0 left-0 flex items-center justify-center .">
            <div
                className="w-full h-full absolute bg-black opacity-20"
                onClick={() => dispatch({ type: ACTIONS.REPAY_LOAN_MODAL, payload: false })}
            ></div>
            <div className="bg-white w-[382px] lg:w-[450px] flex flex-col rounded-lg z-10 p-5 gap-6">
                <div>
                    <div className="w-full flex items-center justify-between mb-5">
                        <h1 className="text-[#1D2939] lg:font-bold text-xl">
                            Loan Payment
                        </h1>
                        <button
                            onClick={() => dispatch({ type: ACTIONS.REPAY_LOAN_MODAL, payload: false })}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                            >
                                <path
                                    d="M19.2806 18.7193C19.3503 18.789 19.4056 18.8717 19.4433 18.9628C19.481 19.0538 19.5004 19.1514 19.5004 19.2499C19.5004 19.3485 19.481 19.4461 19.4433 19.5371C19.4056 19.6281 19.3503 19.7109 19.2806 19.7806C19.2109 19.8502 19.1282 19.9055 19.0372 19.9432C18.9461 19.9809 18.8485 20.0003 18.75 20.0003C18.6514 20.0003 18.5539 19.9809 18.4628 19.9432C18.3718 19.9055 18.289 19.8502 18.2194 19.7806L12 13.5602L5.78061 19.7806C5.63988 19.9213 5.44901 20.0003 5.24999 20.0003C5.05097 20.0003 4.8601 19.9213 4.71936 19.7806C4.57863 19.6398 4.49957 19.449 4.49957 19.2499C4.49957 19.0509 4.57863 18.86 4.71936 18.7193L10.9397 12.4999L4.71936 6.28055C4.57863 6.13982 4.49957 5.94895 4.49957 5.74993C4.49957 5.55091 4.57863 5.36003 4.71936 5.2193C4.8601 5.07857 5.05097 4.99951 5.24999 4.99951C5.44901 4.99951 5.63988 5.07857 5.78061 5.2193L12 11.4396L18.2194 5.2193C18.3601 5.07857 18.551 4.99951 18.75 4.99951C18.949 4.99951 19.1399 5.07857 19.2806 5.2193C19.4213 5.36003 19.5004 5.55091 19.5004 5.74993C19.5004 5.94895 19.4213 6.13982 19.2806 6.28055L13.0603 12.4999L19.2806 18.7193Z"
                                    fill="#344054"
                                />
                            </svg>
                        </button>
                    </div>

                    <p className="text-[#586283] text-sm">
                        Please note that when you repay your loan before due date, you will still need to pay all the interest on the loan <span className="text-primary-500">(interest:5% monthly)</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-1">
                    <div className="mb-2">
                        <label htmlFor="channel-name" className="block text-sm mb-1 font-semibold">
                            Amount
                        </label>
                        <input
                            type="text"
                            name="channel-name"
                            id="channel-name"
                            value={amount}
                            placeholder="Enter loan amount"
                            onChange={(e) => {
                                setAmount(formatMoney(e.target.value)),
                                    setErrors((prevErrors) => ({ ...prevErrors, amount: "" }));
                            }
                            }
                            className="w-full py-3 text-sm text-[#747474] px-4 border rounded-md border-[#D0D0FD] outline-none focus:border-primary-500"
                            ref={inputRef}
                        />

                        {errors.amount && (
                            <small className="text-[12px] text-[#F81404]">
                                {errors.amount}
                            </small>
                        )}
                    </div>
                </form>

                <div className="w-full flex justify-end">
                    <div onClick={handleSubmit}>
                        <button
                            type="submit"
                            className="w-[140px] h-[40px] flex items-center justify-center rounded-md bg-[#7141F8] hover:bg-[#8760f8] text-white"
                        >
                            {requestloading ? (
                                <span className="flex items-center gap-x-2">
                                    <span className="animate-pulse">Requesting...</span>{" "}
                                    <Loading width="20" height="20" />
                                </span>
                            ) : (
                                <span>Request</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
