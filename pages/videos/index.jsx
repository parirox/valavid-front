import CoverPage from "@/components/CoverPage";
import SortTabs from "@/components/SortTabs";
import Head from "next/head";
import VideoIcon from '@/public/icons/FillVideoPrimary.svg';

export default function index() {
  return (
    <>
      <Head>
        <title>Valavid | Videos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CoverPage className="bg-gradient-to-l from-[#13222db3] via-[#14232f59] to-[#13222db3]" value="مجموعه فیلم ویدئویی با کیفیت باورنکردنی" icon={<VideoIcon />} />
      <div className="flex w-full">
        <div className="basis-1/4 h-[40rem] bg-secondary-light"></div>
        <div className="basis-full h-[40rem] px-10">
          <SortTabs></SortTabs>
        </div>
      </div>
    </>
  )
}
