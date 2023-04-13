import React from "react";

const Spinner = ({ border }) => {
  return (
    <>
      <div className="flex">
        <div className="relative w-[30px] h-[30px]">
          <div
            className={`w-10 h-10 rounded-full animate-spin absolute
            border-4 border-solid ${
              border ? border : "border-primary"
            } border-t-transparent`}></div>
        </div>
      </div>
    </>
  );
};

export default Spinner;
