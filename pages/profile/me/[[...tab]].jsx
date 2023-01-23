import Button from "@/components/Button";
import ButtonIcon from "@/components/ButtonIcon";
import Accounting from "@/components/profile/Accounting";
import Collections from "@/components/profile/Collection/Collections";
import Downloads from "@/components/profile/Downloads";
import Favorites from "@/components/profile/Favorites";
import Achievements from "@/components/profile/Achievements";
import Tickets from "@/components/profile/Tickets/Tickets";
import UserForm from "@/components/profile/Forms/UserForm";
import Products from "@/components/profile/Products";
import {isEmpty} from "@/utils/general";
import {Tab} from "@headlessui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {BsFolder2Open} from "react-icons/bs";
import {FaChevronDown, FaMedal, FaStar} from "react-icons/fa";
import {FiDownload, FiUpload} from "react-icons/fi";
import {IoCalculator, IoClose, IoHeart, IoLocationOutline, IoPerson, IoTicketSharp,} from "react-icons/io5";
import {MdEdit, MdGroupAdd, MdVerifiedUser} from "react-icons/md";
import SellerForm from "@/components/profile/Forms/SellerForm";
import TeamForm from "@/components/profile/Forms/TeamForm";
import withAuth from "HOC/withAuth";
import {useGetProfileDetailsQuery} from "@/datasources/user/remote/UserSliceApi";
import {dateFormat} from "@/utils/date/date";
import ProfileCardLoader from "@/components/skelton/ProfileCardLoader";
import {CiStar} from "react-icons/ci";
import Avatar from "@/components/Avatar";

let tabs = [
  {
    id: "UserForm",
    title: "اطلاعات کاربری",
    icon: <IoPerson/>,
    content: <UserForm/>,
  },
  {
    id: "Downloads",
    title: "دانلود ها",
    icon: <FiDownload/>,
    content: <Downloads/>,
  },
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
    id: "Favorites",
    title: "علاقه مندی ها",
    icon: <IoHeart/>,
    content: <Favorites/>,
  },
  {
    id: "Tickets",
    title: "تیکت ها",
    icon: <IoTicketSharp/>,
    content: <Tickets/>,
  },
  {
    id: "Achievements",
    title: "افتخارات",
    icon: <FaMedal/>,
    content: <Achievements/>,
  },
  {
    id: "Accounting",
    title: "امور مالی",
    icon: <IoCalculator/>,
    content: <Accounting/>,
  },
  {
    id: "SellerForm",
    title: "فروشنده شوید",
    content: <SellerForm/>,
    className: "rounded-2xl bg-primary text-color6 text-sm",
  },
  {
    id: "TeamForm",
    title: "ثبت تیم",
    content: <TeamForm/>,
    className: "rounded-2xl bg-primary text-color6 text-sm",
  },
];

