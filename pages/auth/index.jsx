import Login from "@/components/auth/Login";
import Flower from "../../public/icons/Flower.svg";
import clsx from "clsx";
import { useState } from "react";
import SignUpForm from "@/components/auth/SignUp";
import PasswordRecovery from "@/components/auth/PasswordRecovery";

const Index = () => {
  const [selectedTab, setSelectedTab] = useState("login");
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex relative">
        <div className="min-w-[300px] bg-[#F2F2F3] w-100 mx-4 sm:mx-0 sm:w-[40.188rem] rounded-[23px] lg:rounded-tl-[0] lg:rounded-bl-[0] p-3">
          {(selectedTab === "login" || selectedTab === "signup") && (
            <>
              <div>
                <div className="m-4 border-b border-[#D6DADC] text-[#90999F] flex text-2xl items-center justify-around">
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
                {selectedTab === "signup" && <SignUpForm />}
              </div>
            </>
          )}
          {selectedTab === "recovery" && <PasswordRecovery setSelectedTab={setSelectedTab} />}
        </div>
        <div className="hidden lg:flex bg-hero-pattern bg-no-repeat bg-cover bg-center lg:w-[370px] xl:w-[600px] h-[460px] rounded-tl-[23px] rounded-bl-[23px] flex items-center justify-center">
          <h2 className="lg:text-[22px] xl:text-[35px] m-3">خوشحال میشیم به جمع ما بپیوندید.</h2>
        </div>
        <Flower className="hidden lg:block absolute left-[-67px] bottom-[-58px]" />
      </div>
    </div>
  );
};

export default Index;
