import {
  useCancelWithdrawalMutation,
  useGetAccountingListQuery,
} from "@/datasources/Accounting/remote/AccountingSliceApi";
import { BiCheck, BiError } from "react-icons/bi";
import { FiClock } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import { MdErrorOutline, MdOutlineCancel } from "react-icons/md";
import Button from "../../Button";
import React, { useState } from "react";
import Diposit from "./Deposit";
import Withdrawal from "./Withdrawal";
import moment from "jalali-moment";
import { handleApiError } from "@/datasources/errorHandler";
import _toast from "@/utils/notification/toast";
import { useGetProfileDetailsQuery } from "@/datasources/user/remote/UserSliceApi";

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
  const [cancelWithdrawal, { data2, isSuccess: d, isError: g, error: l }] =
    useCancelWithdrawalMutation();

  const {
    data: profileData,
    isSuccess: profileIsSuccess,
    isLoading: profileIsLoading,
  } = useGetProfileDetailsQuery();

  const handleCancelWithdrawal = (id) => {
    cancelWithdrawal({ id })
      .unwrap()
      .then(() => {
        _toast.success("درخواست با موفقیت انجام شد.");
      })
      .catch((err) => {
        handleApiError(err);
      });
  };

  const getTransactionStatus = (status) => {
    switch (status.type) {
      case "waiting":
        return (
          <div
            className={
              "text-lg w-full md:w-44 px-5 py-3 flex items-center justify-center gap-3 bg-accent rounded-2xl"
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
              "text-xl w-full md:w-44 px-5 py-3 flex items-center justify-center gap-3  bg-warning rounded-2xl"
            }
            link={""}
          >
            <MdOutlineCancel className="text-2xl"></MdOutlineCancel>
            لغو شده
          </div>
        );
        break;
        case "redirect to bank":
          return (
            <div
              className={
                "text-xl w-full md:w-44 px-5 py-3 flex items-center justify-center gap-3  bg-primary rounded-2xl"
              }
              link={""}
            >
                هدایت به بانک
            </div>
          );
          break;
       
      case "pending":
        return (
          <div
            className={
              "text-lg w-full md:w-44 px-5 py-3 flex items-center justify-center gap-3 bg-accent rounded-2xl"
            }
            link={""}
          >
            <FiClock className="text-2xl text-[#ffffff96]"></FiClock>
            در حال برسی
          </div>
        );
        break;
      case "complete":
        return (
          <div
            className={
              "text-xl w-full md:w-44 px-5 py-3 flex items-center justify-center gap-3  bg-success rounded-2xl"
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
              "text-xl w-full md:w-44 px-5 py-3 flex items-center justify-center gap-3  bg-error rounded-2xl"
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
      <div className="flex gap-7 justify-between items-center pt-6">
        <div className="flex gap-5">
          <Button
            onClick={() => setModal("deposit")}
            className={"btn-primary py-4 px-7 rounded-full"}
          >
            واریز به کیف پول
          </Button>
          {/* {profileData && profileData.is_seller && ( */}
            <Button
              onClick={() => setModal("withdrawal")}
              className={"btn-primary py-4 px-7 rounded-full"}
            >
              برداشت از کیف پول
            </Button>
          {/* )} */}
        </div>
        <div className="flex gap-2 items-center text-lg">
          <p className="text-xl opacity-80">موجودی :</p>
          <p className="text-2xl">{inventory}</p>
          <span className="">تومان</span>
        </div>
      </div>
      <div className="pt-10 flex flex-col">
        <div className="">
          <div className="h-16 hidden sm:flex w-full justify-between">
            <div className="flex-[5.25] flex sm:gap-2">
            <div className="text-start pr-14 flex-[1.45]">تاریخ درخواست</div>
            <div className="text-start flex-1">عنوان</div>
            <div className="text-start flex-1">تاریخ انجام </div>
            <div className="text-start flex-[1.5]">شماره تراکنش</div>
            <div className="text-start flex-1">مبلغ</div>
            </div>
           <div className="md:flex-[3] flex sm:gap-2">
           <div className="text-start flex-1 hidden md:block"></div>
            <div className="text-center flex-[2] hidden md:block">وضعیت</div>
           </div>
          </div>
        </div>
        <div className="">
          {data &&
            data.transactions.map((transaction, index) => (
              <div className="relative flex flex-col md:flex-row" key={index}>
                <div className="flex-col sm:flex-row flex flex-[5.25] sm:gap-2">
                  <div className="pt-8 pb-3 px-6 sm:px-0 sm:pt-10 sm:pb-10 sm:pr-14 flex-[1.45] flex items-center">
                    <span className="sm:hidden text-secondary-300 ml-6 w-[80px]">تاریخ درخواست</span>
                    <span>
                      {moment(transaction.requested_at, "YYYY/MM/DD")
                        .locale("fa")
                        .format("YYYY/MM/DD")}
                    </span>
                    <div className="absolute border border-solid bg-secondary z-[-1] border-accent w-full h-[calc(100%_-_1.5rem)] m-auto left-0 right-0 rounded-[2rem] top-0 bottom-0"></div>
                  </div>
                  <div className="py-3 px-6 sm:px-0 sm:py-10 flex-1 flex items-center">
                    <span className="sm:hidden text-secondary-300 ml-6 w-[80px]">عنوان</span>
                    <span>{transaction.title}</span>
                  </div>
                  <div className="py-3 px-6 sm:px-0 sm:py-10 flex-1 flex items-center">
                    <span className="sm:hidden text-secondary-300 ml-6 w-[80px]">تاریخ انجام</span>
                    <span>
                      {/* {moment(transaction.paid_at, "YYYY/MM/DD")
                      .locale("fa")
                      .format("YYYY/MM/DD")} */}
                      1401/11/03
                    </span>
                  </div>
                  <div className="py-3 px-6 sm:px-0 sm:py-10 flex-[1.5] flex items-center">
                    <span className="sm:hidden text-secondary-300 ml-6 w-[80px]">شماره تراکنش</span>
                    <span>{transaction.transaction}</span>
                  </div>
                  <div className="pt-3 pb-8 px-6 sm:px-0 sm:pt-10 sm:pb-10 flex-1 flex items-center">
                    <span className="sm:hidden text-secondary-300 ml-6 w-[80px]">مبلغ</span>
                    <span>{transaction.amount}</span>
                  </div>
                </div>
                <div className="md:flex-[3] flex sm:gap-2">
                  <div className="py-10 md:flex-1 flex items-center pt-0 md:pt-10">
                    {transaction.can_cancel === true ? (
                      <div
                        onClick={() => handleCancelWithdrawal(transaction.id)}
                        className="flex justify-end items-center gap-1 text-[#EF4345] cursor-pointer pr-4"
                      >
                        <RiCloseLine className="text-2xl"></RiCloseLine>
                        لغو درخواست
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="py-10 flex justify-center flex-1 md:flex-auto px-6 md:px-0 pt-0 md:pt-10">
                    {getTransactionStatus(transaction.status)}
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* <table class="table-auto w-full">
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
                  <td className="py-10"> */}
        {/* {moment(transaction.paid_at, "YYYY/MM/DD")
                      .locale("fa")
                      .format("YYYY/MM/DD")} */}
        {/* </td>
                  <td className="py-10">{transaction.transaction}</td>
                  <td className="py-10">{transaction.amount}</td>
                  <td className="py-10">
                    {transaction.can_cancel === true ? (
                      <div
                        onClick={() => handleCancelWithdrawal(transaction.id)}
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
        </table> */}
      </div>
    </div>
  );
};

export default Accounting;
