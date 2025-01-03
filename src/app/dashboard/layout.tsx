"use client";
import Sidebar from "@/components/layout/sidebar";
import { ACTIONS } from "@/store/Actions";
import { DataContext } from "@/store/GlobalState";
import { useContext, useEffect } from "react";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const {dispatch} = useContext(DataContext)

    // set logged in user to the state
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}")
        const token = localStorage.getItem("token") || ""

        dispatch({type:ACTIONS.USER, payload:user})
        dispatch({type:ACTIONS.TOKEN, payload:token})
    }, [])

    // 

    return (

        <div className=" relative">
            <Sidebar />

            <div className={`md:ml-[250px] relative`}>
                {children}
            </div>
        </div>

    );
}
