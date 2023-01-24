import { useGetProductTagsMutation } from "@/datasources/product/remote/ProductSliceApi";
import { useOutsideAlerter } from "hooks/ClickOutside";
import React, { useState, useEffect } from "react";
import {isEmpty} from "@/utils/general";

const MultiValueTextInput = ({
  label,
  values,
  setValues,
  level,
  activeInput,
  setActiveInput,
  id,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [offers, setOffers] = useState([]);

  const [
    getProductTags,
    { data, isFetching, isSuccess, isLoading, isError, error },
  ] = useGetProductTagsMutation();

  const handleKeyPress = (event) => {
    if (event.key === "enter" || event.charCode === 13) {
      setValues(level, event.target.value);
      setInputValue("");
    }
  };

  const wrapperRef = React.useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    setActiveInput(null);
  });

  useEffect(() => {
    if(inputValue.length > 2) {
      getProductTags({search: inputValue})
        .unwrap()
        .then((data) => {
          setOffers(data);
        });
    }
  }, [inputValue]);

  return (
    <div className="border border-secondary-300 rounded-[23px] h-[131px] relative p-4">
      <label className="text-secondary-300 absolute bg-color9 top-[-11px] right-[20px] px-3 z-10">
        {label}
      </label>
      <div className="flex flex-col justify-start items-start">
        <div className="flex flex-wrap max-h-[5rem] overflow-auto">
          {values.map((value, index) => (
            <span
              key={index}
              className="bg-accent rounded-full px-4 py-1 m-1 whitespace-nowrap"
            >
              {value}
            </span>
          ))}
        </div>
        <div className="flex flex-col items-start w-full relative">
          <input
            type="text"
            placeholder="بنویسید و اینتر بزنید..."
            value={inputValue}
            onKeyPress={(e) => handleKeyPress(e)}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (!activeInput) {
                setActiveInput(id);
              }
            }}
            className={`group w-full min-w-[150px] border-none outline-none px-3 py-3 peer text-[#303D47] bg-color9`}
            onFocus={() => setActiveInput(id)}
          />
          {activeInput === id && offers.length > 0 && (
            <div
              ref={wrapperRef}
              className="scrollbar-thin scrollbar-thumb-primary overflow-y-scroll absolute top-[3.5rem] overflow-auto h-[15rem] bg-white shadow-2xl p-4 z-50 flex flex-wrap p-4 rounded-[20px] items-start w-full"
            >
              {offers &&
                offers.map((offer, index) => (
                  <span
                    className="m-1 px-4 py-1 bg-primary text-white block rounded-full min-w-[50px] cursor-pointer"
                    key={index}
                    onClick={() => {
                      setValues(level, offer.title);
                    }}
                  >
                    {offer.title}
                  </span>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiValueTextInput;
