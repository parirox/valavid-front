import TextInput from "@/components/TextInput";
import BackIcon from "@/public/icons/Back.svg";
import toast from "@/utils/notification/toast";
import React from "react";

const Password = ({
  verifyUserData,
  setUserVerifyData,
  setContent,
  handleResetPassword,
}) => {
  const handleChangeInput = (name, value) => {
    setUserVerifyData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangePassword = () => {
    if (verifyUserData.password !== verifyUserData.repeated_password) {
      toast.error("پسورد و تکرار آن یکسان نیست.");
    } else {
      let apiData = {
        number_email: verifyUserData.number_email,
        verify_code: verifyUserData.verify_code.join(""),
        password: verifyUserData.password,
      };
      handleResetPassword(apiData)
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between text-[#303D47] m-4">
        <h2 className="text-[25px]">بازیابی رمز عبور</h2>
        <div
          onClick={() => setContent('auth')}
          className="flex items-center cursor-pointer"
        >
          <BackIcon className="mx-3" />
          <span>بازگشت</span>
        </div>
      </div>
      <div className="m-4 flex flex-col mt-[3rem]">
        <p className="mb-3 text-[14px] text-[#303D47]">
          رمز عبور جدید خود را وارد کنید.
        </p>
        <div>
          <div className="flex">
            <div className="w-[50%]">
              <TextInput
                value={verifyUserData.password}
                name="password"
                onChange={(e) =>
                  handleChangeInput(e.target.name, e.target.value)
                }
                label="رمز عبور"
              />
            </div>
            <div className="w-[50%]">
              <TextInput
                value={verifyUserData.repeated_password}
                name="repeated_password"
                onChange={(e) =>
                  handleChangeInput(e.target.name, e.target.value)
                }
                label="تکرار رمز"
              />
            </div>
          </div>
          <p className="text-[#90999F] mx-4 mt-[-0.3rem] mb-4">
            رمز باید انگلیسی و شامل حداقل 8 کاراکتر و حروف بزرگ و کوچک باشد.
          </p>
        </div>

        <button
          onClick={() => handleChangePassword()}
          className="bg-[#534CDA] color-white h-[4.063rem] rounded-[1.438rem] m-4"
        >
          تغییر رمز
        </button>
      </div>
    </div>
  );
};

export default Password;
