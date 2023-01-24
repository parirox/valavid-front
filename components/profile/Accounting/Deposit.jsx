import Modal from "@/components/Modal";
import { RadioGroup } from "@headlessui/react";
import zarinpal from "../../../public/images/zarinpal.png";
import mellat from "../../../public/images/mellat.png";
import Button from "@/components/Button";
import Image from "next/image";
import React, { useState } from "react";
import { useDepositeMutation } from "@/datasources/Accounting/remote/AccountingSliceApi";
import Router from "next/router";
import { handleApiError } from "@/datasources/errorHandler";
import _toast from "@/utils/notification/toast";
import GatewaysList from "@/components/GatewaysList";

const Deposit = ({ isOpen, setIsOpen }) => {
  const [paymentGateway, setPaymentGateway] = useState(null);
  const [amount, setAmount] = useState(null);

  const [deposit, { data, isSuccess, isError, error }] = useDepositeMutation();

  const options = [
    {
      label: "100000",
      value: "100000",
    },
    {
      label: "1000000",
      value: "1000000",
    },
    {
      label: "200000",
      value: "200000",
    },
    {
      label: "2000000",
      value: "2000000",
    },
  ];

  const handleDeposit = () => {
    deposit({
      amount: amount,
      bank: paymentGateway,
    })
      .unwrap()
      .then((data) => {
        if (data.result) {
          Router.push(data.payment_url);
        } else {
          _toast.error(data.amount);
        }
      })
      .catch((err) => {
        handleApiError(err);
      });
  };

  return (
    <Modal
      isOpen={isOpen ?? false}
      setIsOpen={setIsOpen}
      big={true}
      background="bg-[#F8F8F8]"
    >
      <h4 className="text-secondary-300 text-start">واریز وجه</h4>
      <h5 className="text-secondary text-start mt-[3rem] mb-[2rem]">
        مبلغ واریز
      </h5>

      <div className="flex items-start">
        <RadioGroup value={amount} onChange={(item) => setAmount(item)}>
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
                      <span>ریال</span>
                    </div>
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
        <div className="border border-secondary-300 rounded-[23px] h-[80px] w-[400px] mx-4 p-3 flex items-center">
          <div className="text-secondary border-l border-secondary-300 h-[80%] pl-4 flex items-center">
            مبلغ دلخواه(ریال)
          </div>
          <input
            placeholder="مبلغ خود را ایجا وارد کنید."
            type="number"
            className="flex-1 text-secondary-300 border-none outline-none ltr bg-[#F8F8F8]"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>
      <h5 className="text-secondary text-start mt-[3rem] mb-3">درگاه</h5>
      <GatewaysList state={paymentGateway} setter={setPaymentGateway}/>
      <p className="text-secondary-300 text-start my-4">
        در هنگام انجام تراکنش به هیچ عنوان از نرم افزارهای فیلترشکن استفاده
        نفرمایید.
      </p>
      <p className="text-secondary-300 text-start my-[3rem]">
        در صورتی که پس از انجام تراکنش و کسر مبلغ آن از حساب شما {'"قدرت خرید"'} شما
        شارژ نشد مبلغ تراکنش در اسرع وقت به صورت خودکار (توسط سیستم بانکی) به
        حساب شما بزاگزدانده خواهد شد.
      </p>
      <Button
        onClick={() => handleDeposit()}
        className="w-[20rem] h-[4rem] btn-primary mt-4 block "
      >
        واریز وجه
      </Button>
    </Modal>
  );
};

export default Deposit;
