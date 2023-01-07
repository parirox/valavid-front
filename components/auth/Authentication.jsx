import React, { useEffect, useRef, useState } from "react";
import ClockIcon from "@/public/icons/Clock.svg";
import BackIcon from "@/public/icons/Back.svg";
import { useSendVerificationCodeMutation } from "@/datasources/auth/remote/AuthSliceApi";
import Countdown from "@/components/Countdown";
import toast from "@/utils/notification/toast";
import { handleApiError } from "@/datasources/errorHandler";

const Authentication = ({
  handleClickBackBtn,
  handleClickEditBtn,
  setState,
  state,
  number_email,
  handleSendForm,
}) => {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const [focusedInput, setFocusedInput] = useState(0);
  const [
    sendVerificationCode,
    { data: verificationData, isSuccess: isSendCodeSuccess },
  ] = useSendVerificationCodeMutation();

  const myRefs = useRef([]);

  const handleChangeInput = (index, value) => {
    setState((prev) => {
      return {
        ...prev,
        verify_code: [
          ...prev.verify_code.slice(0, index),
          value,
          ...prev.verify_code.slice(index + 1),
        ],
      };
    });
    if (value && index < 3) {
      let e = myRefs.current[index === 3 ? 0 : index + 1]
    console.log(e);

      if(e){
        e.focus()
      }
      // setFocusedInput(index+1)
      // itemsRef.current[index + 1].focus();
    }
  };

  const handleResendCode = () => {
    setMinutes(1);
    setSeconds(30);
    sendVerificationCode({ number_email })
      .unwrap()
      .then((response) => {
        console.log(response)
        toast.success(response.message);
      })
      .catch((err) => {
        handleApiError(err);
      });
  };

  return (
    <div>
      <div className="flex items-center justify-between text-[#303D47] m-4">
        <h2 className="text-[25px]">بازیابی رمز عبور</h2>
        <div
          onClick={() => {
            setState((prev) => {
              return {
                ...prev,
                verify_code: ["", "", "", ""],
              };
            });
            handleClickBackBtn();
          }}
          className="flex items-center cursor-pointer"
        >
          <BackIcon className="mx-3" />
          <span>بازگشت</span>
        </div>
      </div>
      <div className="mr-4 ml-4 mt-[4rem] mb-[4rem]">
        <p className="mb-4 text-[14px] text-[#303D47]">
          کد تایید ارسال شده به شماره را وارد کنید.
        </p>
        <div className="sm:flex justify-between">
          <div className="flex justify-center">
            <div className="ltr ml-1 w-[55px] h-[55px] bg-[#C2CACF] rounded-[23px] overflow-hidden">
              <input
                className="w-[100%] h-[100%] bg-transparent text-center border-none outline-none text-[20px]"
                type="number"
                max="5"
                value={state.verify_code[3]}
                onChange={(e) => handleChangeInput(3, e.target.value)}
                ref={(el) => (myRefs.current[3] = el)}
              />
            </div>
            <div className="ml-1 w-[55px] h-[55px] bg-[#C2CACF] rounded-[23px] overflow-hidden">
              <input
                className="w-[100%] h-[100%] bg-transparent text-center border-none outline-none text-[20px]"
                type="number"
                value={state.verify_code[2]}
                onChange={(e) => handleChangeInput(2, e.target.value)}
                ref={(el) => (myRefs.current[2] = el)}
              />
            </div>
            <div className="ml-1 w-[55px] h-[55px] bg-[#C2CACF] rounded-[23px] overflow-hidden">
              <input
                className="w-[100%] h-[100%] bg-transparent text-center border-none outline-none text-[20px]"
                type="number"
                value={state.verify_code[1]}
                onChange={(e) => handleChangeInput(1, e.target.value)}
                ref={(el) => (myRefs.current[1] = el)}
              />
            </div>
            <div className="ml-1 w-[55px] h-[55px] bg-[#C2CACF] rounded-[23px] overflow-hidden">
              <input
                className="w-[100%] h-[100%] bg-transparent text-center border-none outline-none text-[20px]"
                type="number"
                value={state.verify_code[0]}
                onChange={(e) => handleChangeInput(0, e.target.value)}
                ref={(el) => (myRefs.current[0] = el)}
              />
            </div>
          </div>
          <button
            disabled={minutes !== 0 && seconds !== 0}
            onClick={() => handleResendCode()}
            className="mt-4 sm:mt-[0] flex items-center justify-between w-fit mx-auto border border-[#303D47] rounded-[23px] text-[14px] px-3"
          >
            <span onClick={() => {}} className="text-[#C2CACF] ml-4">
              ارسال مجدد
            </span>
            <div className="flex items-center">
              <span className="text-[#303D47] ml-2">
                <Countdown
                  minutes={minutes}
                  setMinutes={setMinutes}
                  seconds={seconds}
                  setSeconds={setSeconds}
                />
              </span>
              <ClockIcon className="w-[40.9px] h-[39.36px]" />
            </div>
          </button>
        </div>
      </div>
      <div className="flex flex-col m-4">
        <a
          onClick={() => {
            handleClickEditBtn();
          }}
          className="text-[#534CDA] cursor-pointer mb-2"
        >
          ویرایش شماره موبایل/ایمیل
        </a>
        <button
          onClick={() => handleSendForm()}
          className="bg-[#534CDA] color-white h-[4.063rem] rounded-[1.438rem] my-3"
        >
          ثبت
        </button>
      </div>
    </div>
  );
};

export default Authentication;
