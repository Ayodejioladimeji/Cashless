"use client";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    

    return (
        // <DataProvider>
                <div className="w-full flex relative">
                    <Sidebar />

                    <div className={` w-full relative`}>
                        <Header/>
                        {children}
                    </div>
                </div>
        // </DataProvider>
    );
}
