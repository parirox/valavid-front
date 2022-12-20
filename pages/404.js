import Button from "@/components/Button";
import Head from "next/head";
import Image from "next/image";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 Error</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container relative min-h-[100vh] flex justify-center items-center">
        <div className="h-[500px] w-[620px] relative">
          <Image src={'/images/treePic404.png'} alt="" fill sizes=""></Image>
        </div>
        <div className="absolute text-[12rem] mt-28 mx-auto right-0 left-0 font-bold text-center">
          404
          <Button className={`text-xl w-64 mx-auto h-[4rem] -mt-7 rounded-xl transition-all bg-gradient-to-r from-[#9D99F8] to-[#534CDA]`} link={'/'}>
            بازگشت به خانه
          </Button>
        </div>
      </div>
    </>
  )
}
