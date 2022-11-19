import CoverPage from "@/components/CoverPage";
import Head from "next/head";

export default function index() {
  return (
    <>
      <Head>
        <title>Valavid</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CoverPage className="bg-gradient-to-l from-[#13222db3] via-[#14232f59] to-[#13222db3]" />
    </>
  )
}
