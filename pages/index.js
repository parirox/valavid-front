import BecomeASeller from "@/components/home/BecomeASeller";
import Blog from "@/components/home/Blog";
import Collections from "@/components/home/Collections";
import InfoItems from "@/components/home/InfoItems";
import MostPopular from "@/components/home/MostPopular";
import SubscribeBanner from "@/components/home/SubscribeBanner";
import TopSellers from "@/components/home/TopSellers";
import FirstSection from "@/components/home/FirstSection";
import page_api, {GetHomeData, useGetHomeDataQuery,} from "@/datasources/pages/remote/PageSliceApi";
import {wrapper} from "@/datasources/store";
import Head from "next/head";
import ManageCollectionDialog from "@/components/ManageCollectionDialog";
import ErrorPage from "./ErrorPage";
import React from "react";

function Home() {
  const { data, isSuccess, isError, error } = useGetHomeDataQuery();

  if (isError) return <ErrorPage info={error}/>

  if (isSuccess)
    return (
      <>
        <Head>
          <title>والاوید | صفحه ی اصلی</title>
          <meta name="description" content="بانک فوتیج ایران" />
        </Head>
        <FirstSection video={data?.video} tags={data.tags} />
        {/* modal */}
        <ManageCollectionDialog />
        <InfoItems stats={data.stats} />
        <Collections data={data.collections} />
        <MostPopular data={data.most_popular} />
        <Blog data={data.blogs} />
        <SubscribeBanner />
        <TopSellers data={data?.top_sellers} />
        <BecomeASeller />
      </>
    );
}

Home.styleMode = "main";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(GetHomeData.initiate());
    await Promise.all(store.dispatch(page_api.util.getRunningQueriesThunk()));
    return {
      props: {
        // protected: true,
      },
    };
  }
);

export default Home;
