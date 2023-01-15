import Button from "@/components/Button";
import Divider from "@/components/Divider";
import { cartItems, removeFromCart } from "@/datasources/checkout/local/CheckoutSlice";
import { useCheckOfferCodeMutation, useGetCartDetailsByIdsMutation, useSetOfferCodeMutation } from "@/datasources/checkout/remote/CheckoutSliceApi";
import { isEmpty } from "@/utils/general";
import _toast from "@/utils/notification/toast";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoArrowBackOutline, IoCheckmarkCircleOutline, IoCheckmarkCircleSharp, IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {useAddToCartMutation, useGetCartQuery, useRemoveFromCartMutation} from "@/datasources/user/remote/UserSliceApi";

const data = [
  {
    id: 1,
    type: "video",
    title: "مقبره بزرگ زیبای شب در شهر اصفهان",
    price: {
      main: 25000,
      off: 12000,
      percent: "40%"
    },
    media: {
      alt: "natural",
      src: "/videos/sample2.mp4"
    },
    extra_information: {
      resolution: '4k',
      codek: 'prores',
      ratio: '16:9',
      file_type: 'QuickTime',
      frame_rate: '25 FPS',
      time: '00:20',
      file_size: '8.3 MB',
    }
  },
  {
    id: 2,
    type: "image",
    title: "مقبره بزرگ زیبای شب در شهر اصفهان",
    price: {
      main: 50000,
      off: 40000,
      percent: "20%"
    },
    media: {
      alt: "natural",
      src: "https://placeimg.com/640/480/nature/1"
    },
    extra_information: {
      resolution: '4k',
      codek: 'prores',
      ratio: '16:9',
      file_type: 'QuickTime',
      frame_rate: '25 FPS',
      time: '00:20',
      file_size: '8.3 MB',
    }
  }
]

