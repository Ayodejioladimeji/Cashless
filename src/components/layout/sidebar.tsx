import { BarChart2Icon, CreditCardIcon, HandCoins, Repeat, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
    return (
        <aside className="w-80 h-screen border-r border-gray-300">
            <div className="py-6 px-3">
                <div className="text-primary font-bold text-2xl mb-10">
                    <span className="text-[]">Cashless</span>
                </div>

                <ul className="space-y-4">
                    <li>
                        <Link
                            href="#"
                            className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-primary-200 bg-primary-500 text-white"
                        >
                            <BarChart2Icon/>
                            <span>Overview</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-primary-200"
                        >
                            <HandCoins/>
                            <span>Loans</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-primary-200"
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
                            <Settings/>
                            <span>Settings</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
