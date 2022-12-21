import { Listbox, Transition } from "@headlessui/react"

export default function CheckBoxButton({ data, options, setOptions }){
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
                <Listbox.Options static className="flex flex-wrap gap-4">
                    {data.map((item) => (
                        <Listbox.Option key={item} value={item}
                            className={({ active, selected }) =>
                                selected ? 'text-primary bg-white font-bold w-fit cursor-pointer flex justify-center items-center min-w-[5.5rem] px-4 py-2 rounded-xl border border-secondary-400' : 'w-fit cursor-pointer flex justify-center items-center min-w-[5.5rem] px-4 py-2 rounded-xl border border-secondary-400 text-secondary-300'}>
                            {item}
                        </Listbox.Option> 
                    ))}
                </Listbox.Options>
            </Transition>
        </Listbox>
    )
}