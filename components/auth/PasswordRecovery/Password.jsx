import TextInput from "@/components/TextInput";
import React from "react";

const Password = () => {
  return (
    <div className="m-4 flex flex-col mt-[7rem]">
      <p className="mb-3 text-[14px] text-[#303D47]">
        رمز عبور جدید خود را وارد کنید.
      </p>
      <div>
        <div className="flex">
          <div className="w-[50%]">
            <TextInput label="رمز عبور" />
          </div>
          <div className="w-[50%]">
            <TextInput label="تکرار رمز" />
          </div>
        </div>
        <p className="text-[#90999F] mx-4 mt-[-0.3rem] mb-4">
          رمز باید انگلیسی و شامل حداقل 8 کاراکتر و حروف بزرگ و کوچک باشد.
        </p>
      </div>

      <button className="bg-[#534CDA] color-white h-[4.063rem] rounded-[1.438rem] m-4">
        تغییر رمز
      </button>
    </div>
  );
};

export default Password;
