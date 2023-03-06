import Login from "@/components/auth/Login";
import Flower from "../../public/icons/Flower.svg";
import clsx from "clsx";
import {useState} from "react";
import PasswordRecovery from "@/components/auth/PasswordRecovery";
import SignUp from "@/components/auth/SignUpForm";
import {createValidMobileNumber, isPersionMobileNumber,} from "@/utils/helpers/form";
import {useSignupUserMutation} from "@/datasources/auth/remote/AuthSliceApi";
import {handleApiError} from "@/datasources/errorHandler";
import Authentication from "@/components/auth/Authentication";
import {useRouter} from "next/router";
import {setCookie} from "cookies-next";
import _toast from "@/utils/notification/toast";
import {IoClose, IoHome} from "react-icons/io5";
import {isEmpty} from "@/utils/general";

const Index = () => {
  const [selectedTab, setSelectedTab] = useState("login");
  const [signupData, setSignupData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    number_email: "",
    verify_code: ["", "", "", ""],
    password: "",
    repeated_password: "",
  });

  const [signupUser] = useSignupUserMutation();

  const router = useRouter();

  const handleSignupUser = () => {
    let apiData = {
      first_name: signupData.first_name,
      last_name: signupData.last_name,
      username: signupData.username,
      number_email: isPersionMobileNumber(signupData.number_email)
        ? createValidMobileNumber(signupData.number_email)
        : signupData.number_email,
      password: signupData.password,
      verify_code: signupData.verify_code.join(""),
    };
    signupUser(apiData)
      .unwrap()
      .then((response) => {
        _toast.success("ثبت نام با موفقیت انجام شد");
        setCookie("valavid_token", response.token);

        if(!isEmpty(router.query?.callback)){
          router.push(router.query.callback);
        }else{
          router.push("/profile/me");
        }
      })
      .catch((error) => handleApiError(error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <IoHome
        onClick={async () => await router.push("/")}
        className="w-8 h-8 absolute top-8 left-8 cursor-pointer"
      />
      <div className="flex relative">
        <div className="min-w-[300px] max-h-[525px] bg-[#F2F2F3] w-100 mx-4 sm:mx-0 sm:w-[40.188rem] rounded-[23px] lg:rounded-tl-[0] lg:rounded-bl-[0] p-3">
          {(selectedTab === "login" || selectedTab === "signup") && (
            <>
              <div>
                <div className="m-4 border-b border-secondary-300 text-[#90999F] flex text-2xl items-center justify-around">
                  <div
                    className={clsx(
                      "py-5 px-6 cursor-pointer",
                      selectedTab === "signup" &&
                        "text-[#303D47] border-b-2 border-[#303D47]"
                    )}
                    onClick={() => setSelectedTab("signup")}
                  >
                    عضویت
                  </div>

                  <div
                    onClick={() => setSelectedTab("login")}
                    className={clsx(
                      "py-5 px-6 cursor-pointer",
                      selectedTab === "login" &&
                        "text-[#303D47] border-b-2 border-[#303D47]"
                    )}
                  >
                    ورود
                  </div>
                </div>
              </div>
              <div>
                {selectedTab === "login" && (
                  <Login setSelectedTab={setSelectedTab} />
                )}
                {selectedTab === "signup" && (
                  <SignUp
                    signupData={signupData}
                    setSignupData={setSignupData}
                    setSelectedTab={setSelectedTab}
                  />
                )}
              </div>
            </>
          )}
          {selectedTab === "auth" && (
            <Authentication
              handleClickBackBtn={() => setSelectedTab("signup")}
              handleClickEditBtn={() => setSelectedTab("signup")}
              number_email={signupData.number_email}
              handleSendForm={handleSignupUser}
              setState={setSignupData}
              state={signupData}
            />
          )}
          {selectedTab === "recovery" && (
            <PasswordRecovery setSelectedTab={setSelectedTab} />
          )}
        </div>
        <div className="hidden lg:flex bg-hero-pattern bg-no-repeat bg-cover bg-center lg:w-[370px] xl:w-[600px] max-h-[525px] rounded-tl-[23px] rounded-bl-[23px] flex items-center justify-center">
          <h2 className="lg:text-[22px] xl:text-[35px] m-3">
            خوشحال میشیم به جمع ما بپیوندید.
          </h2>
        </div>
        <Flower className="hidden lg:block absolute left-[-67px] bottom-[-58px]" />
      </div>
    </div>
  );
};

export default Index;
