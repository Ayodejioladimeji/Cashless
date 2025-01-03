"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PostRequest } from "@/utils/request";
import Loading from "@/components/ui/loading";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import cogoToast from '@successtar/cogo-toast';



//

function Signup() {
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ email: "", password: "", fullname:"" });
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        const newErrors = { email: "", password: "", fullname:"" };
        if (!fullname) {
            newErrors.fullname = "Full name is required";
        }

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Invalid email address";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return !newErrors.email && !newErrors.password && !newErrors.fullname;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            setLoading(true);

            const payload = {
                fullname,
                email,
                password,
            };

            const res = await PostRequest("/auth/sign-up", payload);

            if (res?.status === 200 || res?.status === 201) {
                cogoToast.success("Registration Successful")
                

                setTimeout(() => {
                    router.push("/");
                }, 100);
            }
            setLoading(false)
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFullname(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, fullname: "" }));
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    };


    //

    return (
        <>
            <main className="w-full min-h-screen flex flex-col">
                <section className="w-full md:w-[55%] flex flex-col max-w-xs md:max-w-lg mx-auto items-start justify-start pt-[20px] md:pt-0">

                    <div className="w-full flex flex-col justify-center mt-[60px] md:mt-[80px] items-center gap-[8px] mb-[32px]">
                        <h1 className="w-full text-center text-primary-500 text-[24px] md:text-[28px] font-[600] leading-[30px] md:leading-[35px]">
                            Join Cashless Today!
                        </h1>
                        <p className="w-full text-center text-[14px] md:text-[16px] text-[#344054] font-[400] leading-[21px] md:leading-[27px]">
                            {`Providing you with sure loan in realtime!`}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="flex flex-col gap-[16px]">
                            <div className="w-full flex flex-col gap-[8px] relative">
                                <label
                                    htmlFor="email"
                                    className="text-[14px] font-[400] leading-[21px]"
                                >
                                    Full Name
                                </label>

                                <div className="w-full flex flex-col gap-[2px]">
                                    <input
                                        type="text"
                                        value={fullname}
                                        onChange={handleNameChange}
                                        placeholder="Enter your fullname"
                                        className={`w-full text-[14px] text-[#667085] leading-[15.12px] font-[500] h-[48px] border ${errors.fullname ? "border-[#F81404]" : "border-[#D0D0FD]"
                                            } outline-none rounded-md py-[13px] pl-[13px]`}
                                    />
                                    {errors.fullname && (
                                        <small className="text-[12px] text-[#F81404]">
                                            {errors.fullname}
                                        </small>
                                    )}
                                </div>
                            </div>

                            <div className="w-full flex flex-col gap-[8px] relative">
                                <label
                                    htmlFor="email"
                                    className="text-[14px] font-[400] leading-[21px]"
                                >
                                    Email address
                                </label>

                                <div className="w-full flex flex-col gap-[2px]">
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={handleEmailChange}
                                        placeholder="Enter your email"
                                        className={`w-full text-[14px] text-[#667085] leading-[15.12px] font-[500] h-[48px] border ${errors.email ? "border-[#F81404]" : "border-[#D0D0FD]"
                                            } outline-none rounded-md py-[13px] pl-[13px]`}
                                    />
                                    {errors.email && (
                                        <small className="text-[12px] text-[#F81404]">
                                            {errors.email}
                                        </small>
                                    )}
                                </div>
                            </div>

                            <div className="w-full flex flex-col gap-[8px] relative">
                                <label
                                    htmlFor="password"
                                    className="text-[14px] font-[400] leading-[21px]"
                                >
                                    Password
                                </label>

                                <div className="w-full flex flex-col gap-[2px]">
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={handlePasswordChange}
                                            placeholder="Password"
                                            className={`w-full text-[14px] text-[#667085] leading-[15.12px] font-[500] h-[48px] border ${errors.password
                                                ? "border-[#F81404]"
                                                : "border-[#D0D0FD]"
                                                } outline-none rounded-md py-[13px] pl-[13px] pr-[40px]`}
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                                        >
                                            {!showPassword ? <EyeIcon size={20} className="text-gray-400" />
                                                : <EyeOffIcon size={20} className="text-gray-400" />}

                                        </button>
                                    </div>
                                    {errors.password && (
                                        <small className="text-[12px] text-[#F81404]">
                                            {errors.password}
                                        </small>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="flex items-center justify-center mt-[32px] w-full h-[50px] rounded-md bg-[#7141F8] hover:bg-[#8760f8] text-white"
                            // disabled={loading ? true : false}
                        >
                            {loading ? (
                                <span className="flex items-center gap-x-2">
                                    <span className="animate-pulse">Signining up...</span>{" "}
                                    <Loading width="20" height="40" />
                                </span>
                            ) : (
                                <span>SignUp</span>
                            )}
                        </button>

                        <div className="flex justify-center items-center mt-5">
                            <p className="text-[14px] font-[400] leading-[21px]">
                                Already have an account?{" "}
                                <Link href="/">
                                    <span className="text-[14px] font-[500] leading-[21px] text-[#7141F8] hover:text-[#0A0A0A]">
                                        Login
                                    </span>
                                </Link>
                            </p>
                        </div>

                    </form>
                </section>
            </main>
        </>
    );
}

export default Signup;
