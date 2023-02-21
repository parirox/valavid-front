import {Combobox, Listbox, Transition} from "@headlessui/react";
import {CheckIcon} from "@heroicons/react/20/solid";
import React, {Fragment, useEffect, useState} from "react";
import {IoCaretDown, IoImageOutline, IoSearchOutline, IoVideocamOutline} from "react-icons/io5";
import Router, {useRouter} from "next/router";
import {isEmpty} from "@/utils/general";
import Link from "next/link";
import toast from "@/utils/notification/toast";
import {useSearchProductMutation, useSearchTagsMutation} from "@/datasources/product/remote/ProductSliceApi";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {CgArrowsV} from "react-icons/cg";
import _AutoCompleteLogic from "@/components/Form/elements/auto_complete/_AutoCompleteLogic";
import Chip from "@/components/Chip";

export const options = [
  {
    id: 1,
    route: "video",
    name: "ویدئو",
    icon: <IoVideocamOutline className="text-2xl"/>,
    unavailable: false,
  },
  {
    id: 2,
    route: "image",
    name: "تصویر",
    icon: <IoImageOutline className="text-2xl"/>,
    unavailable: true,
  },
];

export default function Select() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState(options[0]);

  async function searchHandler() {
    if (isEmpty(searchValue)) {
      toast.info("چند کاراکتری وارد نمایید!")
      return;
    }
    await Router.push(`/products/${selected.route}/?tags=${searchValue}`)
  }

  useEffect(() => {
    if (router.isReady && !isEmpty(router.query?.tags)) {
      setSearchValue(router.query?.tags);
      const selected_option = options.find(v => v.route === router.query?.type);
      if (!isEmpty(selected_option)) setSelected(selected_option)
    } else if (isEmpty(router.query?.tags) && !isEmpty(searchValue)) {
      setSearchValue("")
    }
  }, [router.query])

  return (
    <div className="rounded-full h-full w-full bg-accent text-white">
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
                  {options.filter(option => !option.unavailable).map((item, itemIdx) => (
                    <Listbox.Option
                      key={itemIdx}
                      className={({active}) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={item}
                    >
                      {({selected}) => (
                        <>
                          <span
                            className={`block truncate text-accent ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {item.name}
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
        <div className="basis-9/12 relative">
          <_AutoCompleteLogic onChange={setSearchValue} ApiHook={useSearchTagsMutation} field_key={"title"}>
            {
              ({isLoading, items, displayValue, setInputValue, selected, setSelected, $input}) => (
                <Combobox value={selected} onChange={setSelected}>
                  {({open}) => (
                    <>
                      <div className={"relative h-full"}>
                        <Combobox.Input
                          placeholder="جستجوی عبارت ..."
                          ref={$input}
                          className="border-none h-full focus:ring-transparent text-white bg-transparent w-full h-full"
                          displayValue={displayValue} onChange={(event) => setInputValue(event.target.value)}/>
                        <span className={"absolute left-5 top-1/2 -translate-y-1/2 text-white"}>
                      {isLoading && <AiOutlineLoading3Quarters className={"animate-spin"}/>}
                    </span>
                      </div>
                      <Transition
                        show={open}
                        className="relative z-[70]"
                        enter="transition duration-500 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Combobox.Options
                          className="absolute -right-2 top-2 z-[60] flex flex-wrap w-full text-white"
                        >
                          {items.map((val, index) => (
                            <Combobox.Option
                              className="btn rounded-none shadow-xl min-h-0 shadow-inner border-none p-7 cursor-pointer flex items-center gap-3 btn-primary font-bold h-[24px]"
                              key={index} value={val}>
                              {val.title}
                            </Combobox.Option>
                          ))}
                        </Combobox.Options>
                      </Transition>
                    </>
                  )}
                </Combobox>
              )
            }
          </_AutoCompleteLogic>
          {/*<input*/}
          {/*  className="border-none focus:ring-transparent text-white bg-transparent w-full h-full"*/}
          {/*  placeholder="جستجوی عبارت ..."*/}
          {/*  type="text"*/}
          {/*  value={searchValue}*/}
          {/*  onKeyDown={e=>e.key==="Enter" ? searchHandler() : ""}*/}
          {/*  onChange={event => setSearchValue(event.target.value)}*/}
          {/*  id="search-header"*/}
          {/*/>*/}
        </div>
        <button className="basis-1/12 text-white p-4" onClick={searchHandler}>
          <IoSearchOutline className="text-[15px]"/>
        </button>
      </div>
    </div>
  );
}
