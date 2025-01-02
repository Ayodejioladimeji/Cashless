import React from "react"

interface Props {
    title:string
}

const Header = (props:Props) => {

    // 

    return(
        <section className="flex items-center justify-between px-5 h-[80px] border-b">
            <div>
                <h1 className="text-xl font-semibold capitalize">{props.title}</h1>
            </div>

            <div className="size-12 border flex items-center justify-center rounded-full">
                AO
            </div>
        </section>
    )
}
export default Header