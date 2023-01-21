import {
  useCancelWithdrawalMutation,
  useGetAccountingListQuery,
} from "@/datasources/Accounting/remote/AccountingSliceApi";
import { BiCheck , BiError } from "react-icons/bi";
import { FiClock } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import { MdErrorOutline, MdOutlineCancel } from "react-icons/md";
import Button from "../../Button";
import React, { useState } from "react";
import Diposit from "./Deposit";
import Withdrawal from "./Withdrawal";
import moment from "jalali-moment";

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
  const [cancelWithdrawal, { data: t, isSuccess: d, isError: g, error: l }] =
    useCancelWithdrawalMutation();

  const handleCancelWithdrawal = (id) => {
    cancelWithdrawal({ id })
      .unwrap()
      .then(() => {});
  };

  const getTransactionStatus = (status) => {
    switch (status.type) {
      case "waiting":
        return (
          <div
            className={
              "text-lg w-44 px-5 py-3 flex items-center gap-3 bg-accent rounded-3xl"
            }
            link={""}
          >
            <FiClock className="text-2xl text-[#ffffff96]"></FiClock>
            در حال برسی
          </div>
        );
        break;
      case "cancel by user":
        return (
          <div
            className={
              "text-xl w-44 px-5 py-3 flex items-center gap-3  bg-warning rounded-3xl"
            }
            link={""}
          >
            <MdOutlineCancel className="text-2xl"></MdOutlineCancel>
            لغو شده
          </div>
        );
        break;
      case "pending":
        break;
      case "complete":
        return (
          <div
            className={
              "text-xl w-44 px-5 py-3 flex items-center gap-3  bg-success rounded-3xl"
            }
            link={""}
          >
            <BiCheck className="text-2xl bg-[#ffffff54] rounded-[50%]"></BiCheck>
            انجام شده
          </div>
        );
        break;
      case "unknown error acquired":
        return (
          <div
            className={
              "text-xl w-44 px-5 py-3 flex items-center gap-3  bg-error rounded-3xl"
            }
            link={""}
          >
            <MdErrorOutline className="text-2xl"></MdErrorOutline>
            خطا
          </div>
        );
        break;

      default:
        break;
    }
  };

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
            {data &&
              data.transactions.map((transaction, index) => (
                <tr className="relative" key={index}>
                  <td className="py-10 pr-14">
                    <div className="">
                      {moment(transaction.requested_at, "YYYY/MM/DD")
                        .locale("fa")
                        .format("YYYY/MM/DD")}
                    </div>
                    <div className="absolute border border-solid bg-secondary z-[-1] border-accent w-full h-[calc(100%_-_1.5rem)] m-auto left-0 right-0 rounded-[2rem] top-0 bottom-0"></div>
                  </td>
                  <td className="py-10">{transaction.title}</td>
                  <td className="py-10">
                    {/* {moment(transaction.paid_at, "YYYY/MM/DD")
                      .locale("fa")
                      .format("YYYY/MM/DD")} */}
                  </td>
                  <td className="py-10">{transaction.transaction}</td>
                  <td className="py-10">{transaction.amount}</td>
                  <td className="py-10">
                    {transaction.can_cancel === true ? (
                      <div
                        onClick={() =>
                          handleCancelWithdrawal(transaction.id)
                        }
                        className="flex justify-end items-center gap-1 text-[#EF4345] cursor-pointer"
                      >
                        <RiCloseLine className="text-2xl"></RiCloseLine>
                        لغو درخواست
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="py-10 flex justify-center">
                    {getTransactionStatus(transaction.status)}
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
