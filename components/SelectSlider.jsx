import {
  FillCaretDown,
  FillImage,
  OutlineSearch,
  OutlineVideo
} from "@/components/Icons";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";

export const people = [
  {
    id: 1,
    name: "ویدئو",
    icon: <OutlineVideo className="text-[#001727]" />,
    unavailable: false,
  },
  {
    id: 2,
    name: "تصویر",
    icon: <FillImage scale={0.5} className="text-[#001727]" />,
    unavailable: false,
  },
];

export default function SelectSlider() {
  const [selected, setSelected] = useState(people[0]);

  return (
    <div className="rounded-full h-full w-full bg-white text-gray-800">
      <div className="flex flex-row gap-3 h-full">
        <div className="basis-2/12 py-3 h-full">
          <Listbox value={selected} onChange={setSelected}>
            <div className="border-l-[1px] border-[#D6DADC] relative px-2 h-full">
              <Listbox.Button className="flex gap-3 items-center content-between h-full relative w-full cursor-default rounded-lg py-2 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="pointer-events-none flex items-center pr-2">
                  {selected.icon}
                </span>
                <span className="block truncate text-[#001727]">
                  {selected.name}
                </span>
                <FillCaretDown className="text-[#001727]" />
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {people.map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={person}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {person.name}
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
        <div className="basis-9/12">
          <input
            className="border-none focus:ring-transparent text-white bg-transparent w-full h-full"
            placeholder="جستجوی عبارت ..."
            type="text"
            name="seach"
            id="search-header"
          />
        </div>
        <div className="basis-1/12 p-4 ">
          <button className=" text-white flex rounded-3xl px-6 py-4 bg-gradient-to-br from-primary to-[#2DC2BD]">
            <OutlineSearch className="h-full" />
            <span className="mr-2">جستجو</span>
          </button>
        </div>
      </div>
    </div>
  );
}
