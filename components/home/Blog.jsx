import React from 'react';
import BlogCard from '@/components/BlogCard';
import SectionTitleDivider from '../SectionTitleDivider';
import Button from '@/components/Button';

const Blog = ({data}) => {
  return (
    <div className="pb-44">
      <SectionTitleDivider title="بلاگ"></SectionTitleDivider>
      <div className="flex gap-8 container">
        <div className="flex flex-wrap basis-1/3 gap-8">
          {data[4] && <BlogCard className="h-[24rem] w-full" data={data[4]}></BlogCard>}
          {data[2] && <BlogCard className="h-[28rem] w-full" data={data[2]}></BlogCard>}
        </div>
        <div className="flex flex-wrap basis-2/3 gap-8">
          {data[0] && <BlogCard className="h-[28rem] w-full" data={data[0]}></BlogCard>}
          <div className="flex gap-11 w-full">
            {data[1] && <BlogCard className="h-[24rem] basis-1/2" data={data[1]}></BlogCard>}
            {data[3] && <BlogCard className="h-[24rem] basis-1/2" data={data[3]}></BlogCard>}
          </div>
        </div>
      </div>
      <Button
        className={"h-[4.6rem] w-52 rounded-3xl btn-circle mx-auto flex mt-20 text-[1.5rem] font-light btn-ghost"}
        link={"/blog"}
      >
        بیشتر
      </Button>
    </div>
  );
}

export default Blog;
