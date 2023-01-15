import React, { useState } from "react";

const MultiValueTextInput = ({ label, values, setValues, level }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "enter" || event.charCode == 13) {
    console.log(level)

      setValues(level, event.target.value);
      setInputValue("");
    }
  };

  return (
    <div className="border border-color8 rounded-[23px] h-[131px] relative p-4">
      <label className="text-color8 absolute bg-color9 top-[-11px] right-[20px] px-3 z-10">
        {label}
      </label>
      <div className="flex items-baseline">
        <div className="flex">
          {values.map((value, index) => (
            <span
              key={index}
              className="bg-accent rounded-full px-4 py-1 ml-1 whitespace-nowrap"
            >
              {value}
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder="بنویسید و اینتر بزنید..."
          value={inputValue}
          onKeyPress={(e) => handleKeyPress(e)}
          onChange={(e) => setInputValue(e.target.value)}
          className={`w-[100%] border-none outline-none px-3 py-3 peer text-[#303D47] bg-color9`}
        />
      </div>
    </div>
  );
};

export default MultiValueTextInput;
