import Button from "@/components/Button";
import {useCheckOfferCodeMutation} from "@/datasources/checkout/remote/CheckoutSliceApi";
import Head from "next/head";
import React, {useState} from "react";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {IoArrowBackOutline, IoStarOutline} from "react-icons/io5";
import plan_api, {
  GetPlanDetails,
  useGetPlanDetailsQuery,
  usePayThePlanMutation
} from "@/datasources/plans/remote/PlansSliceApi";
import {wrapper} from "@/datasources/store";
import ErrorPage from "../../ErrorPage";
import {CiStar} from "react-icons/ci";
import toast from "@/utils/notification/toast";
import Router, {useRouter} from "next/router";
import {isEmpty} from "@/utils/general";
import GatewaysList from "@/components/GatewaysList";
import payment_api, {GetGatewaysList} from "@/datasources/payment/remote/PaymentSliceApi";
import {getCookie} from "cookies-next";
import {makeTitleWith} from "@/utils/seo/meta";

function PlanCheckout({query}) {
  const router = useRouter();

  const [paymentGateway, setPaymentGateway] = useState(null);
  const {
    data,
    isSuccess,
    isError,
    error
  } = useGetPlanDetailsQuery(query);

  const [payThePlan,{
    isLoading:isLoadingPayPlan,
  }] = usePayThePlanMutation();


  if(isError) return <ErrorPage info={error}/>

  const paymentHandler = async () => {

    const accessToken = getCookie("valavid_token");

    if (!accessToken) {
      await Router.replace("/auth?callback="+router.asPath);
      return null;
    }

    if (isLoadingPayPlan) return;
    payThePlan({
      subscription: data.id,
      bank: paymentGateway,
    }).unwrap().then(async (res) => {
      if (isEmpty(res.payment_url)) toast.error("انتقال به بانک با خطا مواجه شد لطفا دوباره سعی کنید!")
      else await Router.push(res.payment_url)
    }).catch(err => {
      toast.error("انتقال به بانک با خطا مواجه شد لطفا دوباره سعی کنید!")
    })
  }

  return (
    <>
      <Head>
          <title>{makeTitleWith( `خرید اشتراک  ${data.name}`)}</title>
      </Head>
      <div className="container relative min-h-screen flex justify-center items-center">
        {isSuccess && (
          <div className="w-4/5">
            <div className="flex justify-start text-sm text-gray p-5">
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-white">
                خرید اشتراک {data.type === "precious" ? "حجمی" : "قیمتی" }</div>
            </div>
            <div>
              <div className="bg-secondary overflow-hidden px-5 rounded-t-3xl divide-y divide-secondary-400">
                {
                  <div className="flex justify-between items-center py-5 px-4">
                    <div className="basis-2/4">
                      <div className="flex gap-5">
                        <div className="basis-1/4 relative h-28">
                          {data.is_special && <CiStar className={"text-3xl text-[#ff0]"}/> }
                        </div>
                        <div className="basis-1/2 text-color3">
                          <div className="flex flex-col justify-center h-full gap-3">
                            <div className="text-lg">{data.name}</div>
                          </div>
                        </div>
                        <div className="basis-1/4 text-color3">
                          <div className="flex flex-col justify-center h-full gap-3">
                            <ul className="text-gray text-xs leading-6">{Object.entries(data.features).map(([_,v]) => (<li key={_}>{v.title}</li>))}</ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-initial">
                      <div className="flex gap-14 items-end">
                        <div className="flex flex-col justify-around items-end h-full ">
                          <div className="text-xs text-color3 mb-4">قیمت (تومان)</div>
                          <div className="flex gap-4 flex-row-reverse items-center">
                            <span className="text-3xl text-color6">{(data.price/10).toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex h-full">
                          <div className="text-gray p-1 cursor-pointer">

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
              <div className="bg-secondary-600 flex justify-end items-center gap-5 px-10 py-8 rounded-b-3xl">
                <div className="basis-8/12">
                  <div className="flex flex-col">
                    <h5 className="flex-initial text-white text-start text-lg mb-3">درگاه پرداخت</h5>
                    <GatewaysList state={paymentGateway} setter={setPaymentGateway}/>
                  </div>
                </div>
                <div className="basis-4/12">
                  <div className="flex flex-col text-gray gap-5">
                    <div className="mt-2 flex justify-between items-center text-color6">
                      <span>قابل پرداخت:</span>
                      <span className="text-2xl">{(data.price/10).toLocaleString()} تومان</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-10 p-5">
              <Button onClick={paymentHandler} className='btn-primary-gradient pr-20 pl-16 py-5 text-2xl'>
                <span>پرداخت</span>
                {isLoadingPayPlan ? <AiOutlineLoading3Quarters className={"animate-spin"}/> : <IoArrowBackOutline/>}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const query = context.params
    store.dispatch(GetPlanDetails.initiate(query))
    await Promise.all(store.dispatch(plan_api.util.getRunningQueriesThunk()))

    store.dispatch(GetGatewaysList.initiate())
    await Promise.all(store.dispatch(payment_api.util.getRunningQueriesThunk()))
    return {
      props: {
        query
      },
    };
  }
);

export default PlanCheckout