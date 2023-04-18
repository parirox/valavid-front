import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon} from "@heroicons/react/20/solid";
import React, {Fragment, useCallback, useEffect, useState} from "react";
import {IoCaretDown, IoImageOutline, IoSearchOutline, IoVideocamOutline} from "react-icons/io5";
import Router, {useRouter} from "next/router";
import {isEmpty} from "@/utils/general";
import Link from "next/link";
import toast from "@/utils/notification/toast";
import TagAutoComplete from "@/components/Form/elements/auto_complete/TagAutoComplete";

export const options = [{
    id: 1, route: "video", name: "ویدئو", icon: <IoVideocamOutline className="text-2xl"/>, unavailable: false,
}, {
    id: 2, route: "image", name: "تصویر", icon: <IoImageOutline className="text-2xl"/>, unavailable: true,
},];

export default function Select() {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");
    const [selected, setSelected] = useState(options[0]);

    useEffect(() => {
        if (router.isReady && !isEmpty(router.query?.search)) {
            setSearchValue(router.query?.search);
            const selected_option = options.find(v => v.route === router.query?.type);
            if (!isEmpty(selected_option)) setSelected(selected_option)
        } else if (isEmpty(router.query?.search) && !isEmpty(searchValue)) {
            setSearchValue("")
        }
    }, [router.isReady, router.query, searchValue])

    const searchHandler = useCallback((value) => {
        const _searchValue = value ?? searchValue
        if (!isEmpty(_searchValue) && router.query?.search !== _searchValue) {
            setSearchValue(value)
            router.push(`/products/${selected.route}/?search=${_searchValue}`)
        }
    }, [router, searchValue, selected.route])

    return (<div className="rounded-full h-full w-full bg-accent text-white">
        <div className="flex flex-row gap-3 h-full">
            <div className="basis-2/12 py-1 h-full">
                <Listbox value={selected} disabled={options.filter(option => !option.unavailable).length <= 1}
                         onChange={setSelected}>
                    <div className="border-l-[1px] border-secondary-200 relative px-2 h-full">
                        <Listbox.Button
                            as={Link}
                            href={`/products/${selected.route}`}
                            className="flex gap-3 items-center content-between h-full relative w-full cursor-default rounded-lg py-2 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="pointer-events-none flex items-center pr-2">
                  {selected.icon}
                </span>
                            <span className="block truncate text-white">
                  {selected.name}
                </span>
                            {options.filter(option => !option.unavailable).length > 1 && <IoCaretDown/>}
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {options.filter(option => !option.unavailable).map((item, itemIdx) => (<Listbox.Option
                                    key={itemIdx}
                                    className={({active}) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"}`}
                                    value={item}
                                >
                                    {({selected}) => (<>
                          <span
                              className={`block truncate text-accent ${selected ? "font-medium" : "font-normal"}`}
                          >
                            {item.name}
                          </span>
                                        {selected ? (<span
                                            className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                              />
                            </span>) : null}
                                    </>)}
                                </Listbox.Option>))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>
            <div className="basis-9/12 relative">
                <TagAutoComplete optionalSelectable={true} value={searchValue} onChange={setSearchValue} searchHandler={searchHandler}/>
            </div>
            <button className="basis-1/12 text-white p-4" onClick={searchHandler}>
                <IoSearchOutline className="text-[15px]"/>
            </button>
        </div>
    </div>);
}
