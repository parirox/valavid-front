import Collections from "@/components/publisher-profile/Collections";
import Medals from "@/components/publisher-profile/Medals";
import Products from "@/components/publisher-profile/Products";
import {isEmpty} from "@/utils/general";
import {Tab} from "@headlessui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {BsFolder2Open} from "react-icons/bs";
import {FaInstagram, FaMedal, FaTelegramPlane, FaYoutube} from "react-icons/fa";
import {FiUpload} from "react-icons/fi";
import {IoLocationOutline,} from "react-icons/io5";
import {MdVerifiedUser} from "react-icons/md";
import {GetPublisherProfile, useGetPublisherProfileQuery} from "@/datasources/user/remote/UserSliceApi";
import {wrapper} from "@/datasources/store";
import product_api from "@/datasources/product/remote/ProductSliceApi";
import Avatar from "react-avatar";
import {dateFormat} from "@/utils/date/date";

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

function Profile({query, targetTab}) {
  const {data, isSuccess, isError, isLoading} = useGetPublisherProfileQuery(query)

  if (!isSuccess) return <></>
  return (
    <>
      <Head>
        <title>والاوید | پروفایل {data.name}</title>
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
          <div className="flex flex-col gap-10 relative">
            <div className="flex items-center flex-col gap-8 text-lg">
              <div className="relative">
                <div className="flex-initial">
                  {data.profile_image ?
                    <Image src={data.profile_image} alt={data.name} width={140} height={140}
                           className='rounded-full'/> :
                    <Avatar round={true} name={data.name} size="140"/>}
                  <span
                    className="rounded-full bg-white absolute right-[15%] top-[15%] translate-x-1/2 -translate-y-1/2 w-12 h-12 p-1 flex items-center justify-center text-success-100 text-3xl">
                    <MdVerifiedUser/>
                  </span>
                </div>
              </div>
              <div className="text-4xl">{data.name}</div>
              {data.location && <div className="flex items-end gap-2 text-color8">
                <IoLocationOutline className="text-3xl"/>
                <span>{data.location}</span>
              </div>}
              <div className="text-color8 px-10 text-center ">
                {data.bio}
              </div>
              <div className="text-gray px-10 text-center">
                عضویت:{" "}
                {dateFormat(data.date_joined)}
              </div>
            </div>
            <div className="flex items-center flex-col gap-5 my-10 h-full justify-center">
              <Image src={"/images/NoMedal.png"} className={"object-contain"} alt={"هنوز افتخاری کسب نشده"} width={100}
                     height={150} sizes={"33vw"}/>
              <label className="text-accent text-lg">هنوز افتخاری کسب نشده</label>
            </div>
            <div
              className="flex flex-row gap-6 text-3xl justify-center text-accent border-t-2 border-secondary-600 pt-10">
              <Link href={'#'}><FaInstagram/></Link>
              <Link href={'#'}><FaYoutube/></Link>
              <Link href={'#'}><FaTelegramPlane/></Link>
            </div>
          </div>
        </aside>
        <div className="basis-3/4 overflow-hidden relative">
          <Tab.Group defaultIndex={targetTab}>
            <Tab.List className="w-full h-20 flex relative">
              <div className="absolute left-0 right-0 bottom-0 h-2 -z-10 bg-accent w-full"></div>
              {tabs.map((tab, k) => (
                <Tab
                  key={k}
                  as={Link}
                  href={{
                    pathname: `/profile/${query.username}/${tab.id}`,
                  }}
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
        </div>
      </div>
    </>
  );
}


export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {

    const query = {...context.params}
    store.dispatch(GetPublisherProfile.initiate(context.params))
    await Promise.all(store.dispatch(product_api.util.getRunningQueriesThunk()))


    const tabId = !isEmpty(query.tab)
      ? query.tab[0]
      : tabs[1].id;
    let targetTab = tabs.findIndex((tab) => tab.id === tabId);
    targetTab = targetTab >= 0 ? targetTab : 0

    return {
      props: {
        query,
        targetTab
      },
    };
  }
);


export default Profile;
