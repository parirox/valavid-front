import React,{useState} from "react";
import { BsSortDown } from "react-icons/bs";
import Router, { useRouter } from "next/router";
import Link from "next/link";

export const sortTabsInformation = [
  {
    title: "جدیدترین",
    query: "newest",
  },
  {
    title: "پربازدیدترین",
    query: "visited",
  },
  {
    title: "محبوبترین",
    query: "popular",
  },
  {
    title: "پرفروش ترین",
    query: "sell",
  },
  {
    title: "ارزانترین",
    query: "cheap",
  },
  {
    title: "گرانترین",
    query: "expensive",
  },
  {
    title: "دارای تخفیف",
    query: "discount",
  },
];
export default function SortTabs({ className, count }) {
  const router = useRouter();
  const [showFilters,setShowFilters] = useState(false)

  return (
    <div
      className={`w-full flex gap-8 h-20 mt-4 mx-auto items-center justify-between relative ${className}`}
    >
      <div onClick={()=>setShowFilters(!showFilters)} className="flex items-center text-xl gap-2 min-w-[10rem] cursor-pointer lg:cursor-auto">
        <BsSortDown className="text-3xl"></BsSortDown>
        مرتب سازی :
      </div>
      <div className={`lg:gap-9 basis-full flex flex-col lg:flex-row bg-[#1D2830] lg:bg-transparent text-white absolute lg:relative z-20 top-[6rem] lg:top-0 rounded-[14px] lg:rounded-none border border-accent lg:border-none ${showFilters ? "flex" : "hidden lg:flex"}`}>
        {sortTabsInformation.map((sortTab, key) => (
          <Link
            scroll={false}
            href={{
              pathname: router.pathname,
              query: { ...router.query, order: sortTab.query },
            }}
            className={`px-10 py-4 lg:p-2 ${
              (router.query?.order ?? "newest") === sortTab.query && "text-cyan"
            }`}
            key={key}
          >
            {sortTab.title}
          </Link>
        ))}
      </div>
      <div className="flex gap-2 min-w-[4rem]">
        {count}
        <p>مورد</p>
      </div>
    </div>
  );
}
