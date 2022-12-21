import { isEmpty } from "@/utils/general"
import { Listbox, Transition } from "@headlessui/react"
import { IoCheckmark, IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5"

export default function CheckBoxColorButton({ data, options, setOptions,removeButton }) {

    return (
        <Listbox value={options} onChange={setOptions} multiple>
            <Transition
                show={true}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Listbox.Options static className="flex flex-wrap gap-2">
                    {removeButton && <span
                        onClick={()=>{setOptions([])}}
                        className={`w-10 h-10 cursor-pointer flex justify-center items-center rounded-xl border-2 border-secondary-100 text-secondary-300`}
                    >
                        {isEmpty(options) ? <IoCheckmarkOutline className="text-white text-2xl" /> : <IoCloseOutline className="text-white text-2xl" />}
                    </span>}
                    {data.map((item) => (
                        <Listbox.Option 
                            key={item}
                            value={item}
                            className={`w-10 h-10 cursor-pointer flex justify-center items-center rounded-xl border border-secondary-400 text-secondary-300`}
                            style={{ backgroundColor: item }}>
                            {({ active, selected }) => (
                                selected ? <IoCheckmarkOutline className="text-white text-2xl" /> : ""
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options> 
            </Transition>
        </Listbox>
    )
}