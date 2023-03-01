import React, {Fragment} from 'react'
import {BsSortDown} from 'react-icons/bs'
import Router, {useRouter} from "next/router";
import Link from "next/link";
import {Menu, Transition} from "@headlessui/react";
import classNames from "classnames";
import {IoCheckmark} from "react-icons/io5";
import {CheckIcon} from "@heroicons/react/20/solid";

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
    <div
      className={classNames(`w-full flex gap-8 h-20 mt-4 mx-auto items-center lg:justify-between justify-end relative ${className}`)}>
      <div className="flex items-center text-xl gap-2 min-w-[10rem] hidden">
        <BsSortDown className='text-3xl'></BsSortDown>
        مرتب سازی :
      </div>
      <div className="xl:flex gap-9 basis-full hidden">
        {sortTabsInformation.map((sortTab, key) => (
          <Link scroll={false} href={{
            pathname: router.pathname,
            query: {...router.query, order: sortTab.query}
          }} className={`p-2 ${(router.query?.order ?? "newest") === sortTab.query && 'text-cyan'}`}
                key={key}>{sortTab.title}</Link>
        ))}
      </div>

      <Menu className={"block xl:hidden relative"} as={"div"}>
        <Menu.Button className={"btn h-14 rounded-2xl text-xl font-light bg-secondary-400"}>
          <BsSortDown className='text-3xl'></BsSortDown>
          <span>{router.query?.order ? sortTabsInformation.find(item => item.query === router.query.order)?.title : "مرتب سازی"}</span>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items
            className="absolute left-0 lg:left-auto lg:right-0 z-[70] mt-2 w-56 origin-top-right divide-y divide-accent rounded-md backdrop-blur bg-accent/90 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {sortTabsInformation.map((sortTab, key) => (
              <Menu.Item key={key}>
                  <Link scroll={false} href={{
                    pathname: router.pathname,
                    query: {...router.query, order: sortTab.query}
                  }} className={classNames("p-2 group flex justify-between w-full items-center rounded-md px-3 py-3 text-base text-color6", {'text-white bg-primary': (router.query?.order ?? "newest") === sortTab.query})} key={key}>
                    <span>{sortTab.title}</span>
                    {sortTab.query === router.query?.order &&
                        <CheckIcon
                            className="h-5 w-5 text-amber-600"
                            aria-hidden="true"
                          />
                    }
                  </Link>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
      <div className="hidden lg:flex gap-2 min-w-[4rem]">
        {count}
        <p>مورد</p>
      </div>
    </div>
  )
}
