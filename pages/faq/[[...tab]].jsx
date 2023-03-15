import {Disclosure, Tab} from "@headlessui/react";
import Head from "next/head";
import Image from "next/image";
import {useRouter} from "next/router";
import React, {useDeferredValue, useEffect, useState} from "react";
import {FiSearch} from "react-icons/fi";
import {IoIosArrowDown} from "react-icons/io";
import {isEmpty} from "@/utils/general";
import page_api, {GetFaq, useGetFaqQuery} from "@/datasources/pages/remote/PageSliceApi";
import {wrapper} from "@/datasources/store";
import {ApiAddress, ApiEndpoint} from "@/utils/api/api";
import product_api, {GetCollectionDetails} from "@/datasources/product/remote/ProductSliceApi";
import {makeTitleWith} from "@/utils/seo/meta";

function Faq({query}) {
    const {data, isSuccess} = useGetFaqQuery()

    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");
    const searchValueDeferred = useDeferredValue(searchValue);

    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        let Q;
        if (isEmpty(router.query?.tab)){
            Q = query
        }else{
            Q = router.query
        }
        let targetTab;
        if(!isEmpty(Q.tab)) targetTab = data.findIndex((tab) => tab.title == Q.tab)
        setSelectedIndex(targetTab)
    }, [router]);

    const changeTabHandler = async (i) => {
        await router.push(
        {
            pathname: `/faq/${data[i].title}`,
        },
        undefined,
        {shallow: true}
        );
    };
    if (!isSuccess) return <></>
    return (
    <>
        <Head>
            <title>{makeTitleWith("سوالات متداول")}</title>
        </Head>
        <div className="container items-center relative pb-[25rem]">
            <div className="flex flex-col items-center justify-center">
                <Image src={'/images/faq_QuestionsPic.png'} className="mx-auto" alt="faq" width={320}
                       height={220}></Image>
                <h3 className="pt-8">چطور می توانیم کمکتان کنیم ؟</h3>
                <p className="text-secondary-100 pt-2">اگر موضوع موردنظرتان را در پایین پیدا نکردید سوال خود را
                    بنویسید</p>
                <div className="relative w-full sm:w-[34rem] h-12 mt-16 mb-20">
                    <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                           className="w-full h-full rounded-full px-8 text-black" placeholder="سوال شما"/>
                    <FiSearch className="absolute text-black text-2xl top-1/2 -translate-y-1/2 left-4"></FiSearch>
                </div>
            </div>
            <div className="basis-3/4 overflow-hidden relative">
                <Tab.Group
                selectedIndex={selectedIndex}
                onChange={changeTabHandler}
                >
                    <Tab.List className="w-full h-20 flex relative">
                        <div className="absolute left-0 right-0 bottom-0 h-1 -z-10 bg-accent w-full"></div>
                        {data.map((tab, k) => (
                        <Tab
                        key={k}
                        className="w-44 flex items-center gap-4 outline-0  ui-selected:border-b-[0.25rem] ui-not-selected:border-accent ui-not-selected:text-secondary-300 ui-selected:border-primary justify-center"
                        >
                            {tab?.icon}
                            <span
                            className={
                                tab?.className ? "px-5 py-2 " + tab?.className : ""
                            }
                            >
                      {tab.title}
                    </span>
                        </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels className="">
                        {data.map((tab, k) => (
                        <Tab.Panel key={k}>{
                            <div className="mx-auto w-full lg:w-[75rem] min-w-[10rem] md:pt-8">
                                {
                                    tab.items?.filter(q => q.question.includes(searchValueDeferred) || q.answer.includes(searchValueDeferred)).map((faq, i) => (
                                    <div
                                    className={`${i === tab.items?.length - 1 ? '' : 'border-b border-secondary-400'} py-6`}
                                    key={i}>
                                        <Disclosure>
                                            {({open}) => (
                                            <>
                                                <Disclosure.Button
                                                className="flex w-full items-start justify-between gap-6">
                                                    <h5
                                                    className={`font-light text-start leading-10 text-lg md:text-xl ${open ? 'text-success-100' : 'text-white'}`}>{faq.question}</h5>
                                                    <IoIosArrowDown
                                                    className={`text-2xl text-secondary-200 mr-auto transition-all duration-500 ${open ? 'rotate-180' : 'rotate-0'}`}/>
                                                </Disclosure.Button>
                                                <Disclosure.Panel>
                                                    <p className="px-3 pt-8 pb-5 text-secondary-300 text-justify">
                                                        {faq.answer}
                                                    </p>
                                                </Disclosure.Panel>
                                            </>
                                            )}
                                        </Disclosure>
                                    </div>
                                    ))
                                }
                            </div>
                        }</Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
(store) => async (context) => {
    store.dispatch(GetFaq.initiate())
    await Promise.all(store.dispatch(page_api.util.getRunningQueriesThunk()))

    return {
        props: {
            query: {
                tab: context.query?.tab?.[0] ?? null
            },
        },
    };
}
);

export default Faq;