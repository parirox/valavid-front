import React from 'react';
import BlogCard from '@/components/BlogCard';
import SectionTitleDivider from '../SectionTitleDivider';
import Button from '@/components/Button';

const Blog = ({data}) => {
  return (
    <div className="pb-44">
      <SectionTitleDivider title="بلاگ"></SectionTitleDivider>
      <div className="grid grid-cols-3 grid-rows-5 gap-8 container ltr h-[56rem]">
        <BlogCard className={`col-span-2 row-span-3`} data={data[0]}></BlogCard>
        <BlogCard className={`col-span-1 row-span-2`} data={data[1]}></BlogCard>
        <BlogCard className={`col-span-1 row-span-3`} data={data[4]}></BlogCard>
        <BlogCard className={`col-span-1 row-span-2`} data={data[2]}></BlogCard>
        <BlogCard className={`col-span-1 row-span-2`} data={data[3]}></BlogCard>
      </div>
      <Button
        className={"h-[4.6rem] w-52 rounded-3xl btn-circle mx-auto flex mt-20 text-[1.5rem] font-light btn-ghost"}
        link={"/blogs"}
      >
        بیشتر
      </Button>
    </div>
  );
}

export default Blog;
