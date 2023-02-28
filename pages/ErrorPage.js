import Button from "@/components/Button";
import Head from "next/head";
import Image from "next/image";

function ErrorPage({info}) {
  console.log(info)
  return (
    <>
      <Head>
        <title>Error</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container relative min-h-[100vh] flex justify-center items-center">
        <div className="h-[500px] w-[620px] relative">
          <Image src={'/images/treePic404.png'} alt="" fill sizes=""></Image>
        </div>
        <div className="absolute text-3xl lg:text-[10rem] mt-28 mx-auto right-0 left-0 font-bold text-center">
          <span className={"mb-20 block"}>{info?.status ?? info?.originalStatus ?? ""}</span>
          <Button className={`text-xl w-64 mx-auto h-[4rem] rounded-xl transition-all bg-gradient-to-r from-[#9D99F8] to-[#534CDA]`} link={'/'}>
            بازگشت به خانه
          </Button>
        </div>
      </div>
    </>
  )
}

ErrorPage.styleMode = '404'

export default ErrorPage;