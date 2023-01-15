import React from 'react'
import {BsSortDown} from 'react-icons/bs'
import Router, {useRouter} from "next/router";
import Link from "next/link";

export const sortTabsInformation = [
  {
    title: 'جدیدترین',
    query: 'newest'
  },
  {
    title: 'پربازدیدترین',
    query: 'visited'
  },
  {
    title: 'محبوبترین',
    query: 'popular'
  },
  {
    title: 'پرفروش ترین',
    query: 'sell'
  },
  {
    title: 'ارزانترین',
    query: 'cheap'
  },
  {
    title: 'گرانترین',
    query: 'expensive'
  },
  {
    title: 'دارای تخفیف',
    query: 'discount'
  },
]
export default function SortTabs({className, count}) {
  const router = useRouter()

  return (
    <div className={`w-full flex gap-8 h-20 mt-4 mx-auto items-center ${className}`}>
      <div className="flex items-center text-xl gap-2 min-w-[10rem]">
        <BsSortDown className='text-3xl'></BsSortDown>
        مرتب سازی :
      </div>
      <div className="flex gap-9 basis-full">
        {sortTabsInformation.map((sortTab, key) => (
          <Link scroll={false} href={{
            pathname: router.pathname,
            query: {...router.query, order: sortTab.query}
          }} className={`p-2 ${(router.query?.order ?? "newest") === sortTab.query && 'text-cyan'}`} key={key}>{sortTab.title}</Link>
        ))}
      </div>
      <div className="flex gap-2 min-w-[4rem]">
        {count}
        <p>مورد</p>
      </div>
    </div>
  )
}
