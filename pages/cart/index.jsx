import Button from "@/components/Button";
import {cartItems, removeFromCart,} from "@/datasources/checkout/local/CheckoutSlice";
import {useGetCartDetailsByIdsMutation} from "@/datasources/checkout/remote/CheckoutSliceApi";
import {handleApiError} from "@/datasources/errorHandler";
import {isEmpty} from "@/utils/general";
import Head from "next/head";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {IoArrowBackOutline, IoTrashOutline} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {getCookie} from "cookies-next";
import toast from "@/utils/notification/toast";
import Link from "next/link";


export default function Cart() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const _cartItems = useSelector(cartItems);
  const [getCartDetailsByIds, {data, isSuccess, isError, error, isLoading}] = useGetCartDetailsByIdsMutation();

  useEffect(() => {
    let token = getCookie("valavid_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  //
  useEffect(() => {
    setProducts(_cartItems)
    if (isLoggedIn){
      getCartDetailsByIds({products: _cartItems.map((v) => v.id)}).unwrap().then(res => {
        setProducts(res.items)
      }).catch((err) => {
        console.log({err})
      });
    }
  }, [isLoggedIn]);

  return (
    <>
      <Head>
        <title>والاوید | سبد خرید</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <div className="container relative min-h-screen flex justify-center items-center">
        {
          (() => {
              if ((isSuccess && isEmpty(data?.items)) || _cartItems.length === 0) {
                return (
                  <div className="h-[300px] w-[420px] relative">
                    <Image
                      src={"/images/empty_cart.png"}
                      alt="cart is empty"
                      fill
                      sizes="50vw"
                    />
                    <div className="absolute text-3xl top-10  mx-auto right-0 left-0 font-bold text-center">
                      سبد خرید شما خالی است
                    </div>
                  </div>
                )
              }
              if (isError) {
                return (
                  <div className="h-[300px] w-[420px] relative">
                    <Image
                      src={"/images/empty_cart.png"}
                      alt="cart is empty"
                      fill
                      sizes="50vw"
                    ></Image>
                    <div className="absolute text-3xl top-10  mx-auto right-0 left-0 font-bold text-center">
                      {error?.status}
                    </div>
                  </div>
                );
              }
              return (
                <div className="w-4/5">
                  <div className="flex justify-start items-center text-sm text-gray p-5">
                    سبد خرید شما ( {_cartItems.length} مورد )
                    {isLoading &&
                      <div className="animate-text mx-5 bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black">
                        درحال بروز رسانی ...
                      </div>
                    }
                  </div>
                  <div className={"relative"}>
                    <div className="bg-secondary overflow-hidden px-5 rounded-t-3xl divide-y divide-secondary-400">
                      {products.map((product, key) => {
                        return (
                          <div
                            key={key}
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
                                    {product.extra_information?.length > 0 && (
                                      <div className="text-gray text-xs">
                                        {Object.entries(product.extra_information)
                                          .map((v) => v[1])
                                          .join(" | ")}
                                      </div>
                                    )}
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
                                      if (isLoggedIn) {
                                        const adaptedProducts = _cartItems.filter(
                                          (v) => v.id !== product.id
                                        );
                                        getCartDetailsByIds({
                                          products: adaptedProducts.map(
                                            (product) => {
                                              return product.id;
                                            }
                                          ),
                                        })
                                          .unwrap()
                                          .then((res) => {
                                            setProducts(res.items)
                                            dispatch(removeFromCart(product.id));
                                          })
                                          .catch((err) => {
                                            handleApiError(err);
                                          });
                                      } else {
                                        dispatch(removeFromCart(product.id));
                                      }
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
                    <div className="bg-secondary-600 flex justify-end items-center gap-5 p-8 rounded-b-3xl">
                      <span>جمع کل</span>
                      <span className="text-2xl">
                        {
                          isLoggedIn && isSuccess ?
                            (data.paybox.pay_amount - data.paybox.tax).toLocaleString()
                            : _cartItems.reduce((a, b) => (b.price.pay_price + a), 0).toLocaleString()
                        }
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end mt-10">
                    <Button
                      onClick={() => {
                        if (isLoggedIn) {
                          router.push("/checkout")
                        } else {
                          toast.info("لطفا ابتدا در سایت ثبت نام و یا وارد حساب کاریری خود شوید.");
                          setTimeout(async () => {
                            await router.push("/auth?callback=/checkout")
                          }, 1000)
                        }
                      }}
                      className="btn-primary-gradient pr-20 pl-16 py-5 text-2xl"
                    >
                      <span>مرحله بعد</span>
                      <span>
                      <IoArrowBackOutline/>
                    </span>
                    </Button>
                  </div>
                </div>
              )
            }
          )()
        }
      </div>
    </>
  );
}
