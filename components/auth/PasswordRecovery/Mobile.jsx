import TextInput from "@/components/TextInput";
import { useSendVerificationCodeMutation } from "@/datasources/auth/remote/AuthSliceApi";
import BackIcon from "@/public/icons/Back.svg";
import {
  createValidMobileNumber,
  isPersionMobileNumber,
} from "@/utils/helpers/form";
import React from "react";

const Mobile = ({
  setContent,
  verifyUserData,
  setUserVerifyData,
  setSelectedTab,
}) => {
  const [
    sendVerificationCode,
    { data, isSuccess: isSendCodeSuccess, isError, error },
  ] = useSendVerificationCodeMutation();

  const handleSendCode = () => {
    let number_email = verifyUserData.number_email;
    if (isPersionMobileNumber(verifyUserData.number_email)) {
      number_email = createValidMobileNumber(verifyUserData.number_email);
    }
    setContent("auth");
    sendVerificationCode({ number_email });
  };

  return (
    <div>
      <div className="flex items-center justify-between text-[#303D47] m-4">
        <h2 className="text-[25px]">بازیابی رمز عبور</h2>
        <div
          onClick={() => setSelectedTab("login")}
          className="flex items-center cursor-pointer"
        >
          <BackIcon className="mx-3" />
          <span>بازگشت</span>
        </div>
      </div>
      <div className="m-4 flex flex-col mt-[7rem]">
        <p className="mb-4 text-[14px] text-[#303D47]">
          لطفا شماره موبایل یا ایمیل خود را وارد کنید.
        </p>
        <TextInput
          onChange={(e) => {
            setUserVerifyData((prev) => {
              return {
                ...prev,
                number_email: e.target.value,
              };
            });
          }}
          value={verifyUserData.number_email}
          label="ایمیل/شماره موبایل"
        />
        <button
          onClick={() => handleSendCode()}
          className="bg-[#534CDA] color-white h-[4.063rem] rounded-[1.438rem] m-4"
        >
          دریافت کد تایید
        </button>
      </div>
    </div>
  );
};

export default Mobile;
