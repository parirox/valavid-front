import React, { useState } from "react";
import Modal from "@/components/Modal";
import RangeInput from "@/components/RangeInput";
import Button from "@/components/Button";
import { useWithdrawalMutation } from "@/datasources/Accounting/remote/AccountingSliceApi";
import _toast from "@/utils/notification/toast";
import { handleApiError } from "@/datasources/errorHandler";

const Withdrawal = ({ isOpen, setIsOpen }) => {
  const [amount, setAmount] = useState(0);
  const [withdrawal, { data, isSuccess, isError, error }] =
    useWithdrawalMutation();

  const handleWithdrawal = () => {
    withdrawal({
      amount,
      title: "تقاضای وجه",
    })
      .unwrap()
      .then(() => {
        _toast.success("درخواست با موفقیت ثبت شد");
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
      <h4 className="text-secondary-300 text-start">برداشت وجه</h4>
      <div className="flex items-center">
        <div className="flex flex-col">
          <h5 className="text-secondary text-start mt-[3rem] mb-[2rem]">
            مبلغ برداشت
          </h5>
          <div className="h-[176px] w-[400px] rounded-[23px] border border-secondary-300 py-4 px-[3rem] flex items-center justify-center">
            <RangeInput
              min={100000}
              max={1000000}
              step={10}
              state={[]}
              setState={setAmount}
            ></RangeInput>
          </div>
        </div>
        <div className="flex flex-col mr-4">
          <div className="flex items-baseline justify-between">
            <h5 className="text-secondary text-start mt-[3rem] mb-[2rem]">
              شماره حساب بانک مقصد
            </h5>
            <a className="text-primary">تغییر شماره حساب</a>
          </div>
          <div className="bg-color8 h-[176px] w-[400px] rounded-[23px] p-[2.5rem] flex flex-col items-start justify-between text-secondary">
            <h6>بانک ملی</h6>
            <div className="w-full">
              <div className="flex items-center justify-between w-full my-[2rem]">
                <span>شماره حساب:</span>
                <span>1111111111111</span>
              </div>
              <div className="flex items-center justify-between w-full ">
                <span>شماره شبا:</span>
                <span>1111111111111</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-secondary text-start my-[3rem]">
        <p className="text-secondary my-[2rem]">
          برای ثبت درخواست وجه برای تاریخ 07اذر باید تا قبل از ساعت 14 روز 06
          آذر درخواست خود را ثبت نمایید.
        </p>
        <p className="text-secondary my-[2rem]">
          مانده قابل برداشت در صورتی که مربوط به فروش روز جاری باشد با اندکی
          تاخیر به روز میگردد.
        </p>
        <span className="text-secondary block my-[2rem]">
          <p className="text-secondary">تغییر شماره حساب:</p>
          <p className="text-secondary">
            برای تغییر شماره حساب با کلیک بر روی لینک {'"تغییر شماره حساب"'} به حساب
            کاربری وارد میشوید پس از ورود در بخش اطلاعات حساب کاربری با کلیک بر
            روی شماره حساب خود میتوانید شماره حساب جدید خود را معرفی نمایید.
          </p>
        </span>
      </div>
      <Button
        onClick={() => handleWithdrawal()}
        className="w-[20rem] h-[4rem] btn-primary mt-4 block "
      >
        ثبت درخواست برداشت
      </Button>
    </Modal>
  );
};

export default Withdrawal;
