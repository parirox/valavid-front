import {Listbox} from "@headlessui/react";
import {FaChevronDown} from "react-icons/fa";
import classNames from "classnames";

const SelectBox = ({label, selected, dark, setSelected, options}) => {
    return (<Listbox value={selected} onChange={(item) => setSelected(item)}>
        <Listbox.Button
        className="flex items-center justify-between border border-secondary-300 h-[60px] rounded-[16px] w-[100%] text-secondary-300 text-start p-4">
            <span>{(selected && selected.label) || label}</span>
            <FaChevronDown/>
        </Listbox.Button>
        <Listbox.Options
        className={classNames("z-10 mt-4 rounded-[16px] shadow-3xl absolute w-full h-auto max-h-[15rem] overflow-auto scrollbar", {
            "text-secondary-light bg-white": !dark,
            "bg-accent text-white": dark,
        })}>
            {options && options.map((item, index) => (<Listbox.Option
            className={classNames("py-3 text-start px-4 cursor-pointer",{
                "hover:bg-color9":!dark,
                "hover:bg-color7":dark,
            })}
            key={index}
            value={item}
            >
                {item.label}
            </Listbox.Option>))}
        </Listbox.Options>
    </Listbox>);
};

export default SelectBox;
