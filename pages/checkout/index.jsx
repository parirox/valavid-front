import Button from "@/components/Button";
import Divider from "@/components/Divider";
import {cartItems,} from "@/datasources/checkout/local/CheckoutSlice";
import {
  useCheckOfferCodeMutation,
  useGetCartDetailsByIdsMutation,
  usePaymentMutation,
} from "@/datasources/checkout/remote/CheckoutSliceApi";
import {isEmpty} from "@/utils/general";
import _toast from "@/utils/notification/toast";
import toast from "@/utils/notification/toast";
import Head from "next/head";
import Image from "next/image";
import {useEffect, useState} from "react";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {IoArrowBackOutline, IoCheckmarkCircleSharp, IoTrashOutline,} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {
  useAddToCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "@/datasources/user/remote/UserSliceApi";
import {handleApiError} from "@/datasources/errorHandler";
import Router from "next/router";
import GatewaysList from "@/components/GatewaysList";
import Link from "next/link";

export default function Cart() {
  const _cartItems = useSelector(cartItems);
  const [paymentGateway, setPaymentGateway] = useState(null);
  const dispatch = useDispatch();

  const [offerCode, setOfferCode] = useState("");

  //->> cart endpoints
  const [getCartDetailsByIds, { data }] =
  useGetCartDetailsByIdsMutation();

  const {data: cartData} = useGetCartQuery();
  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  const [
    checkOfferCode,
    {
      data: checkOfferCodeData,
      isLoading: checkOfferIsLoading,
      isSuccess: checkOfferIsSuccess,
      isError: checkOfferIsError,
      error: checkOfferCodeError,
    },
  ] = useCheckOfferCodeMutation();

  const [
    payment,
    {
      data: paymentData,
      isLoading: paymentIsLoading,
      isSuccess: paymentIsSuccess,
      isError: paymentIsError,
      error: paymentError,
    },
  ] = usePaymentMutation();

  useEffect(() => {
    // if (!isEmpty(_cartItems))
      getCartDetailsByIds({ products: _cartItems.map((v) => v.id) });
  }, []);

  // const total_price = useMemo(() => (
  //   _cartItems.map(product => (data.find(v => v.id === product.id).price.main)).reduce((a, b) => a + b, 0).toLocaleString()
  // ), [_cartItems])

  const setOfferCodeHandler = () => {
    if(isEmpty(offerCode)) return;
    if (!checkOfferIsLoading) {
      checkOfferCode({code: offerCode})
        .unwrap()
        .then((res) => {
          if (!res.result) {
            setOfferCode("");
          }
        })
        .catch((err) => {
          toast.error(err?.data?.message ?? "ثبت کد امکان پذیر نمی باشد!");
          // handleApiError(err);
          setOfferCode("");
        });
    }
  };

  const handlePayment = () => {
    if (!paymentGateway && cartData.paybox.pay_amount !== 0) {
      _toast.error("لطفا درگاه پرداخت را انتخاب کنید.");
    } else {
      let data = {bank: paymentGateway};
      if (offerCode) {
        data.discount_code = offerCode;
      }
      payment({data})
        .unwrap()
        .then((res) => {
          if (res.result) {
            Router.push(res.payment_url);
          }
        })
        .catch((err) => {
          handleApiError(err);
        });
    }
  };

  return (
    <>
      <Head>
        <title>والاوید | سبد خرید</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <div className="container relative min-h-screen flex justify-center items-center">
        {(() => {
          if (isEmpty(_cartItems)) {
            return (
              <div className="h-[300px] w-[420px] relative">
                <Image
                  src={"/images/empty_cart.png"}
                  alt="cart is empty"
                  fill
                  sizes="50vw"
                ></Image>
                <div className="absolute text-3xl top-10  mx-auto right-0 left-0 font-bold text-center">
                  سبد خرید شما خالی است
                </div>
              </div>
            );
          }
          // else if (!isError) {
          //   return (
          //     <div className="h-[300px] w-[420px] relative">
          //       <Image src={'/images/empty_cart.png'} alt="cart is empty" fill sizes="50vw"></Image>
          //       <div className="absolute text-3xl top-10  mx-auto right-0 left-0 font-bold text-center">
          //         {error.status}
          //       </div>
          //     </div>
          //   )
          // }
          // else if (!isSuccess) {
          return (
            data && (
              <div className="w-4/5">
                <div className="flex justify-start text-sm text-gray p-5">
                  سبد خرید شما ( {_cartItems.length} مورد )
                </div>
                <div>
                  <div className="bg-secondary overflow-hidden px-5 rounded-t-3xl divide-y divide-secondary-400">
                    {_cartItems.map((cart, k) => {
                      const product = data.items.find(
                        (v) => v.id === cart.id
                      );
                      if (isEmpty(product)) return <></>;
                      return (
                        <div
                          key={k}
                          className="flex justify-between items-center py-5 px-4"
                        >
                          <div className="basis-2/4">
                            <div className="flex gap-5">
                              <div className="basis-1/4 relative h-28">
                                {product.type === "video" ? (
                                  <video
                                    autoPlay={false}
                                    preload="metadata"
                                    loop
                                    className="full object-cover rounded-lg"
                                  >
                                    <source
                                      src={product.media.src}
                                      type="video/mp4"
                                    />
                                  </video>
                                ) : (
                                  <Image
                                    fill
                                    src={product.media.src}
                                    alt={product.media.alt}
                                    className="full object-cover rounded-lg"
                                  />
                                )}
                              </div>
                              <div className="basis-1/2 text-color3">
                                <div className="flex flex-col justify-center h-full gap-3">
                                  <Link href={`/products/${product.type}/${product.id}`} className="text-lg">{product.title}</Link>
                                  <div className="text-gray text-xs">
                                    {/* {Object.entries(product.extra_information)
                                      .map((v) => v[1])
                                      .join(" | ")} */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex-initial">
                            <div className="flex gap-14 items-end">
                              <div className="flex flex-col justify-around items-end h-full ">
                                <div className="text-xs text-color3 mb-4">
                                  قیمت (تومان)
                                </div>
                                <div className="flex gap-4 flex-row-reverse items-center">
                                  {product.price.percent !== 0 && (
                                    <>
                                      <span className="text-xl text-color3 line-through">
                                        {product.price.original.toLocaleString()}
                                      </span>
                                      <span className="bg-danger rounded-3xl w-12 px-2 py-1 text-lg text-center mr-2">
                                        %{product.price.percent}
                                      </span>
                                    </>
                                  )}
                                  <span className="text-3xl text-color6">
                                    {product.price.pay_price === 0
                                      ? "رایگان"
                                      : product.price.pay_price.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                              <div className="flex h-full">
                                <div
                                  className="text-gray p-1 cursor-pointer"
                                  onClick={() => {
                                    let adaptedProducts = _cartItems.filter(
                                      (v) => v.id !== product.id
                                    );
                                    getCartDetailsByIds({
                                      products: adaptedProducts.map(
                                        (product) => product.id
                                      ),
                                    })
                                      .unwrap()
                                      .then(() => {
                                        dispatch(removeFromCart(product.id));
                                      })
                                      .catch((err) => {
                                        handleApiError(err);
                                      });
                                  }}
                                >
                                  <IoTrashOutline className="text-3xl"/>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="bg-secondary-600 flex justify-end items-center gap-5 px-10 py-8 rounded-b-3xl">
                    <div className="basis-8/12">
                      <div className="flex">
                        <div className="basis-1/2">
                          <div className="form-control w-full">
                            <div className="p-1 border border-accent rounded-xl">
                              <div className="relative">
                                <input
                                  type="text"
                                  value={offerCode}
                                  onChange={(e) => setOfferCode(e.target.value)}
                                  placeholder="- - - - - -"
                                  className="input w-full pl-16 pr-3 py-3 peer"
                                />
                                <button
                                  onClick={setOfferCodeHandler}
                                  className="btn btn-primary absolute left-0 top-0 h-full rounded-xl px-10 text-sm peer-placeholder-shown:btn-accent"
                                >
                                  ثبت کد
                                  {checkOfferIsLoading && (
                                    <AiOutlineLoading3Quarters className="animate-spin"/>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {checkOfferIsSuccess && (
                          <div className="basis-1/2 text-success flex gap-2 mr-3 items-center">
                            <span className="text-2xl">
                              <IoCheckmarkCircleSharp/>
                            </span>
                            <span className="text-sm">
                              {checkOfferCodeData.message}
                            </span>
                          </div>
                        )}
                      </div>
                      {checkOfferIsSuccess && (
                        <div className="text-color6 text-sm p-4">
                          {`کد تخفیف ${checkOfferCodeData.discount_value}`}
                        </div>
                      )}
                      {cartData.paybox.pay_amount !== 0 && <div className="mt-8">
                        <GatewaysList
                          state={paymentGateway}
                          setter={setPaymentGateway}
                        />
                      </div>}
                    </div>
                    <div className="basis-4/12">
                      <div className="flex flex-col text-gray gap-5">
                        <div className="flex justify-between items-center">
                          <span>جمع کل:</span>
                          <span className="text-lg">
                            {checkOfferIsSuccess ? (
                              <>{checkOfferCodeData.total.toLocaleString()}</>
                            ) : (
                              <>{data.paybox.total.toLocaleString()}</>
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>مالیات بر ارزش افزوده:</span>
                          <span className="text-lg">
                            {checkOfferIsSuccess ? (
                              <>{checkOfferCodeData.tax.toLocaleString()}</>
                            ) : (
                              <>{data.paybox.tax.toLocaleString()}</>
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>تخفیفات محصولات:</span>
                          <span className="text-lg">
                            {checkOfferIsSuccess ? (
                              <>{checkOfferCodeData.off.toLocaleString()}</>
                            ) : (
                              <>{data.paybox.off}</>
                            )}
                          </span>
                        </div>
                        <div className="mb-2 flex justify-between items-center">
                          <span>سود شما از خرید:</span>
                          <span className="text-lg">
                            {checkOfferIsSuccess ? (
                              <>
                                {checkOfferCodeData.user_profit.toLocaleString()}
                              </>
                            ) : (
                              <>
                                {data.paybox.user_profit.toLocaleString()}
                              </>
                            )}
                          </span>
                        </div>
                        <Divider/>
                        <div className="mt-2 flex justify-between items-center text-color6">
                          <span>قابل پرداخت:</span>
                          <span className="text-2xl">
                            {checkOfferIsSuccess ? (
                              <>
                                {checkOfferCodeData.pay_amount.toLocaleString()}
                              </>
                            ) : (
                              <>{data.paybox.pay_amount.toLocaleString()}</>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-10">
                  <Button
                    // link={"/checkout/"}
                    className="btn-primary-gradient pr-20 pl-16 py-5 text-2xl"
                    onClick={() => handlePayment()}
                  >
                    <span>پرداخت</span>
                    <span>
                      <IoArrowBackOutline/>
                    </span>
                  </Button>
                </div>
              </div>
            )
          );
          // }
        })()}
      </div>
    </>
  );
}
