import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Fragment, useEffect, useState } from "react";
import { FaChevronDown, FaInstagram, FaLinkedin, FaPinterest, FaTwitter, FaYoutube } from "react-icons/fa";

export const socials = [
    {
        id: 1,
        name: "instagram",
        icon: <FaInstagram />,
        unavailable: false,
    },
    {
        id: 2,
        name: "twitter",
        icon: <FaTwitter />,
        unavailable: false,
    },
    {
        id: 2,
        name: "youtube",
        icon: <FaYoutube />,
        unavailable: false,
    },
    {
        id: 2,
        name: "linkdin",
        icon: <FaLinkedin />,
        unavailable: false,
    },
    {
        id: 2,
        name: "pinterest",
        icon: <FaPinterest />,
        unavailable: false,
    },
];
export default function SelectWithKey({ value,disabled, setState }) {
    const [selected, setSelected] = useState(socials.find(social => social.name === value.name));
    const [val, setVal] = useState(value.address);

    useEffect(() => {
        setState({
            name: selected.name,
            address: val,
        })
    }, [val, selected])

    return (
        <div className="rounded-full h-full w-full bg-accent text-white">
            <div className="flex flex-row gap-3 h-full input-secondary p-0">
                <div className="basis-9/12">
                    <input
                        className="input py-4 px-6 w-full"
                        type="text"
                        id="search-header"
                        value={val}
                        onChange={(e) => setVal(e.target.value)}
                    />
                </div>
                <div className="basis-3/12 py-1 h-full">
                    <Listbox disabled={disabled} value={selected} onChange={setSelected}>
                        <div className="relative px-3 border-r border-secondary-100 h-full">
                            <Listbox.Button className="flex gap-3 items-center justify-center h-full relative w-full cursor-pointer text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
                                <FaChevronDown />
                                <span className="mt-1">
                                    {selected.name}
                                </span>
                                <span>
                                    {selected.icon}
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-50 mt-3 max-h-60 w-full overflow-auto rounded-md bg-accent cursor-pointer py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    {socials.map((social, socialIdx) => (
                                        <Listbox.Option
                                            key={socialIdx}
                                            className={({ active }) =>
                                                `relative select-none py-2 pl-10 pr-4 hover:bg-secondary-100 ${active
                                                    ? " text-amber-900"
                                                    : "text-gray-900"
                                                }`
                                            }
                                            value={social}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span
                                                        className={`block truncate text-white ${selected ? "font-medium" : "font-normal"
                                                            }`}
                                                    >
                                                        {social.name}
                                                    </span>
                                                    {selected ? (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                            <CheckIcon
                                                                className="h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>
            </div>
        </div>
    );
}
