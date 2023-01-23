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
import Router from "next/router";
import {isEmpty} from "@/utils/general";
import GatewaysList from "@/components/GatewaysList";
import payment_api, {GetGatewaysList} from "@/datasources/payment/remote/PaymentSliceApi";

function PlanCheckout({query}) {

  const [paymentGateway, setPaymentGateway] = useState(null);
  const [offerCode, setOfferCode] = useState("")

  const {
    data,
    isSuccess,
    isError,
    error
  } = useGetPlanDetailsQuery(query);

  const [payThePlan,{
    isLoading:isLoadingPayPlan,
  }] = usePayThePlanMutation();

  const [checkOfferCode, {
    data: checkOfferCodeData,
    isLoading: checkOfferIsLoading,
    isSuccess: checkOfferIsSuccess,
    isError: checkOfferIsError,
    error: checkOfferCodeError
  }] = useCheckOfferCodeMutation()

  const setOfferCodeHandler = () => {
    if (!checkOfferIsLoading) {
      checkOfferCode({code: offerCode})
    }
  }


  if(isError) return <ErrorPage info={error}/>

  const paymentHandler = ()=>{
    if(isLoadingPayPlan) return;
    payThePlan({
      subscription: data.id,
      bank: paymentGateway,
    }).unwrap().then(async (res) => {
      if(isEmpty(res.payment_url)) toast.error("انتقال به بانک با خطا مواجه شد لطفا دوباره سعی کنید!")
      else await Router.push(res.payment_url)
    }).catch(err=>{
      toast.error("انتقال به بانک با خطا مواجه شد لطفا دوباره سعی کنید!")
    })
  }

  return (
    <>
      <Head>
        <title>والاوید | خرید اشتراک {data?.name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
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
                            {/*{ (false) && <span className="text-xl text-color3 line-through"></span>}*/}
                            {/*{ (false) && <span*/}
                            {/*  className="bg-danger rounded-3xl w-12 px-2 py-1 text-lg text-center mr-2">درصد تخفیف</span>*/}
                            {/*}*/}
                            <span className="text-3xl text-color6">{(data.price/10).toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex h-full">
                          <div className="text-gray p-1 cursor-pointer">
                            {/*<IoTrashOutline className="text-3xl"/>*/}
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
                {/*    <div className="basis-1/2">*/}
                {/*      <div className="form-control w-full">*/}
                {/*        <div className="p-1 border border-accent rounded-xl">*/}
                {/*          <div className="relative">*/}
                {/*            <input type="text" value={offerCode}*/}
                {/*                   onChange={(e) => setOfferCode(e.target.value)} placeholder="- - - - - -"*/}
                {/*                   className="input w-full pl-16 pr-3 py-3 peer"/>*/}
                {/*            <button onClick={setOfferCodeHandler}*/}
                {/*                    className="btn btn-primary absolute left-0 top-0 h-full rounded-xl px-10 text-sm peer-placeholder-shown:btn-accent">*/}
                {/*              ثبت کد*/}
                {/*              {checkOfferIsLoading && <AiOutlineLoading3Quarters className="animate-spin"/>}*/}
                {/*            </button>*/}
                {/*          </div>*/}
                {/*        </div>*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*    {checkOfferIsSuccess && <div className="basis-1/2 text-success flex gap-2 mr-3 items-center">*/}
                {/*      <span className="text-2xl"><IoCheckmarkCircleSharp/></span>*/}
                {/*      <span className="text-sm">کد تخفیف با موفقیت اعمال شد.</span>*/}
                {/*    </div>}*/}
                {/*  </div>*/}
                {/*  {checkOfferIsSuccess && <div className="text-color6 text-sm p-4">*/}
                {/*    کد تخفیف 5 درصدی*/}
                  </div>
                </div>
                <div className="basis-4/12">
                  <div className="flex flex-col text-gray gap-5">
                    {/*<div className="flex justify-between items-center">*/}
                    {/*  <span>جمع کل:</span>*/}
                    {/*  <span className="text-lg">قیمت نهایی</span>*/}
                    {/*</div>*/}
                    {/*<div className="flex justify-between items-center">*/}
                    {/*  <span>تخفیفات محصولات:</span>*/}
                    {/*  <span className="text-lg">تخفیف محصول</span>*/}
                    {/*</div>*/}
                    {/*<div className="mb-2 flex justify-between items-center">*/}
                    {/*  <span>سود شما از خرید:</span>*/}
                    {/*  <span className="text-lg">میزان تخفیف</span>*/}
                    {/*</div>*/}
                    {/*<Divider/>*/}
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