import { Disclosure } from "@headlessui/react";
import Head from "next/head";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { isEmpty } from "@/utils/general";

const tabs = [
  {
    id: "UserForm",
    title: "اطلاعات کاربری",
    content: "<UserForm />",
  },
  {
    id: "Downloads",
    title: "دانلود ها",
    content: "<Downloads />",
  },
  {
    id: "Collections",
    title: "مجموعه ها",
    content: "<Collections />",
  },
  {
    id: "Products",
    title: "محصولات",
    content: "<Products />",
  },
  {
    id: "Uploads",
    title: "آپلود ها",
    content: "<Uploads />",
  },
  {
    id: "Favorites",
    title: "علاقه مندی ها",
    content: "<Favorites />",
  },
  {
    id: "Tickets",
    title: "تیکت ها",
    content: "<Tickets />",
  },
  {
    id: "Medals",
    title: "افتخارات",
    content: "<Medals />",
  },
  {
    id: "Accounting",
    title: "امور مالی",
    content: "<Accounting />",
    items: [
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
  },
];

// export const faqData = [
//   {

function faq() {

  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      const tabId = !isEmpty(router.query.tab)
        ? router.query.tab[0]
        : tabs[0].id;
      const targetTab = tabs.findIndex((tab) => tab.id === tabId);
      if (targetTab >= 0) {
        setSelectedIndex(targetTab);
      }
    }
  }, [router]);

  const changeTabHandler = async (i) => {
    await router.push(
      {
        pathname: `/faq/${tabs[i].id}`,
      },
      undefined,
      { shallow: true }
    );
  };

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
        <div className="relative w-[34rem] h-12 mt-16 mb-20">
          <input type="text" className="w-full h-full rounded-full px-8 text-black" placeholder="سوال شما" />
          <FiSearch className="absolute text-black text-2xl top-1/2 -translate-y-1/2 left-4"></FiSearch>
        </div>
        <div className="basis-3/4 overflow-hidden relative">
          {selectedIndex >= 0 && (
            <Tab.Group
              selectedIndex={selectedIndex}
              onChange={changeTabHandler}
            >
              <Tab.List className="w-full h-20 flex relative">
                <div className="absolute left-0 right-0 bottom-0 h-2 -z-10 bg-accent w-full"></div>
                {tabs.map((tab, k) => (
                  <Tab
                    key={k}
                    className="w-44 flex items-center gap-4 outline-0 border-b-[0.5rem] ui-not-selected:border-accent ui-not-selected:text-secondary-300 ui-selected:border-primary justify-center"
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
              <Tab.Panels className="p-5">
                {tabs.map((tab, k) => (
                  <Tab.Panel key={k}>{
                    <div className="mx-auto w-[75rem] min-w-[10rem] pt-16">
                      {
                        tab.items?.map((faq, i) => (
                          <div className={`${i == tab.items?.length - 1 ? '' : 'border-b border-secondary-400'} py-6`} key={i}>
                            <Disclosure>
                              {({ open }) => (
                                <>
                                  <Disclosure.Button className="flex w-full justify-between">
                                    <h5 className={`font-light ${open ? 'text-success-100' : 'text-white'}`}>{faq.question}</h5>
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
                  }</Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          )}
        </div>

      </div>
    </>
  )
}

export default faq;