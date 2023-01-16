import Button from "@/components/Button";
import ButtonIcon from "@/components/ButtonIcon";
import Collections from "@/components/publisher-profile/Collections";
import Medals from "@/components/publisher-profile/Medals";
import Products from "@/components/publisher-profile/Products";
import {isEmpty} from "@/utils/general";
import {Tab} from "@headlessui/react";
import moment from "jalali-moment";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {BsFolder2Open} from "react-icons/bs";
import {FaChevronDown, FaMedal, FaStar} from "react-icons/fa";
import {FiUpload} from "react-icons/fi";
import {IoLocationOutline,} from "react-icons/io5";
import {MdEdit, MdGroupAdd, MdVerifiedUser} from "react-icons/md";
import {
  GetPublisherProfile,
  useGetPublisherCollectionQuery,
  useGetPublisherProfileQuery
} from "@/datasources/user/remote/UserSliceApi";
import {wrapper} from "@/datasources/store";
import product_api, {GetCollectionDetails} from "@/datasources/product/remote/ProductSliceApi";

const data = {
  user: {
    name: "سجاد قهرمانی",
    profile_image: "https://placeimg.com/192/192/people",
    location: "ایران, کرمانشاه",
    bio: "عکاسی تازه کار هستم که دنبال کشف دنیای زیبای خودم هستم و در تلاش برای پیشرفت",
    registered_at: "2022-12-167T15:24:17.604594",
    is_seller: false,
    is_team: false,
    subscribe: {
      status: false,
      account_balance: 2500000,
      expired_at: "2022-12-167T15:24:17.604594",
    },
  },
};


const tabs = [
  {
    id: "Collections",
    title: "مجموعه ها",
    icon: <BsFolder2Open/>,
    content: <Collections/>,
  },
  {
    id: "Products",
    title: "محصولات",
    icon: <FiUpload/>,
    content: <Products/>,
  },
  {
    id: "Medals",
    title: "افتخارات",
    icon: <FaMedal/>,
    content: <Medals/>,
  },
];

function Profile({query}) {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const {data2, isSuccess, isError, isLoading} = useGetPublisherProfileQuery({query})

  useEffect(() => {
    if (router.isReady) {
      const tabId = !isEmpty(router.query.tab)
        ? router.query.tab[0]
        : tabs[1].id;
      const targetTab = tabs.findIndex((tab) => tab.id === tabId);
      if (targetTab >= 0) {
        setSelectedIndex(targetTab);
      }
    }
  }, [router]);

  const changeTabHandler = async (i) => {
    await router.push(
      {
        pathname: `/profile/${router.query.username}/${tabs[i].id}`,
      },
      undefined,
      {shallow: true}
    );
  };

  return (
    <>
      <Head>
        <title>والاوید | پروفایل کاربری</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <div className="w-full h-72 relative">
        <Image
          src="/images/profile-bg.png"
          fill
          alt="profile background"
          className="object-cover"
        />
      </div>
      <div className="flex w-full px-10 gap-8">
        <aside className="basis-1/4 rounded-2xl relative -top-52 bg-secondary-light p-10">
          <div className="grid grid-cols-1 grid-rows-2 gap-10 relative">
            <span className="absolute left-0 top-0">
              <ButtonIcon
                icon={<MdEdit/>}
                className="btn-accent text-2xl h-14 w-14"
              />
            </span>
            <div className="flex items-center flex-col gap-8 text-lg">
              <div className="relative">
                <div className="flex-initial">
                  <span className="relative">
                    <Image
                      src={data.user.profile_image}
                      alt={data.user.name}
                      width={140}
                      height={140}
                      className="rounded-full"
                    />
                    <span
                      className="rounded-full bg-white absolute right-[15%] top-[15%] translate-x-1/2 -translate-y-1/2 w-12 h-12 p-1 flex items-center justify-center text-success-100 text-3xl">
                      <MdVerifiedUser/>
                    </span>
                  </span>
                </div>
              </div>
              <div className="text-4xl">{data.user.name}</div>
              <div className="flex items-end gap-2 text-color8">
                <IoLocationOutline className="text-3xl"/>{" "}
                <span>{data.user.location}</span>
              </div>
              <div className="text-color8 px-10 text-center ">
                {data.user.bio}
              </div>
              <div className="text-gray px-10 text-center">
                عضویت:{" "}
                {moment(data.user.registered_at, "YYYY/MM/DD")
                  .locale("fa")
                  .format("YYYY/MM/DD")}
              </div>
            </div>
            <div className="flex items-center flex-col gap-5 text-lg justify-end">
              <div className="relative w-full cursor-default">
                <div
                  className="bg-primary w-full peer rounded-2xl flex justify-between py-4 px-8 items-center hover:rounded-b-none">
                  <span className="flex gap-2 items-center">
                    <FaStar className="text-4xl"/>
                    <span className="text-xl">مشترک بسته حجمی</span>
                  </span>
                  <span className="flex gap-2 items-center text-color3">
                    <span className="">جزئیات</span>
                    <span>
                      <FaChevronDown/>
                    </span>
                  </span>
                </div>
                <div className="bg-primary px-4 py-6 absolute z-40 rounded-b-xl hidden peer-hover:block w-full text-xl">
                  <div className="bg-white rounded-2xl text-primary px-6 py-4 mb-4">
                    <span className="ml-1">64</span>
                    <span className="">روز از اشتراک شما باقیمانده</span>
                  </div>
                  <div className="bg-white rounded-2xl text-primary px-6 py-4">
                    <span className="ml-1">64</span>
                    <span className="">روز از اشتراک شما باقیمانده</span>
                  </div>
                </div>
              </div>
              <div className="w-full bg-accent rounded-2xl p-8 flex">
                <div className="basis-4/6">
                  <div className="mb-2 text-2xl">فروشنده شوید</div>
                  <div className="mb-6 text-gray">
                    اطلاعات ثبت نام خود را کامل کنید
                  </div>
                  <Button
                    className="btn-primary-gradient px-16 py-3"
                    link={`/profile/me/SellerForm`}
                  >
                    فروشنده شوید
                  </Button>
                </div>
                <div className="flex justify-between basis-2/6 relative">
                  <Image
                    src="/images/camera.png"
                    alt="be seller"
                    fill
                    className="object-cover scale-110"
                  />
                </div>
              </div>
              <div className="w-full bg-accent rounded-2xl p-8 flex items-center gap-3">
                <MdGroupAdd className="text-primary text-4xl"/>
                <Link href={`/profile/me/TeamForm`}>
                  <span className="text-xl">
                    تغییر حساب کاربری به شخصیت حقوقی
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </aside>
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
                  <Tab.Panel key={k}>{tab.content}</Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          )}
        </div>
      </div>
    </>
  );
}


export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const query = {...context.params}
    store.dispatch(GetPublisherProfile.initiate({query}))
    await Promise.all(store.dispatch(product_api.util.getRunningQueriesThunk()))
    return {
      props: {
        query
      },
    };
  }
);


export default Profile;
