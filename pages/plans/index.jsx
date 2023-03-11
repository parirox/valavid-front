import Head from "next/head";
import OctagonalIcon from "@/public/icons/OutlineOctagonarIcon.svg";
import Plan from "@/components/Plan";
import AdvantageBox from "@/components/AdvantageBox";
import lockIcon from "@/public/icons/lockIcon.png";
import takhfifIcon from "@/public/icons/takhfifIcon.png";
import eseyShopIcon from "@/public/icons/eseyShopIcon.png";
import {wrapper} from "@/datasources/store";
import plan_api, {
    GetPlans,
    useGetPlansQuery,
} from "@/datasources/plans/remote/PlansSliceApi";
import payment_api, {
    GetGatewaysList,
} from "@/datasources/payment/remote/PaymentSliceApi";
import {makeTitleWith} from "@/utils/seo/meta";
import React from "react";

const advantagesData = [
    {
        icon: eseyShopIcon,
        advantage: "خرید آسان",
        description: "تنها در چند مرحله ساده خرید خود را نهایی کنید",
    },
    {
        icon: takhfifIcon,
        advantage: "خرید با تخفیف",
        description: "پرداخت از طریق درگاه امن و ضمانت بازگشت پول",
    },
    {
        icon: lockIcon,
        advantage: "دانلود قانونی",
        description: "دانلود تمامی محصولات با لایسنس اختصاصی",
    },
];

function Plans() {
    const {data, isSuccess} = useGetPlansQuery();

    if (!isSuccess) return <></>;
    return (
    <>
        <Head>
            <title>{makeTitleWith("خرید اشتراک")}</title>
        </Head>
        <div className="bg-secondary-600 w-full h-52 flex flex-col justify-center items-center">
            <p className="text-secondary-100 pb-2">دانلود قانونی</p>
            <h3 className="text-color8">هزاران ویدئو و تصاویر با کیفیت</h3>
        </div>
        <div className="container py-24 text-center">
            <div className="flex justify-center items-center gap-6">
                <OctagonalIcon></OctagonalIcon>
                <h5 className="">بسته های قیمتی</h5>
                <OctagonalIcon></OctagonalIcon>
            </div>
            <p className="text-secondary-300 pb-2 pt-4 text-lg">
                دانلود محتوا با تخفیف تا سقف قیمت مشخص
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-11 pt-20 flex-wrap">
                {data?.precious?.map((plan, i) => (
                <Plan
                className=""
                plan_id={plan.id}
                name={plan.name}
                duration={plan.duration}
                items={plan.features.map((v) => v.title)}
                price={plan.price}
                withStar={plan.is_special}
                key={i}
                ></Plan>
                ))}
            </div>
            <div className="flex justify-center items-center gap-6 pt-28">
                <OctagonalIcon></OctagonalIcon>
                <h5 className="">بسته های حجمی</h5>
                <OctagonalIcon></OctagonalIcon>
            </div>
            <p className="text-secondary-300 pb-2 pt-4 text-lg">
                دانلود محتوا با تخفیف تا سقف قیمت مشخص
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-11 pt-20 flex-wrap">
                {data?.volumetric?.map((plan, i) => (
                <Plan
                className=""
                plan_id={plan.id}
                name={plan.name}
                duration={plan.duration}
                items={plan.features.map((v) => v.title)}
                price={plan.price}
                withStar={plan.is_special}
                key={i}
                ></Plan>
                ))}
            </div>
            <div className="flex flex-col md:flex-row pt-40 pb-10 justify-between gap-14 md:gap-2">
                {advantagesData.map((advantage, i) => (
                <AdvantageBox
                icon={advantage.icon}
                advantage={advantage.advantage}
                description={advantage.description}
                key={i}
                ></AdvantageBox>
                ))}
            </div>
        </div>
    </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
(store) => async (context) => {
    // prefetch plans
    store.dispatch(GetPlans.initiate());
    await Promise.all(store.dispatch(plan_api.util.getRunningQueriesThunk()));
    // prefetch payment
    store.dispatch(GetGatewaysList.initiate());
    await Promise.all(
    store.dispatch(payment_api.util.getRunningQueriesThunk())
    );

    return {
        props: {},
    };
}
);

export default Plans;
