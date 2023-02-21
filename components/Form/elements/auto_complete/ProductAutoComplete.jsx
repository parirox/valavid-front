import React from 'react';
import _AutoCompleteLogic from "@/components/Form/elements/auto_complete/_AutoCompleteLogic";
import {useSearchProductMutation} from "@/datasources/product/remote/ProductSliceApi";
import {Combobox} from "@headlessui/react";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {CgArrowsV} from "react-icons/cg";

const ProductAutoComplete = (props) => {
  return (
    <_AutoCompleteLogic {...props} ApiHook={useSearchProductMutation}>
      {
        ({isLoading, items, displayValue, setInputValue,selected, setSelected, $input}) => (
          <Combobox value={selected} onChange={setSelected}>
            <div className={"relative"}>
              <Combobox.Input
                ref={$input}
                className="bg-color8 text-secondary px-4 h-14 w-full rounded-[1.2rem] border-none active:border-none focus:border-none"
                displayValue={displayValue} onChange={(event) => setInputValue(event.target.value)}/>
              <span className={"absolute left-5 top-1/2 -translate-y-1/2 text-secondary-400"}>
                {isLoading ? <AiOutlineLoading3Quarters className={"animate-spin"}/> : <CgArrowsV/>}
              </span>
            </div>
            <Combobox.Options
              className="absolute mt-1 z-[60] max-h-60 w-full scrollbar rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {items.map((val, index) => (
                <Combobox.Option
                  className="relative cursor-default select-none py-2 pl-10 pr-4 ui-active:bg-amber-100 ui-active:text-amber-900 ui-not-active:text-gray"
                  key={index} value={val}>
                  {val.title}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox>
        )
      }
    </_AutoCompleteLogic>
  );
};

export default ProductAutoComplete;