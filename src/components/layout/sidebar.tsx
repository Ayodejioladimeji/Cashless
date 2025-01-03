import { ACTIONS } from "@/store/Actions";
import { DataContext } from "@/store/GlobalState";
import { BarChart2Icon, CreditCardIcon, HandCoins, LogOut, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";

const Sidebar = () => {
    const pathname = usePathname()
    const router = useRouter()
    const {state, dispatch} = useContext(DataContext)

    const handleLogout = () => {
        localStorage.clear();
        router.push("/");
    };

    // 

    return (
        <aside className={`w-[250px] h-screen border-r bg-white fixed top-0 z-50 md:z-0 md:translate-x-0 transition-transform duration-300 ease-in-out ${state?.openSidebar === true ? "translate-x-0" : "-translate-x-80"}`}>
            <div className="pb-6 ">
                <div className="h-[80px] flex items-center justify-center text-primary-500 font-bold text-2xl mb-10 border-b">
                    Cashless

                    <XIcon
                    onClick={() => dispatch({type:ACTIONS.OPEN_SIDEBAR, payload:false})}
                     className="absolute top-4 right-5 cursor-pointer flex md:hidden"/>
                </div>

                <ul className="space-y-4 px-3" onClick={() => dispatch({ type: ACTIONS.OPEN_SIDEBAR, payload: false })}>
                    <li>
                        <Link
                            href="/dashboard"
                            className={`flex items-center gap-3 px-2 py-2 rounded-md ${pathname === "/dashboard" ? "bg-primary-500 text-white" : "hover:bg-primary-200"}`}
                        >
                            <BarChart2Icon />
                            <span>Overview</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/loans"
                            className={`flex items-center gap-3 px-4 py-2 rounded-md ${pathname === "/dashboard/loans" ? "bg-primary-500 text-white" : "hover:bg-primary-200"}`}
                        >
                            <HandCoins />
                            <span>Loans</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/transactions"
                            className={`flex items-center gap-3 px-4 py-2 rounded-md ${pathname === "/dashboard/transactions" ? "bg-primary-500 text-white" : "hover:bg-primary-200"}`}
                        >
                            <CreditCardIcon />
                            <span>Transactions</span>
                        </Link>
                    </li>
                    <li onClick={handleLogout}>
                        <Link
                            href="#"
                            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-primary-200"
                        >
                            <LogOut />
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
