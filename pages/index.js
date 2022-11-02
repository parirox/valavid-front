import BecomeASeller from "@/components/home/BecomeASeller";
import Blog from "@/components/home/Blog";
import Collections from "@/components/home/Collections";
import InfoItems from "@/components/home/InfoItems";
import MostPopular from "@/components/home/MostPopular";
import SubscribeBanner from "@/components/home/SubscribeBanner";
import TopSellers from "@/components/home/TopSellers";
import Head from "next/head";
export default function Home() {
  return (
    <>
      <Head>
        <title>Valavid</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
        <section>
          <InfoItems></InfoItems>
        </section>
        <section>
          <Collections></Collections>
        </section>
        <section>
          <MostPopular></MostPopular>
        </section>
        <section>
          <Blog></Blog>
        </section>
        <section>
          <SubscribeBanner></SubscribeBanner>
        </section>
        <section>
          <TopSellers></TopSellers>
        </section>
        <section>
          <BecomeASeller></BecomeASeller>
        </section>
    </>
  );
}
