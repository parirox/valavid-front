import CollectionModel from "@/components/CollectionModal";
import BecomeASeller from "@/components/home/BecomeASeller";
import Blog from "@/components/home/Blog";
import Collections from "@/components/home/Collections";
import InfoItems from "@/components/home/InfoItems";
import MostPopular from "@/components/home/MostPopular";
import SubscribeBanner from "@/components/home/SubscribeBanner";
import TopSellers from "@/components/home/TopSellers";
import Slider from "@/components/Slider";
import Head from "next/head";

function Home() {
  return (
    <>
      <Head>
          <title>والاوید | صفحه ی اصلی</title>
      </Head>
      <Slider />
      {/* modal */}
      <CollectionModel />
      <InfoItems />
      <Collections />
      <MostPopular />
      <Blog />
      <SubscribeBanner />
      <TopSellers />
      <BecomeASeller />
    </>
  );
}

Home.styleMode = "main"

export default Home;