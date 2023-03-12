import React, { use, useState } from "react";
import TextInput from "../TextInput";
import GoogleIcon from "@/public/icons/google.svg";
import { useLoginUserMutation } from "@/datasources/auth/remote/AuthSliceApi";
import { handleApiError } from "@/datasources/errorHandler";
import {
  createValidMobileNumber,
  isPersionMobileNumber,
} from "@/utils/helpers/form";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { setCookie } from "cookies-next";
import { isEmpty } from "@/utils/general";
import Avatar from "@/public/images/Avatar.svg";

const Login = ({ setSelectedTab }) => {
  const { data: session } = useSession();
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const [loginUser, { data, isSuccess: isSendCodeSuccess, isError, error }] =
    useLoginUserMutation();
  const router = useRouter();

  const setForm = (name, value) => {
    setLoginInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleLoginUser = async () => {
    let apiData = {
      username: isPersionMobileNumber(loginInfo.username)
        ? createValidMobileNumber(loginInfo.username)
        : loginInfo.username,
      password: loginInfo.password,
    };
    loginUser(apiData)
      .unwrap()
      .then((response) => {
        setCookie("valavid_token", response.token);
        if (!isEmpty(router.query?.callback)) {
          router.push(router.query.callback);
        } else {
          router.push("/profile/me");
        }
      })
      .catch((err) => {
        handleApiError(err);
      });
  };
  return (
    <div className="flex flex-col mt-[2rem]">
      <div className="mx-auto mb-[1rem] flex items-center justify-center rounded-full pt-[1rem] pl-[2px] w-[6rem] h-[6rem] bg-[#D6DADC]">
      <Avatar />
      </div>
      <TextInput
        name="username"
        type="text"
        value={loginInfo.username}
        onChange={(e) => {
          setForm(e.target.name, e.target.value);
        }}
        label="نام کاربری/ایمیل/شماره تلفن"
      />
      <TextInput
        name="password"
        type="password"
        value={loginInfo.password}
        onChange={(e) => {
          setForm(e.target.name, e.target.value);
        }}
        label="رمز عبور"
      />
      <div className="my-4 flex flex-col">
        <button
          onClick={() => handleLoginUser()}
          className="bg-[#534CDA] color-white mx-4 mb-1 h-[4.063rem] rounded-[1.438rem]"
        >
          ورود
        </button>
        <button
          onClick={() => signIn("google")}
          className="border border-secondary-300 flex items-center justify-center text-[#54626C] mx-4 mt-1 h-[4.063rem] rounded-[1.438rem]"
        >
          <span>ورود با حساب گوگل</span>
          <GoogleIcon className="w-[32.35px] h-[33px] mx-3" />
        </button>
      </div>
      <div className="flex-col sm:flex-row flex items-center m-4">
        <a
          onClick={() => setSelectedTab("recovery")}
          className="mb-3 sm:mb-0 text-[#534CDA] cursor-pointer"
        >
          پسورد خود را فراموش کرده اید؟
        </a>
        <span className="hidden sm:block text-[#303D47] mx-4">|</span>
        <p className="text-[#303D47]">
          حساب کاربری ندارید؟{" "}
          <a className="text-[#534CDA]">ساخت اکانت والاوید</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
