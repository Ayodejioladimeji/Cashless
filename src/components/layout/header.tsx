import React from "react"

const Header = () => {
    return(
        <section className="flex items-center justify-between px-5 h-[80px] border-b">
            <div>
                <h1 className="text-xl font-semibold">Welcome Back!</h1>
                <p className="text-base font-medium">Ayodeji Oladimeji</p>
            </div>

            <div className="size-12 border flex items-center justify-center rounded-full">
                AO
            </div>
        </section>
    )
}
export default Header