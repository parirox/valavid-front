import { Disclosure } from "@headlessui/react";
import Head from "next/head";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";

export const faqData = [
  {
    question: "اعتبار هر پروژه بعد خرید چند روز است ؟",
    answer: "اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است. سومین شهر پرجمعیت ایران پس از تهران و مشهد اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. "
  },
  {
    question: "بهتر است اشتراک خرید کنم یا پروژه ها را جداگانه دانلود کنم",
    answer: "اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است. سومین شهر پرجمعیت ایران پس از تهران و مشهد اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. "
  },
  {
    question: "آیا پروژه های رایگان هم لایسنس دارند؟",
    answer: "اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است. سومین شهر پرجمعیت ایران پس از تهران و مشهد اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. "
  },
  {
    question: "بهتر است اشتراک خرید کنم یا پروژه ها را جداگانه دانلود کنم",
    answer: "اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است. سومین شهر پرجمعیت ایران پس از تهران و مشهد اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. "
  },
  {
    question: "آیا پروژه های رایگان هم لایسنس دارند؟",
    answer: "اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است. سومین شهر پرجمعیت ایران پس از تهران و مشهد اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. "
  },
]

export default function index() {
  return (
    <>
      <Head>
        <title>Valavid | Manufacturers</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container flex flex-col items-center relative pb-[25rem]">
        <Image src={'/images/faq_QuestionsPic.png'} className="mx-auto" alt="" width={320} height={220}></Image>
        <h3 className="pt-8">چطور می توانیم کمکتان کنیم ؟</h3>
        <p className="text-secondary-100 pt-2">اگر موضوع موردنظرتان را در پایین پیدا نکردید سوال خود را بنویسید</p>
        <div className="relative w-[34rem] h-12 mt-16 mb-32">
          <input type="text" className="w-full h-full rounded-full px-8 text-black" placeholder="سوال شما" />
          <FiSearch className="absolute text-black text-2xl top-1/2 -translate-y-1/2 left-4"></FiSearch>
        </div>
        <h5>سوالات متداول</h5>
        <div className="mx-auto w-[75rem] min-w-[10rem] p-2">
          {
            faqData.map((faq, i) => (
              <div className={`${i == faqData.length - 1 ? '' : 'border-b border-secondary-400'} py-6`} key={i}>
                <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between">
                      <h5 className={`font-light ${ open ? 'text-success-100' : 'text-white'}`}>{faq.question}</h5>
                      <IoIosArrowDown className={`text-2xl text-secondary-200 mr-auto transition-all duration-500 ${open ? 'rotate-180' : 'rotate-0'}`} />
                    </Disclosure.Button>
                    <Disclosure.Panel>
                      <p className="px-3 pt-8 pb-5 text-secondary-300">
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
      </div>
    </>
  )
}
