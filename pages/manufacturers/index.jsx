import Button from '@/components/Button';
import PageTitle from '@/components/PageTitle';
import Head from 'next/head';
import Image from 'next/image';
import { Fragment } from 'react';

const data = [
  {
    id: 1,
    name: "حمید باقری",
    profile_image: "https://placeimg.com/192/192/people/1",
    produce_count: 49,
  },
  {
    id: 2,
    name: "حمید باقری",
    profile_image: "https://placeimg.com/192/192/people/2",
    produce_count: 49,
  },
  {
    id: 3,
    name: "حمید باقری",
    profile_image: "https://placeimg.com/192/192/people/3",
    produce_count: 49,
  },
  {
    id: 4,
    name: "حمید باقری",
    profile_image: "https://placeimg.com/192/192/people/4",
    produce_count: 49,
  },
  {
    id: 4,
    name: "حمید باقری",
    profile_image: "https://placeimg.com/192/192/people/5",
    produce_count: 49,
  },
  {
    id: 1,
    name: "حمید باقری",
    profile_image: "https://placeimg.com/192/192/people/1",
    produce_count: 49,
  },
  {
    id: 2,
    name: "حمید باقری",
    profile_image: "https://placeimg.com/192/192/people/2",
    produce_count: 49,
  },
  {
    id: 3,
    name: "حمید باقری",
    profile_image: "https://placeimg.com/192/192/people/3",
    produce_count: 49,
  },
  {
    id: 4,
    name: "حمید باقری",
    profile_image: "https://placeimg.com/192/192/people/4",
    produce_count: 49,
  },
  {
    id: 4,
    name: "حمید باقری",
    profile_image: "https://placeimg.com/192/192/people/5",
    produce_count: 49,
  },
  {
    id: 1,
    name: "حمید باقری",
    profile_image: "https://placeimg.com/192/192/people/1",
    produce_count: 49,
  },
  {
    id: 2,
    name: "حمید باقری",
    profile_image: "https://placeimg.com/192/192/people/2",
    produce_count: 49,
  },
  {
    id: 3,
    name: "حمید باقری",
    profile_image: "https://placeimg.com/192/192/people/3",
    produce_count: 49,
  },
  {
    id: 4,
    name: "حمید باقری",
    profile_image: "https://placeimg.com/192/192/people/4",
    produce_count: 49,
  },
  {
    id: 4,
    name: "حمید باقری",
    profile_image: "https://placeimg.com/192/192/people/5",
    produce_count: 49,
  },
  {
    id: 1,
    name: "حمید باقری",
    profile_image: "https://placeimg.com/192/192/people/1",
    produce_count: 49,
  },
  {
    id: 2,
    name: "حمید باقری",
    profile_image: "https://placeimg.com/192/192/people/2",
    produce_count: 49,
  },
  {
    id: 3,
    name: "حمید باقری",
    profile_image: "https://placeimg.com/192/192/people/3",
    produce_count: 49,
  },
  {
    id: 4,
    name: "حمید باقری",
    profile_image: "https://placeimg.com/192/192/people/4",
    produce_count: 49,
  }
]

export default function index() {
  return (
    <>
      <Head>
        <title>Valavid | Manufacturers</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className='container pt-20'>
        <PageTitle>تولید کنندگان</PageTitle>
        <div className="flex items-center flex-wrap gap-x-10 gap-y-14 pt-28 pb-96">
          {
            data.map((item, i) => (
              <div key={i} className="w-[calc(20%_-_24px)]">
                <Fragment>
                  <div className="flex-1 group/topSellerCard h-full rounded-2xl bg-[#051622]  hover:bg-gradient-to-t hover:from-[#173358] hover:to-[#0D213B44] p-7 cursor-pointer">
                    <div className="flex flex-col gap-5 w-full items-center justify-end h-full">
                      <div className="flex-grow">
                        <Image src={item.profile_image} alt={item.name} width="90" height="90" className='rounded-full' />
                      </div>
                      <div className="flex-1 text-xl">
                        <span>{item.name}</span>
                      </div>
                      <div className="flex-1 text-primary font-bold text-lg">
                        <span>تولید {item.produce_count}</span>
                      </div>
                      <div className="flex-1 w-full h-full">
                        <Button link={`/show-user/${item.id}`} className='text-xl w-full h-14 opacity-50 bg-secondary-400 transition-all group-hover/topSellerCard:btn-primary-gradient group-hover/topSellerCard:opacity-100'>
                          مشاهدات تولیدات
                        </Button>
                      </div>
                    </div>
                  </div>
                </Fragment>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
