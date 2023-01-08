import React, { useState } from "react";
import Checkbox from "@/components/Checkbox";
import TextInput from "@/components/TextInput";
import toast from "@/utils/notification/toast";
import { useSendVerificationCodeMutation } from "@/datasources/auth/remote/AuthSliceApi";
import {
  createValidMobileNumber,
  isPersionMobileNumber,
} from "@/utils/helpers/form";
import { handleApiError } from "@/datasources/errorHandler";
import _toast from "@/utils/notification/toast";

const SignUpForm = ({ signupData, setSignupData, setSelectedTab }) => {
  const [acceptRules, setAcceptRules] = useState(false);

  const [
    sendVerificationCode,
    { data, isSuccess: isSendCodeSuccess, isError, error },
  ] = useSendVerificationCodeMutation();

  const inputs = [
    {
      name: "first_name",
      type: "text",
      label: "نام",
    },
    {
      name: "last_name",
      type: "text",
      label: "نام خانوادگی",
    },
    {
      name: "username",
      type: "text",
      label: "نام کاربری",
    },
    {
      name: "number_email",
      type: "text",
      label: "ایمیل/شماره موبایل",
    },
    {
      name: "password",
      type: "password",
      label: "رمز عبور",
    },
    {
      name: "repeated_password",
      type: "password",
      label: "تکرار رمز",
    },
  ];

  const handleChangeInput = (name, value) => {
    setSignupData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSendForm = () => {
    if (signupData.password !== signupData.repeated_password) {
      toast.error("پسورد و تکرار پسورد یکسان نیست!");
    } else if (!signupData.number_email) {
      toast.error("ایمیل یا شماره موبایل را وارد کنید.");
    } else {
      let number_email = signupData.number_email;
      if (isPersionMobileNumber(signupData.number_email)) {
        number_email = createValidMobileNumber(signupData.number_email);
      }
      sendVerificationCode({ number_email })
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          setSelectedTab("auth");
        })
        .catch((err) => {
          handleApiError(err);
        });
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap">
        {inputs.map((input, index) => (
          <div className="w-[50%]" key={index}>
            <TextInput
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              name={input.name}
              value={signupData[input.name]}
              type={input.type}
              label={input.label}
            />
          </div>
        ))}
        <p className="text-[#90999F] mx-4 mt-[-0.3rem] mb-4">
          رمز باید انگلیسی و شامل حداقل 8 کاراکتر و حروف بزرگ و کوچک باشد.
        </p>
      </div>
      <div className="flex flex-col">
        <div className="mr-4 mt-4">
          <Checkbox
            checked={acceptRules}
            onChange={() => setAcceptRules(!acceptRules)}
          >
            <p className="text-[#90999F]">
              قوانین را مطالعه کرده و قبول دارم.{" "}
              <a className="text-[#534CDA]">مشاهده قوانین</a>
            </p>
          </Checkbox>
        </div>
        <button
          disabled={!acceptRules}
          onClick={() => handleSendForm()}
          className="bg-[#534CDA] color-white m-4 h-[4.063rem] rounded-[1.438rem]"
        >
          ثبت نام
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
