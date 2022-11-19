import React from 'react'
import { BsSortDown } from 'react-icons/bs'
export const videoCount = 124
export const sortTabsInformation = [
  {
    title: 'جدیدترین',
    query: ''
  },
  {
    title: 'پربازدیدترین',
    query: ''
  },
  {
    title: 'محبوبترین',
    query: ''
  },
  {
    title: 'پرفروش ترین',
    query: ''
  },
  {
    title: 'ارزانترین',
    query: ''
  },
  {
    title: 'گرانترین',
    query: ''
  },
]
export default function SortTabs() {
  return (
    <div className='w-full flex gap-8  h-20 mt-4 px-4 mx-auto border-b border-solid border-secondary-100 items-center'>
      <div className="flex items-center text-xl gap-2 min-w-[10rem]">
        <BsSortDown className='text-3xl'></BsSortDown>
        مرتب سازی :
      </div>
      <div className="flex gap-9 basis-full">
        {sortTabsInformation.map((sortTab, key) => (
          <button className="p-2" key={key}>{sortTab.title}</button>
        ))}
      </div>
      <div className="flex gap-2 min-w-[4rem]">
        {videoCount}
        <p>مورد</p>
      </div>
    </div>
  )
}
