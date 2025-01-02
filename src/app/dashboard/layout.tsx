"use client";
import Sidebar from "@/components/layout/sidebar";
import { DataProvider } from "@/store/GlobalState";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    

    return (
        <DataProvider>
                <div className=" relative">
                    <Sidebar />

                    <div className={`md:ml-[250px] relative`}>
                        {children}
                    </div>
                </div>
        </DataProvider>
    );
}
