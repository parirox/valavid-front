import { useResetUserPasswordMutation } from "@/datasources/auth/remote/AuthSliceApi";
import { handleApiError } from "@/datasources/errorHandler";
import toast from "@/utils/notification/toast";
import React, { useState } from "react";
import Authentication from "../Authentication";
import Mobile from "./Mobile";
import Password from "./Password";

const PasswordRecovery = ({ setSelectedTab }) => {
  const [content, setContent] = useState("mobile");
  const [verifyUserData, setUserVerifyData] = useState({
    number_email: "",
    verify_code: "",
    password: "",
    repeated_password: "",
  });

  const [
    resetUserPassword,
    { data: verificationData, isSuccess: isSendCodeSuccess },
  ] = useResetUserPasswordMutation();

  const handleBackBtnClick = () => {
    switch (content) {
      case "password":
        setContent("auth");
        break;
      case "mobile":
        setSelectedTab("login");
        break;
      default:
        break;
    }
  };

  const handleResetPassword = (data) => {
    resetUserPassword(data)
      .unwrap()
      .then((response) => {
        toast.success(response.message);
      })
      .catch((err) => {
        handleApiError(err);
      });
  };

  return (
    <div>
      {content === "mobile" && (
        <Mobile
          verifyUserData={verifyUserData}
          setUserVerifyData={setUserVerifyData}
          setContent={setContent}
          setSelectedTab={setSelectedTab}
        />
      )}
      {content === "auth" && (
        <Authentication
          handleClickBackBtn={() => setContent("mobile")}
          handleClickEditBtn={() => setContent("mobile")}
          number_email={verifyUserData.number_email}
          handleSendForm={() => setContent("password")}
          setState={setUserVerifyData}
          state={verifyUserData}
        />
      )}
      {content === "password" && (
        <Password
          verifyUserData={verifyUserData}
          setUserVerifyData={setUserVerifyData}
          setContent={setContent}
          handleResetPassword={handleResetPassword}
        />
      )}
    </div>
  );
};

export default PasswordRecovery;
