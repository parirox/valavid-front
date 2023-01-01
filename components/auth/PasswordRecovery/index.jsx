import React, { useState } from "react";
import BackIcon from "@/public/icons/Back.svg";
import TextInput from "@/components/TextInput";
import Mobile from "./Mobile";
import Password from "./Password";
import Authentication from "./Authentication";

const PasswordRecovery = ({setSelectedTab}) => {
  const [content, setContent] = useState("mobile");

  const handleBackBtnClick = () => {
    switch (content) {
      case "password":
        setContent("auth");
        break;
      case "auth":
        setContent("mobile");
        break;
      case "mobile":
        setSelectedTab("login");
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between text-[#303D47] m-4">
        <h2 className="text-[25px]">
          {content === "auth" ? "احراز هویت" : "بازیابی رمز عبور"}
        </h2>
        <div
          onClick={() => handleBackBtnClick()}
          className="flex items-center cursor-pointer"
        >
          <BackIcon className="mx-3" />
          <span>بازگشت</span>
        </div>
      </div>
      {content === "mobile" && <Mobile setContent={setContent} />}
      {content === "auth" && <Authentication setContent={setContent} />}
      {content === "password" && <Password setContent={setContent} />}
    </div>
  );
};

export default PasswordRecovery;
