import {isEmpty} from "@/utils/general";
import Head from "next/head";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {wrapper} from "@/datasources/store";
import {useCheckTransactionQuery,} from "@/datasources/payment/remote/PaymentSliceApi";
import Button from "@/components/Button";
import {emptyCart} from "@/datasources/checkout/local/CheckoutSlice";
import SuccessErrorLoading from "@/components/SuccessErrorLoading";
import classNames from "classnames";
import {useDispatch} from "react-redux";
import {makeTitleWith} from "@/utils/seo/meta";

function CheckTransactionPage({query}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [callToAction, setCallToAction] = useState({
    link: "",
    text: "",
  });
  const {data, isSuccess, isError, error, isFetching, isLoading} =
    useCheckTransactionQuery(query.tc, {skip: (query?.free ?? true)});

  const [loadingState, setLoadingState] = useState({
    isSuccess, isError, isLoading
  });

  useEffect(() => {
    if (!isFetching) {
      if (query.type === "subscription") subscriptionHandler();
      else if (query.type === "purchase") productHandler();
      else if (query.type === "wallet") walletHandler();
      else {
        console.log(query, data, error);
      }
    }
  }, [router, isFetching]);

  const subscriptionHandler = () => {
    if (isSuccess) {
      setCallToAction({link: "/profile/me", text: "پروفایل من"});
    } else {
      setCallToAction({link: "/plans", text: "خرید مجدد اشتراک"});
    }
  };
  const productHandler = () => {
    if (isSuccess || !!query?.free) {
      if (!!query?.free) setLoadingState((prevState) => ({...prevState, isSuccess: true, isLoading: false}))
      setCallToAction({link: "/profile/me/Downloads", text: "دانلود های من"});
      dispatch(emptyCart());
    } else {
      setCallToAction({link: "/checkout", text: "برو به سبد خرید"});
    }
  };
  const walletHandler = () => {
    if (isSuccess) {
      setCallToAction({link: "/profile/me/Accounting", text: "حساب من"});
    }
  };


  return (
    <>
      <Head>
        <title>{makeTitleWith("بررسی خرید")}</title>
      </Head>
      <div className="flex justify-center items-center min-h-screen">
        <div className="container relative h-1/2 w-2/3 rounded-t-3xl bg-secondary overflow-hidden p-10">
          <div className="flex justify-center items-center flex-col full p-10">
            <h3
              className={classNames("h-10 mb-10", {"animate-text mx-5 bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black": isLoading})}>
              {isLoading && (query?.free ? "بررسی اطلاعات" : "بررسی پرداخت")}
              {!isLoading && "خرید شما با موفقیت انجام شد."}
            </h3>
            <SuccessErrorLoading {...loadingState}/>
            <div className="full flex flex-col gap-5 justify-center items-center mt-4">
              {isSuccess && (
                <>
                  <div className="text-xl my-3">
                    {query?.free ? "عملیات خرید با موفقیت انجام شد!" : "پرداخت شما با موفقیت انجام شد!"}
                  </div>
                </>
              )}
              {isError && (
                <>
                  <div className="text-xl my-3">
                    پرداخت شما با خطا مواجه شد.
                  </div>
                  <div className="text-lg text-color3 mb-3">
                    <div className="mb-3">
                      درگاه بانک پرداختی:{" "}
                      {form_fields[error.bank_type.toLowerCase()]}
                    </div>
                    <div className="mb-3">
                      مبلغ تراکنش: {(error.amount / 10).toLocaleString()} تومان
                    </div>
                  </div>
                  <div className="text-lg">کد پیگیری : {query.tc}</div>
                </>
              )}
              {!isEmpty(callToAction?.link) && (
                <Button
                  className={"mt-5 btn-primary text-xl px-10 py-5"}
                  link={callToAction.link}
                >
                  {callToAction.text}
                </Button>
              )}
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
      };
    }
    const query = context.query;
    return {
      props: {
        query,
      },
    };
  }
);

export default CheckTransactionPage;
