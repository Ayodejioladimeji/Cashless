import { BarChart2Icon, CreditCardIcon, HandCoins, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
    const pathname = usePathname()

    // 

    return (
        <aside className="fixed top-0 w-[250px] h-screen border-r">
            <div className="pb-6 ">
                <div className="h-[80px] flex items-center justify-center text-primary-500 font-bold text-2xl mb-10 border-b">
                    Cashless
                </div>

                <ul className="space-y-4 px-3">
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
                    <li>
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
