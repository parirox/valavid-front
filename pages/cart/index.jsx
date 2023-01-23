import Button from "@/components/Button";
import {
  cartItems,
  removeFromCart,
} from "@/datasources/checkout/local/CheckoutSlice";
import { useGetCartDetailsByIdsMutation } from "@/datasources/checkout/remote/CheckoutSliceApi";
import { handleApiError } from "@/datasources/errorHandler";
import { isEmpty } from "@/utils/general";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { IoArrowBackOutline, IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

// const data = [
//   {
//     id: 1,
//     type: "video",
//     title: "مقبره بزرگ زیبای شب در شهر اصفهان",
//     price: {
//       main: 25000,
//       off: 12000,
//       percent: "40%"
//     },
//     media: {
//       alt: "natural",
//       src: "/videos/sample2.mp4"
//     },
//     extra_information: {
//       resolution: '4k',
//       codek: 'prores',
//       ratio: '16:9',
//       file_type: 'QuickTime',
//       frame_rate: '25 FPS',
//       time: '00:20',
//       file_size: '8.3 MB',
//     }
//   },
//   {
//     id: 2,
//     type: "image",
//     title: "مقبره بزرگ زیبای شب در شهر اصفهان",
//     price: {
//       main: 50000,
//       off: 40000,
//       percent: "20%"
//     },
//     media: {
//       alt: "natural",
//       src: "https://placeimg.com/640/480/nature/1"
//     },
//     extra_information: {
//       resolution: '4k',
//       codek: 'prores',
//       ratio: '16:9',
//       file_type: 'QuickTime',
//       frame_rate: '25 FPS',
//       time: '00:20',
//       file_size: '8.3 MB',
//     }
//   }
// ]

export default function Cart() {
  const dispatch = useDispatch();
  const _cartItems = useSelector(cartItems);
  const [getCartDetailsByIds, { data, isSuccess, isError, error }] =
    useGetCartDetailsByIdsMutation();
  const router = useRouter();

  useEffect(() => {
    if (!isEmpty(_cartItems))
      getCartDetailsByIds({ products: _cartItems.map((v) => v.id) });
  }, []);

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
          } else if (isError) {
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
          } else if (isSuccess) {
            return (
              <div className="w-4/5">
                <div className="flex justify-start text-sm text-gray p-5">
                  سبد خرید شما ( {_cartItems.length} مورد )
                </div>
                <div>
                  <div className="bg-secondary overflow-hidden px-5 rounded-t-3xl divide-y divide-secondary-400">
                    {_cartItems.map((cart, key) => {
                      const product = data.items.find((v) => v.id === cart.id);
                      if (isEmpty(product)) return <></>;
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
                                  <div className="text-lg">{product.title}</div>
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
                              <div className="flex flex-col justify-around h-full">
                                <div className="text-xs text-color3 mb-4">
                                  قیمت (تومان)
                                </div>
                                <div className="text-2xl">
                                  {product.price.pay_price === 0
                                    ? "رایگان"
                                    : product.price.pay_price.toLocaleString()}
                                </div>
                              </div>
                              <div className="flex h-full">
                                <div
                                  className="text-gray p-1 cursor-pointer"
                                  onClick={() => {
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
                                      .then(() => {
                                        dispatch(removeFromCart(product.id));
                                      })
                                      .catch((err) => {
                                        handleApiError(err);
                                      });
                                  }}
                                >
                                  <IoTrashOutline className="text-3xl" />
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
                      {data.items
                        .map((product) => Number(product.price.original))
                        .reduce((a, b) => a + b, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end mt-10">
                  <Button
                    onClick={() => router.push("/checkout")}
                    className="btn-primary-gradient pr-20 pl-16 py-5 text-2xl"
                  >
                    <span>پرداخت</span>
                    <span>
                      <IoArrowBackOutline />
                    </span>
                  </Button>
                </div>
              </div>
            );
          }
        })()}
      </div>
    </>
  );
}
