"use client";
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

                    <div className={`md:ml-[250px] w-full relative`}>
                        {children}
                    </div>
                </div>
        // </DataProvider>
    );
}
