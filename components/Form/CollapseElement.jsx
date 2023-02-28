import { Disclosure, Transition } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";

export default function CollapseElement({ headTitle, headIcon, children }) {
    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <Disclosure.Button>
                        <div className="flex items-center justify-between gap-4 text-lg mr-3">
                            <div className="flex items-center gap-4">
                                {headIcon}
                                {headTitle}
                            </div>
                            <IoIosArrowDown className={`text-2xl text-secondary-200 mr-auto transition-all duration-500 ${open ? 'rotate-180' : 'rotate-0'}`} />
                        </div>
                    </Disclosure.Button>

                    <Transition
                        enter="transition duration-1000 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-250 ease-in-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0">
                        <Disclosure.Panel className="border-b border-secondary-300 pr-2">
                            <div className="w-full relative pt-0 py-10 px-3">
                                {children}
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    )
}