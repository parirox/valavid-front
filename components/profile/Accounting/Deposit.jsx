import Modal from "@/components/Modal";
import { RadioGroup } from "@headlessui/react";
import SamanBank from "../../../public/icons/SamanBank.svg";
import PasargadBank from "../../../public/icons/PasargadBank.svg";
import ParsianBank from "../../../public/icons/ParsianBank.svg";
import Button from "@/components/Button";
import React, {useState} from "react";

const Deposit = ({ isOpen, setIsOpen }) => {
  const [paymentGateway, setPaymentGateway] = useState(null);
  const options = [
    {
      label: "10000",
      value: "10000",
    },
    {
      label: "100000",
      value: "100000",
    },
    {
      label: "20000",
      value: "20000",
    },
    {
      label: "20000",
      value: "20000",
    },
  ];
  return (
    <Modal isOpen={isOpen ?? false} setIsOpen={setIsOpen} big={true} background="bg-[#F8F8F8]">
      <h4 className="text-secondary-300 text-start">واریز وجه</h4>
      <h5 className="text-secondary text-start mt-[3rem] mb-[2rem]">
        مبلغ واریز
      </h5>

      <div className="flex items-start">
        <RadioGroup value="startup">
          <div className="grid grid-cols-2 grid-row-2 gap-2">
            {options.map((option, index) => (
              <RadioGroup.Option
                className="bg-color8 w-[245px] h-[63px] rounded-[23px] p-4 flex items-center cursor-pointer"
                value={option.value}
                key={index}
              >
                {({ checked }) => (
                  <div className="flex items-center">
                    <div
                      className={`w-[20px] h-[20px] rounded-full bg-white border border-secondary-300 flex items-center justify-center`}
                    >
                      <div
                        className={
                          checked
                            ? "bg-primary w-[12px] h-[12px] rounded-full"
                            : " bg-white w-[100%] h-[100%] rounded-full"
                        }
                      />
                    </div>
                    <div className="text-secondary flex items-center">
                      <span className="block mx-4">{option.label}</span>
                      <span>تومان</span>
                    </div>
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
        <div className="border border-secondary-300 rounded-[23px] h-[80px] w-[400px] mx-4 p-3 flex items-center">
          <div className="text-secondary border-l border-secondary-300 h-[80%] pl-4 flex items-center">
            مبلغ دلخواه(تومان)
          </div>
          <input
            placeholder="مبلغ خود را ایجا وارد کنید."
            type="number"
            className="flex-1 text-secondary-300 border-none outline-none ltr"
          />
        </div>
      </div>
      <h5 className="text-secondary text-start mt-[3rem] mb-3">درگاه</h5>
      <div className="flex items-center">
        <div on className="m-4 cursor-pointer">
          <SamanBank />
        </div>
        <div className="m-4 cursor-pointer">
          <PasargadBank />
        </div>{" "}
        <div className="m-4 cursor-pointer">
          <ParsianBank />
        </div>
      </div>
      <p className="text-secondary-300 text-start my-4">
        در هنگام انجام تراکنش به هیچ عنوان از نرم افزارهای فیلترشکن استفاده
        نفرمایید.
      </p>
      <p className="text-secondary-300 text-start my-[3rem]">
        در صورتی که پس از انجام تراکنش و کسر مبلغ آن از حساب شما {'"قدرت خرید"'} شما
        شارژ نشد مبلغ تراکنش در اسرع وقت به صورت خودکار (توسط سیستم بانکی) به
        حساب شما بزاگزدانده خواهد شد.
      </p>
      <Button className="w-[20rem] h-[4rem] btn-primary mt-4 block ">
        واریز وجه
      </Button>
    </Modal>
  );
};

export default Deposit;
