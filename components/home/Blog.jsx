import React from 'react';
import BlogCard from '@/components/BlogCard';
import SectionTitleDivider from '../SectionTitleDivider';
import Button from '@/components/Button';

const Blog = ({data}) => {
  return (
    <div className="pb-44 px-6 md:px-0">
      <SectionTitleDivider title="بلاگ"></SectionTitleDivider>
      <div className="grid sm:flex xl:grid grid-cols-1 xl:grid-cols-3 xl:grid-rows-5 gap-8 xl:container ltr xl:h-[56rem] h-[130rem] sm:h-[400px] overflow-auto hide-scrollbar">
        <BlogCard className={`xl:col-span-2 xl:row-span-3 min-w-[350px]`} data={data[0]}></BlogCard>
        <BlogCard className={`xl:col-span-1 xl:row-span-2 min-w-[350px]`} data={data[1]}></BlogCard>
        <BlogCard className={`xl:col-span-1 xl:row-span-3 min-w-[350px]`} data={data[4]}></BlogCard>
        <BlogCard className={`xl:col-span-1 xl:row-span-2 min-w-[350px]`} data={data[2]}></BlogCard>
        <BlogCard className={`xl:col-span-1 xl:row-span-2 min-w-[350px]`} data={data[3]}></BlogCard>
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