export default function Cart() {
  const _cartItems = useSelector(cartItems);
  const dispatch = useDispatch();

  const [offerCode, setOfferCode] = useState("")

  //->> cart endpoints
  const [getCartDetailsByIds, { data2, isSuccess, isError, error }] = useGetCartDetailsByIdsMutation()
  const {
    data: cartData,
    isSuccess: cartIsSuccess,
    error: cartError,
    isError: cartIsError,
    isLoading: cartIsLoading
  } = useGetCartQuery()
  const [addToCart, {
    data: addCartData,
    isSuccess: addCartIsSuccess,
    error: addCartError,
    isError: addCartIsError,
    isLoading: addCartIsLoading
  }] = useAddToCartMutation()
  const [removeFromCart, {
    data: removeCartData,
    isSuccess: removeCartIsSuccess,
    error: removeCartError,
    isError: removeCartIsError,
    isLoading: removeCartIsLoading
  }] = useRemoveFromCartMutation()

  const [checkOfferCode, { data: checkOfferCodeData, isLoading: checkOfferIsLoading, isSuccess: checkOfferIsSuccess, isError: checkOfferIsError, error: checkOfferCodeError }] = useCheckOfferCodeMutation()
  useEffect(() => {
    getCartDetailsByIds({ ids: _cartItems.map(v => v.id).join(",") })
  }, [])

  const total_price = useMemo(() => (
    _cartItems.map(product => (data.find(v => v.id === product.id).price.main)).reduce((a, b) => a + b, 0).toLocaleString()
  ), [_cartItems])

  const total_off_price = useMemo(() => (
    _cartItems.map(product => (data.find(v => v.id === product.id).price.off)).reduce((a, b) => a + b, 0).toLocaleString()
  ), [_cartItems])

  const setOfferCodeHandler = () => {
    if (!checkOfferIsLoading) {
      checkOfferCode({ code: offerCode })
    }
  }

  return (
    <>
      <Head>
        <title>والاوید | سبد خرید</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container relative min-h-screen flex justify-center items-center">
        {(() => {
          if (isEmpty(_cartItems)) {
            return (
              <div className="h-[300px] w-[420px] relative">
                <Image src={'/images/empty_cart.png'} alt="cart is empty" fill sizes="50vw"></Image>
                <div className="absolute text-3xl top-10  mx-auto right-0 left-0 font-bold text-center">
                  سبد خرید شما خالی است
                </div>
              </div>
            )
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
            <div className="w-4/5">
              <div className="flex justify-start text-sm text-gray p-5">سبد خرید شما ( {_cartItems.length} مورد )</div>
              <div>
                <div className="bg-secondary overflow-hidden px-5 rounded-t-3xl divide-y divide-secondary-400">
                  {
                    _cartItems.map((cart, k) => {
                      const product = data.find(v => v.id === cart.id)
                      return (
                        <div key={k} className="flex justify-between items-center py-5 px-4">
                          <div className="basis-2/4">
                            <div className="flex gap-5">
                              <div className="basis-1/4 relative h-28">
                                {
                                  product.type === "video" ?
                                    <video autoPlay={false} preload='metadata' loop
                                      className="full object-cover rounded-lg">
                                      <source src={product.media.src} type="video/mp4" />
                                    </video>
                                    :
                                    <Image fill
                                      src={product.media.src}
                                      alt={product.media.alt}
                                      className="full object-cover rounded-lg" />
                                }
                              </div>
                              <div className="basis-1/2 text-color3">
                                <div className="flex flex-col justify-center h-full gap-3">
                                  <div className="text-lg">{product.title}</div>
                                  <div className="text-gray text-xs">{Object.entries(product.extra_information).map(v => (v[1])).join(" | ")}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex-initial">
                            <div className="flex gap-14 items-end">
                              <div className="flex flex-col justify-around items-end h-full ">
                                <div className="text-xs text-color3 mb-4">قیمت (تومان)</div>
                                <div className="flex gap-4 flex-row-reverse items-center">
                                  <span className="text-xl text-color3 line-through">{product.price.main.toLocaleString()}</span>
                                  <span className="bg-danger rounded-3xl w-12 px-2 py-1 text-lg text-center mr-2">{product.price.percent}</span>
                                  <span className="text-3xl text-color6">{product.price.off.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="flex h-full">
                                <div className="text-gray p-1 cursor-pointer" onClick={() => dispatch(removeFromCart(product.id))}>
                                  <IoTrashOutline className="text-3xl" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
                <div className="bg-secondary-600 flex justify-end items-center gap-5 px-10 py-8 rounded-b-3xl">
                  <div className="basis-8/12">
                    <div className="flex">
                      <div className="basis-1/2">
                        <div className="form-control w-full">
                          <div className="p-1 border border-accent rounded-xl">
                            <div className="relative">
                              <input type="text" value={offerCode}
                                onChange={(e) => setOfferCode(e.target.value)} placeholder="- - - - - -" className="input w-full pl-16 pr-3 py-3 peer" />
                              <button onClick={setOfferCodeHandler} className="btn btn-primary absolute left-0 top-0 h-full rounded-xl px-10 text-sm peer-placeholder-shown:btn-accent">
                                ثبت کد
                                {checkOfferIsLoading && <AiOutlineLoading3Quarters className="animate-spin"/>}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {checkOfferIsSuccess && <div className="basis-1/2 text-success flex gap-2 mr-3 items-center">
                        <span className="text-2xl"><IoCheckmarkCircleSharp /></span>
                        <span className="text-sm">کد تخفیف با موفقیت اعمال شد.</span>
                      </div>}
                    </div>
                    {checkOfferIsSuccess && <div className="text-color6 text-sm p-4">
                      کد تخفیف 5 درصدی
                    </div>}
                  </div>
                  <div className="basis-4/12">
                    <div className="flex flex-col text-gray gap-5">
                      <div className="flex justify-between items-center">
                        <span>جمع کل:</span>
                        <span className="text-lg">{total_off_price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>تخفیفات محصولات:</span>
                        <span className="text-lg">{total_off_price}</span>
                      </div>
                      <div className="mb-2 flex justify-between items-center">
                        <span>سود شما از خرید:</span>
                        <span className="text-lg">{total_off_price}</span>
                      </div>
                      <Divider />
                      <div className="mt-2 flex justify-between items-center text-color6">
                        <span>قابل پرداخت:</span>
                        <span className="text-2xl">{total_off_price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-10">
                <Button link={"/checkout/"} className='btn-primary-gradient pr-20 pl-16 py-5 text-2xl'>
                  <span>پرداخت</span>
                  <span><IoArrowBackOutline /></span>
                </Button>
              </div>
            </div>
          )
          // }
        })()}
      </div>
    </>
  )
}
