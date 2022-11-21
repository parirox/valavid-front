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
        <title>Valavid</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Slider />
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