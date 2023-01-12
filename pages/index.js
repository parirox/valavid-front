import CollectionModel from "@/components/CollectionModal";
import BecomeASeller from "@/components/home/BecomeASeller";
import Blog from "@/components/home/Blog";
import Collections from "@/components/home/Collections";
import InfoItems from "@/components/home/InfoItems";
import MostPopular from "@/components/home/MostPopular";
import SubscribeBanner from "@/components/home/SubscribeBanner";
import TopSellers from "@/components/home/TopSellers";
import FirstSection from "@/components/home/FirstSection";
import home_api, {
  GetHomeData,
  useGetHomeDataQuery,
} from "@/datasources/home/remote/HomeSliceApi";
import { wrapper } from "@/datasources/store";
import Head from "next/head";
import { useEffect } from "react";
import Error404 from "./404";

function Home() {
  const { data, isSuccess, isError } = useGetHomeDataQuery();

  if (isError) return <Error404 />;

  if (isSuccess)
    return (
      <>
        <Head>
          <title>والاوید | صفحه ی اصلی</title>
        </Head>
        <FirstSection video={data?.video} tags={data.tags} />
        {/* modal */}
        <CollectionModel />
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
    await Promise.all(store.dispatch(home_api.util.getRunningQueriesThunk()));
    return {
      props: {
        protected: true,
      },
    };
  }
);

export default Home;
