import React from "react";

const Spinner = ({ color }) => {
  return (
    <>
      <div class="flex">
        <div class="relative w-[30px] h-[30px]">
          <div
            class="w-10 h-10 rounded-full animate-spin absolute
                            border-4 border-solid border-primary border-t-transparent"></div>
        </div>
      </div>
    </>
  );
};

export default Spinner;
