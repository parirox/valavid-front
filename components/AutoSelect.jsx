import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";

const AutoSelect = ({ value, setValue, placeholder, options }) => {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((person) => {
          return person.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="relative flex items-center justify-between border border-secondary-300 h-[60px] rounded-[16px] w-[100%] text-secondary-300 text-start p-4">
      <Combobox value={value} onChange={setValue}>
        <Combobox.Input
          className="border-none outline-none flex-1 bg-transparent"
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
        />
        <Combobox.Button className="absolute inset-y-0 left-[2rem] flex items-center">
          <FaChevronDown />
        </Combobox.Button>
        <Combobox.Options className="z-10 text-secondary-light bg-white mt-4 rounded-[16px] shadow-3xl absolute w-full h-auto max-h-[15rem] overflow-auto scrollbar right-0 top-[100%]">
          {filteredOptions.map((person) => (
            <Combobox.Option
              className="py-3 hover:bg-color9 text-start px-4"
              key={person}
              value={person}
            >
              {person}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default AutoSelect;
