import {isEmpty} from "@/utils/general"
import {useEffect, useMemo} from "react"
import {FiCheck} from "react-icons/fi"

export default function SingleCheckBox({label, selected, selectHandler}) {
    return (
        <div className="flex flex-wrap gap-4">
            <div onClick={() => selectHandler(!selected)} className="inline-flex cursor-pointer">
                <span
                    className={`w-7 h-7 rounded-lg text-white text-center border text-2xl ${selected ? 'bg-primary border-primary' : 'bg-white border-secondary'}`}>
                    {selected && <FiCheck className="m-auto h-full"/>}
                </span>
                <span className="mr-3 self-center text-secondary">{label}</span>
            </div>
        </div>
    )
}