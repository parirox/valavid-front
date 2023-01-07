import { signupUser } from "apis/auth";
import React, { useState } from "react";
import Checkbox from "../Checkbox";
import TextInput from "../TextInput";
import { useNotification } from "react-hook-notification";
import { handleApiError } from "apis/helpers.js/errorHandler";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    number_email: "",
    password: "",
    repeated_password: "",
  });
  const [acceptRules, setAcceptRules] = useState(false);
  const notification = useNotification();

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
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSendForm = async () => {
    try {
       if (form.password !== form.repeated_password) {
        toast.error("پسورد و تکرار پسورد یکسان نیست!");
      } else {
        let { first_name,
        last_name,
        username,
        number_email,
        password} = form
        let response = await signupUser({ first_name,
          last_name,
          username,
          number_email,
          password});
        if (response.status == 200) {
          notification.success({
            text: "ثبت نام با موفقیت انجام شد",
          });
        }
      }
    } catch (error) {
      handleApiError(error.response);
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
              value={form[input.name]}
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
