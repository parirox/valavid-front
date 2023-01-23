import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";

const SelectBox = ({ label, selected, setSelected, options }) => {
  return (
    <Listbox value={selected} onChange={(item) => setSelected(item)}>
      <Listbox.Button className="flex items-center justify-between border border-secondary-300 h-[60px] rounded-[16px] w-[100%] text-secondary-300 text-start p-4">
        <span>{(selected && selected.label) || label}</span>
        <FaChevronDown />
      </Listbox.Button>
      <Listbox.Options className="z-10 text-secondary-light bg-white mt-4 rounded-[16px] shadow-3xl absolute w-full h-auto max-h-[15rem] overflow-auto">
        {options &&
          options.map((item, index) => (
            <Listbox.Option
              className="py-3 hover:bg-color9 text-start px-4"
              key={index}
              value={item}
            >
              {item.label}
            </Listbox.Option>
          ))}
      </Listbox.Options>
    </Listbox>
  );
};

export default SelectBox;
