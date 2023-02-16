import {Listbox, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import {IoCaretDown, IoCheckmark, IoSearchOutline} from "react-icons/io5";
import Router from "next/router";
import {options} from "@/components/Select"
import Link from "next/link";
import {isEmpty} from "@/utils/general";
import toast from "@/utils/notification/toast";

export default function SelectSlider({value = ""}) {
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState(options[0]);

  useEffect(() => {
    setSearchValue(value)
  }, [value])

  async function searchHandler() {
    if(isEmpty(searchValue)){
      toast.info("چند کاراکتری وارد نمایید!")
      return;
    }
    await Router.push(`/products/${selected.route}/?tags=${searchValue}`)
  }

  return (
    <div className="rounded-full h-full w-full bg-white text-gray-800">
      <div className="flex flex-row gap-3 h-full">
        <div className="basis-2/12 py-3 h-full">
          <Listbox value={selected} disabled={options.filter(option=>!option.unavailable).length <= 1} onChange={setSelected}>
            <div className="border-l-[1px] border-[#D6DADC] relative px-2 h-full">
              <Listbox.Button
                as={Link}
                href={`/products/${selected.route}`}
                className="flex gap-2 items-center content-between h-full relative w-full cursor-default rounded-lg py-2 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm text-accent">
                <span className="basis-1/4 pointer-events-none flex items-center pr-2">
                  {selected.icon}
                </span>
                <span className="basis-2/4 block truncate text-center">
                  {selected.name}
                </span>
                {options.filter(option=>!option.unavailable).length > 1 && <IoCaretDown />}
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-accent  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {options.filter(option=>!option.unavailable).map((item, itemIdx) => (
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
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {item.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <IoCheckmark/>
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
        <div className="basis-9/12">
          <input
            className="border-none focus:ring-transparent text-black bg-transparent w-full h-full"
            placeholder="جستجوی عبارت ..."
            type="text"
            name="search"
            value={searchValue}
            onKeyDown={e=>e.key==="Enter" ? searchHandler() : ""}
            onChange={event => setSearchValue(event.target.value)}
            id="search-header"
          />
        </div>
        <div className="basis-1/12 px-4 py-3">
          <button className="rounded-3xl btn-primary-gradient" onClick={searchHandler}>
            <IoSearchOutline className="text-[1.3rem]"/>
            <span className="mr-2">جستجو</span>
          </button>
        </div>
      </div>
    </div>
  );
}
