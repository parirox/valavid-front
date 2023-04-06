import Collections from "@/components/publisher-profile/Collections";
import Achievements from "@/components/publisher-profile/Achievements";
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
import {
  GetPublisherAchievements, GetPublisherCollection, GetPublisherProduct,
  GetPublisherProfile,
  useGetPublisherProfileQuery
} from "@/datasources/user/remote/UserSliceApi";
import {wrapper} from "@/datasources/store";
import product_api from "@/datasources/product/remote/ProductSliceApi";
import {dateFormat} from "@/utils/date/date";
import Avatar from "@/components/Avatar";
import * as React from 'react'
import {useEffect, useRef} from "react";
import {makeTitleWith} from "@/utils/seo/meta";

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
    id: "Achievements",
    title: "افتخارات",
    icon: <FaMedal/>,
    content: <Achievements/>,
  },
];

function Profile({query, targetTab}) {
  const {data, isSuccess} = useGetPublisherProfileQuery(query)

  const parentAsideCard = useRef();
  const asideCard = useRef();
  const aideCardInitialPosition = useRef();

  useEffect(() => {
    if (!isEmpty(asideCard.current)) {
      if (isEmpty(aideCardInitialPosition?.current)) aideCardInitialPosition.current = asideCard.current.getBoundingClientRect().top;
      const onScroll = () => {
        const marginTop = 15
        if (parentAsideCard.current.getBoundingClientRect().top >= 0) asideCard.current.style.setProperty("top", scrollY - aideCardInitialPosition.current + "px")
        else asideCard.current.style.setProperty("top", -parentAsideCard.current.getBoundingClientRect().top + marginTop + "px")
      };
      window.removeEventListener('scroll', onScroll);
      window.addEventListener('scroll', onScroll, {passive: true});
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, [asideCard.current]);

  if (!isSuccess) return <></>
  return (
    <>
      <Head>
        <title>{makeTitleWith( `پروفایل ${data.name}`)}</title>
      </Head>
      <div className="w-full h-72 relative">
        <Image
          src="/images/profile-bg.png"
          fill
          alt="profile background"
          className="object-cover"
        />
      </div>
      <div ref={parentAsideCard} className="flex w-full px-10 gap-8 items-start">
        <aside ref={asideCard}
               className="basis-1/4 rounded-2xl relative -top-52 bg-secondary-light p-10">
          <div className="flex flex-col gap-10 relative">
            <div className="flex items-center flex-col gap-8 text-lg">
              <Avatar src={data.profile_image} alt={data.name}
                      size={140}
                      badge={
                        <span
                          className="rounded-full bg-white absolute right-[15%] top-[15%] translate-x-1/2 -translate-y-1/2 w-12 h-12 p-1 flex items-center justify-center text-success-100 text-3xl">
                              <MdVerifiedUser/>
                            </span>
                      }
              />
              <div className="text-4xl">{data.name}</div>
              <div className="text-2xl">{data.username}</div>
              {(data.country?.name || data.state || data.city) && <div className="flex items-end gap-2 text-color8">
                <IoLocationOutline className="text-3xl"/>
                <span> {[data.country?.name, data.state, data.city].filter(v => (!isEmpty(v))).join("، ")}</span>
              </div>}
              <div className="text-color8 px-10 text-center ">
                {data.slogan}
              </div>
              <div className="text-gray px-10 text-center">
                عضویت:{" "}
                {dateFormat(data.date_joined)}
              </div>
            </div>
            <div className="flex items-center flex-col gap-5 my-10 h-full justify-center">
              {data.achievements.length ?
                <div className={"flex gap-4 justify-between"}>
                  {data.achievements.map((achievement, k) => (
                    <div key={k} className={"flex flex-col justify-center items-center"}>
                      <Image src={achievement.image} className={"object-contain"} alt={achievement.title} width={100}
                             height={150} sizes={"33vw"}/>
                      <label
                        className="bg-secondary rounded-2xl text-white px-4 py-2 text-lg inline-block">{achievement.title}</label>
                    </div>
                  ))}
                </div>
                :
                <>
                  <Image src={"/images/NoMedal.png"} className={"object-contain"} alt={"هنوز افتخاری کسب نشده"}
                         width={100}
                         height={150} sizes={"33vw"}/>
                  <label className="text-accent text-lg">هنوز افتخاری کسب نشده</label>
                </>
              }
            </div>
            <div
              className="flex flex-row gap-6 text-3xl justify-center text-accent border-t-2 border-secondary-600 pt-10">
              <Link href={data.social?.instagram ?? "#"}><FaInstagram/></Link>
              <Link href={data.social?.youtube ?? "#"}><FaYoutube/></Link>
              <Link href={data.social?.telegram ?? "#"}><FaTelegramPlane/></Link>
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
                <Tab.Panel key={k}>
                  {React.cloneElement(tab.content, query)}
                </Tab.Panel>
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

    const query = {...context.query}
    const tabId = !isEmpty(query.tab)
      ? query.tab[0]
      : tabs[1].id;
    let targetTab = tabs.findIndex((tab) => tab.id === tabId);
    targetTab = targetTab >= 0 ? targetTab : 0;

    store.dispatch(GetPublisherProfile.initiate(context.params))
    switch (tabs[targetTab]?.id) {
      case "Achievements":
        store.dispatch(GetPublisherAchievements.initiate(context.params))
        break;
      case "Products":
        store.dispatch(GetPublisherProduct.initiate({...context.query}))
        break;
      case "Collections":
        store.dispatch(GetPublisherCollection.initiate(context.params))
        break;
    }
    await Promise.all(store.dispatch(product_api.util.getRunningQueriesThunk()))

    return {
      props: {
        query,
        targetTab
      },
    };
  }
);


export default Profile;
