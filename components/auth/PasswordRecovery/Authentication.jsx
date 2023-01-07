import React from "react";
import ClockIcon from "@/public/icons/Clock.svg";

const Authentication = ({ setContent }) => {
  return (
    <div>
      <div className="mr-4 ml-4 mt-[4rem] mb-[4rem]">
        <p className="mb-4 text-[14px] text-[#303D47]">
          کد تایید ارسال شده به شماره را وارد کنید.
        </p>
        <div className="sm:flex justify-between">
          <div className="flex justify-center">
            <div className="ml-1 w-[55px] h-[55px] bg-[#C2CACF] rounded-[23px] overflow-hidden">
              <input
                className="w-[100%] h-[100%] bg-transparent text-center border-none outline-none text-[20px]"
                type="number"
                max="5"
              />
            </div>
            <div className="ml-1 w-[55px] h-[55px] bg-[#C2CACF] rounded-[23px] overflow-hidden">
              <input
                className="w-[100%] h-[100%] bg-transparent text-center border-none outline-none text-[20px]"
                type="number"
              />
            </div>
            <div className="ml-1 w-[55px] h-[55px] bg-[#C2CACF] rounded-[23px] overflow-hidden">
              <input
                className="w-[100%] h-[100%] bg-transparent text-center border-none outline-none text-[20px]"
                type="number"
              />
            </div>
            <div className="ml-1 w-[55px] h-[55px] bg-[#C2CACF] rounded-[23px] overflow-hidden">
              <input
                className="w-[100%] h-[100%] bg-transparent text-center border-none outline-none text-[20px]"
                type="number"
              />
            </div>
          </div>
          <div className="mt-4 sm:mt-[0] flex items-center justify-between w-fit mx-auto border border-[#303D47] rounded-[23px] text-[14px] px-3">
            <span className="text-[#C2CACF] ml-4">ارسال مجدد</span>
            <div className="flex items-center">
              <span className="text-[#303D47] ml-2">0:23</span>
              <ClockIcon className="w-[40.9px] h-[39.36px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col m-4">
        <a
          onClick={() => setContent("mobile")}
          className="text-[#534CDA] cursor-pointer mb-2"
        >
          ویرایش شماره موبایل/ایمیل
        </a>
        <button
          onClick={() => setContent("password")}
          className="bg-[#534CDA] color-white h-[4.063rem] rounded-[1.438rem] my-3"
        >
          ثبت
        </button>
      </div>
    </div>
  );
};

export default Authentication;
