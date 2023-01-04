import { isEmpty } from "@/utils/general"
import { useEffect, useMemo } from "react"
import { FiCheck } from "react-icons/fi"

export default function SingleCheckBox({ data, options, setOptions }) {

    const selected = useMemo(() => {
        if (isEmpty(options)) return []
        return options.map((v) => (v.value))
    }, [options])

    const onClickHandler = (item) => () => {
        if (isEmpty(selected)) {
            setOptions([item])
            return;
        }

        const newOptions = [...options]
        const is_selected = options.some(item => (selected.includes(item.value)))
        if (is_selected) {
            const index = options.findIndex((item) => selected.includes(item.value));
            newOptions.splice(index, 1);
        } else {
            newOptions.push(item);
        }
        setOptions(newOptions)
    }


    return (
        <div className="flex flex-wrap gap-4">
            {data.map((item, k) => {
                return (
                    <div key={k} onClick={onClickHandler(item)} className="inline-flex cursor-pointer">
                        <span className={`w-7 h-7 rounded-lg text-white text-center border text-2xl ${selected.includes(item.value) ? 'bg-primary border-primary' : 'bg-white border-secondary'}`}>
                            {selected.includes(item.value) && <FiCheck className="m-auto h-full" />}
                        </span>
                        <span className="mr-3 self-center text-secondary">{item.label}</span>
                    </div>
                )
            })}
        </div>
    )
}