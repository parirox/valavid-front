import { useGetAccountingListQuery } from "@/datasources/Accounting/remote/AccountingSliceApi";
import { BiCheck } from "react-icons/bi";
import { FiClock } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import Button from "../../Button";
import React, { useState } from "react";
import Diposit from "./Deposit";
import Withdrawal from "./Withdrawal";

const inventory = 2500000;
const AccountingCardData = [
  {
    title: "تقاضای وجه",
    date: {
      request: "1400/1/25",
      payment: "1400/1/25",
    },
    price: 254000,
    status: 0,
  },
  {
    title: "تقاضای وجه",
    date: {
      request: "1400/1/25",
      payment: "1400/1/25",
    },
    price: 254000,
    status: 1,
  },
  {
    title: "تقاضای وجه",
    date: {
      request: "1400/1/25",
      payment: "1400/1/25",
    },
    price: 254000,
    status: 0,
  },
];

const Accounting = () => {
  const [modal, setModal] = useState(null);
  const { data, isFetching, isSuccess, isLoading, isError, error } =
    useGetAccountingListQuery();
  return (
    <div>
      {modal === "deposit" && (
        <Diposit isOpen={modal === "deposit"} setIsOpen={setModal} />
      )}
      {modal === "withdrawal" && (
        <Withdrawal isOpen={modal === "withdrawal"} setIsOpen={setModal} />
      )}
      {console.log("acccc", data)}
      <div className="flex gap-7 justify-between items-center pt-6">
        <div className="flex gap-5">
          <Button
            onClick={() => setModal("deposit")}
            className={"btn-primary py-4 px-7 rounded-full"}
          >
            واریز به کیف پول
          </Button>
          <Button
            onClick={() => setModal("withdrawal")}
            className={"btn-primary py-4 px-7 rounded-full"}
          >
            برداشت از کیف پول
          </Button>
        </div>
        <div className="flex gap-2 items-center text-lg">
          <p className="text-xl opacity-80">موجودی :</p>
          <p className="text-2xl">{inventory}</p>
          <span className="">تومان</span>
        </div>
      </div>
      <div className="pt-10">
        <table class="table-auto w-full">
          <thead>
            <tr className="h-16">
              <th className="text-start pr-14">تاریخ درخواست</th>
              <th className="text-start">عنوان</th>
              <th className="text-start">تاریخ انجام </th>
              <th className="text-start">شماره تراکنش</th>
              <th className="text-start">مبلغ</th>
              <th className="text-start"></th>
              <th className="text-center">وضعیت</th>
            </tr>
          </thead>
          <tbody className="">
            {AccountingCardData.map((data, index) => (
              <tr className="relative" key={index}>
                <td className="py-10 pr-14">
                  <div className="">{data.date.request}</div>
                  <div className="absolute border border-solid bg-secondary z-[-1] border-accent w-full h-[calc(100%_-_1.5rem)] m-auto left-0 right-0 rounded-[2rem] top-0 bottom-0"></div>
                </td>
                <td className="py-10">{data.title}</td>
                <td className="py-10">{data.date.payment}</td>
                <td className="py-10">{data.date.payment}</td>
                <td className="py-10">{data.date.payment}</td>
                <td className="py-10">
                  {data.status == 1 ? (
                    <div className="flex justify-end items-center gap-1 text-[#EF4345]">
                      <RiCloseLine className="text-2xl"></RiCloseLine>
                      لغو درخواست
                    </div>
                  ) : (
                    ""
                  )}
                </td>
                <td className="py-10 flex justify-center">
                  {data.status == 1 ? (
                    <div
                      className={
                        "text-lg w-44 px-5 py-3 flex items-center gap-3 bg-accent rounded-3xl"
                      }
                      link={""}
                    >
                      <FiClock className="text-2xl text-[#ffffff96]"></FiClock>
                      در حال برسی
                    </div>
                  ) : (
                    <div
                      className={
                        "text-xl w-44 px-5 py-3 flex items-center gap-3  bg-success rounded-3xl"
                      }
                      link={""}
                    >
                      <BiCheck className="text-2xl bg-[#ffffff54] rounded-[50%]"></BiCheck>
                      انجام شده
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Accounting;
