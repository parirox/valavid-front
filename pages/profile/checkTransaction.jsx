import {isEmpty} from "@/utils/general";
import Head from "next/head";
import {useRouter} from "next/router";
import React, {useEffect, useRef, useState} from "react";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {wrapper} from "@/datasources/store";
import payment_api, {CheckTransaction, useCheckTransactionQuery} from "@/datasources/payment/remote/PaymentSliceApi";
import {TbFaceIdError} from "react-icons/tb";
import {IoMdCheckmarkCircleOutline} from "react-icons/io";
import Button from "@/components/Button";
import {form_fields} from "@/utils/form/messages";

function CheckTransactionPage({query}) {

  const router = useRouter();

  const [callToAction,setCallToAction] = useState({
    link:"",
    text:""
  });

  const {data, isSuccess, isError, error, isFetching, isLoading} = useCheckTransactionQuery(query.tc)

  useEffect(() => {
    if (!isFetching) {
      if (query.type === "subscription") subscriptionHandler()
      else if (query.type === "purchase") productHandler()
      else if (query.type === "wallet") walletHandler()
      else {
        console.log(query,data,error)
      }
    }
  }, [router, isFetching]);

  const subscriptionHandler = async () => {
    if (isSuccess) {
      setCallToAction({link: "/profile/me",text: "پروفایل من"})
    }else{
      setCallToAction({link: "/plans",text: "خرید مجدد اشتراک"})
    }
  }
  const productHandler = async () => {
    if (isSuccess) {
      setCallToAction({link: "/profile/me/Downloads",text: "دانلود های من"})
    } else {
      setCallToAction({link: "/checkout",text: "برو به سبد خرید"})
    }
  }

  const walletHandler = async () => {
    if (isSuccess) {
      setCallToAction({link: "/profile/me/Accounting",text: "حساب من"})
    }
  }

  return (
    <>
      <Head>
        <title>والاوید | بررسی پرداخت</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <div className="flex justify-center items-center h-screen">
        <div className="container relative h-1/2 w-2/3 rounded-t-3xl bg-secondary overflow-hidden p-10">
          <div className="flex justify-center items-center flex-col full p-10">
            {isLoading &&<h3>بررسی پرداخت</h3>}
            {isError && <TbFaceIdError className={"text-9xl text-danger"}/> }
            {isSuccess && <IoMdCheckmarkCircleOutline className={"text-9xl text-success"}/> }
            <div className="full flex flex-col gap-5 justify-center items-center mt-4">
              {isLoading &&
              <>
                <span>لطفا صبر نمایید...</span>
                <AiOutlineLoading3Quarters className={"animate-spin text-7xl"}/>
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-10"></span>
              </>}
              {isSuccess && <>
                <div className="text-xl my-3">
                  پرداخت شما با موفقیت انجام شد!
                </div>
              </>}
              {isError && <>
                <div className="text-xl my-3">
                                  پرداخت شما با خطا مواجه شد.
                </div>
                <div className="text-lg text-color3 mb-3">
                  <div className="mb-3">
                                    درگاه بانک پرداختی: {form_fields[error.bank_type.toLowerCase()]}
                  </div>
                  <div className="mb-3">
                    مبلغ تراکنش: {(error.amount/10).toLocaleString()} تومان
                  </div>
                </div>
                <div className="text-lg">
                کد پیگیری : {query.tc}
                </div>
              </>}
              {!isEmpty(callToAction?.link) && <Button className={"mt-5 btn-primary text-xl px-10 py-5"} link={callToAction.link}>{callToAction.text}</Button>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    if (isEmpty(context.query?.type) || isEmpty(context.query?.tc)) {
      return {
        notFound: true,
      }
    }
    const query = context.query
    store.dispatch(CheckTransaction.initiate(query.tc))
    await Promise.all(store.dispatch(payment_api.util.getRunningQueriesThunk()))
    return {
      props: {
        query
      },
    };
  }
);

export default CheckTransactionPage;
