import React from 'react';
import {useSearchTagsMutation} from "@/datasources/product/remote/ProductSliceApi";
import {Combobox, Transition} from "@headlessui/react";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import _AutoCompleteLogic from "@/components/Form/elements/auto_complete/_AutoCompleteLogic";

const TagAutoComplete = (props) => {
  return (
    <_AutoCompleteLogic {...props} ApiHook={useSearchTagsMutation} field_name={"title"}>
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
  );
};

export default TagAutoComplete;