function SellerProfile() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const {data, isSuccess, isLoading} = useGetProfileDetailsQuery()

  useEffect(() => {
    if (router.isReady) {
      if(isSuccess) {
        // if(data.is_seller) tabs = tabs.forEach((v)=>v.id==='SellerForm'? v.title = 'اطلاعات فروشنده' : '' )
        // if(data.is_team) tabs = tabs.forEach((v)=>v.id==='TeamForm'? v.title = 'اطلاعات تیم' : '' )
      }
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
        pathname: `/profile/me/${tabs[i].id}`,
      },
      undefined,
      {shallow: true}
    );
  };

  return (
    <>
      <Head>
        <title>والاوید | پروفایل من</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <div className="w-full h-72 relative">
        <Image
          src={isSuccess && !isEmpty(data.background_image?.src) ? data.background_image.src : "/images/profile-bg.png"}
          fill
          alt={isSuccess && !isEmpty(data.background_image?.alt) ? data.background_image.alt : "profile background"}
          className="object-cover"
          sizes={"100wv"}
        />
      </div>
      <div className="flex w-full px-10 gap-8 items-start">
        <aside className="basis-1/4 rounded-2xl relative -top-52 bg-secondary-light p-10">
          {isLoading && <ProfileCardLoader/>}
          {isSuccess &&
            <div className="grid grid-cols-1 grid-rows-2 gap-10 relative">
            <span className="absolute left-0 top-0">
              <ButtonIcon
                icon={<MdEdit/>}
                className="btn-accent text-2xl h-14 w-14"
              />
            </span>
              <div className="flex items-center flex-col gap-8 text-lg">
                <Avatar src={data.avatar.src} alt={data.username}
                        size={140}
                        badge={
                          <span
                            className="rounded-full bg-white absolute right-[15%] top-[15%] translate-x-1/2 -translate-y-1/2 w-12 h-12 p-1 flex items-center justify-center text-success-100 text-3xl">
                              <MdVerifiedUser/>
                            </span>
                        }
                />
                <div className="text-4xl">{data?.first_name ? `${data.first_name} ${data.last_name}` : data.email}</div>
                <div className="flex items-end gap-2 text-color8">
                  <IoLocationOutline className="text-3xl"/>{" "}
                  <span>{[data.info?.location?.country, data.info?.location?.state, data.info?.location?.city].filter(v => (!isEmpty(v))).join("، ")}</span>
                </div>
                <div className="text-color8 px-10 text-center ">
                  {data.slogan}
                </div>
                <div className="text-gray px-10 text-center">
                  عضویت:{" "}
                  {dateFormat(data.date_joined)}
                </div>
              </div>
              <div className="flex items-center flex-col gap-5 text-lg justify-end">
                { data.has_active_subscription ?
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
                    <div
                      className="bg-primary px-4 py-6 absolute z-40 rounded-b-xl hidden peer-hover:block w-full text-lg">
                      <div className="bg-white rounded-2xl text-primary px-6 py-4 mb-4">
                        {data.subscription.remaining.days > 0 &&
                          <span className="ml-1">{data.subscription.remaining.days} روز</span>}
                        {data.subscription.remaining.days === 0 &&
                          <>
                            <span className="ml-1">{data.subscription.remaining.hours} ساعت</span>
                            <span className="ml-1">{data.subscription.remaining.minutes} دقیقه </span>
                          </>
                        }
                        <span className="">از اشتراک شما باقیمانده</span>
                      </div>
                      <div className="bg-white rounded-2xl text-primary px-6 py-4">
                        <span className="ml-1">{data.subscription.remaining.amount.toLocaleString()}</span>
                        <span className="">تومان از سقف خرید شما باقی مانده</span>
                      </div>
                    </div>
                  </div>
                  :
                  <div className="relative w-full cursor-default">
                    <div className="bg-accent w-full peer rounded-2xl flex justify-between py-4 px-8 items-center hover:rounded-b-none">
                      <span className="flex gap-2 items-center">
                        <CiStar className="text-4xl"/>
                        <span className="text-xl">اشتراک ندارید</span>
                      </span>
                      <span className="flex gap-2 items-center text-color3">
                        <Button link={"/plans"} className={"bg-gradient-to-tr from-[#C4C1FF] to-white to-white text-primary px-10"}>خرید اشتراک</Button>
                      </span>
                    </div>
                  </div>
                }
                { !data?.is_seller ?
                  <div className="w-full bg-accent rounded-2xl p-8 flex">
                    <div className="basis-4/6">
                      <div className="mb-2 text-xl">فروشنده شوید</div>
                      <div className="mb-6 text-gray">
                        اطلاعات ثبت نام خود را کامل کنید
                      </div>
                      <Button
                        className="btn-primary-gradient px-12 py-3"
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
                  </div> :
                  <div className="w-full bg-accent rounded-2xl p-8 flex">
                    <div className="basis-4/6">
                      <div className="mb-2 mb-3 text-gray">محصول خود را منتشر کنید</div>
                      <Button
                        className="btn-primary-gradient w-fit px-10 py-3"
                        link={`/profile/me/Products`}
                      >بارگذاری محصول</Button>
                    </div>
                    <div className="flex justify-between basis-2/6 relative">
                      <Image
                        src="/images/camera.png"
                        alt="create product"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                }
                { !data?.is_team && <div className="w-full bg-accent rounded-2xl p-8 flex items-center gap-3">
                  <MdGroupAdd className="text-primary text-4xl"/>
                  <Link href={`/profile/me/TeamForm`}>
                  <span className="text-lg">
                    تغییر حساب کاربری به شخصیت حقوقی
                  </span>
                  </Link>
                </div> }
              </div>
            </div>
          }
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

export default SellerProfile;
