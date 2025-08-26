import BecomeASellerBox from "@/components/BecomeASellerBox";
import Head from "next/head";
import Image from "next/image";
import {makeTitleWith} from "@/utils/seo/meta";
import React from "react";


export default function index() {
  return (
    <>
      <Head>
          <title>{makeTitleWith(" فروشنده شوید")}</title>
      </Head>
      <div className="relative min-h-[100vh] pt-24 bg-gradient-to-b from-[#08182355] to-transparent">
        <Image src={"/images/becomeASellerBackground.jpg"} className="z-[-2]" fill sizes="" alt="background"></Image>
        <div className="container justify-center">
          <div className="text-4xl text-center drop-shadow-xl">
            به فروشندگان والاوید بپیوندید
          </div>
          <p className="text-md text-center pt-5 pb-10 drop-shadow-xl">
            به جامعه تولید کنندگان ما بپیوندید و محصول خود را به فروش برسانید
          </p>
          <BecomeASellerBox className="mx-auto"></BecomeASellerBox>
        </div>
      </div>
    </>
  )
}
