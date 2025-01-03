import { ACTIONS } from "@/store/Actions"
import { DataContext } from "@/store/GlobalState"
import { getInitials } from "@/utils/utils"
import { MenuIcon } from "lucide-react"
import React, { useContext } from "react"

interface Props {
    title:string
}

const Header = (props:Props) => {
    const {state, dispatch} = useContext(DataContext)

    // 

    return(
        <section className="flex items-center justify-between px-3 md:px-5 h-[80px] border-b">
            <div className="flex items-center ">
                <MenuIcon className="flex md:hidden cursor-pointer" onClick={() => dispatch({type:ACTIONS.OPEN_SIDEBAR, payload:true})}/>
                <h1 className="text-xl font-semibold capitalize">{props.title}</h1>
            </div>

            <div className="size-12 border flex items-center justify-center rounded-full">
                {getInitials(state?.user?.fullname || "")}
            </div>
        </section>
    )
}
export default Header