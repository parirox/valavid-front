import React from 'react';
import BlogCard from '@/components/BlogCard';
import SectionTitleDivider from '../SectionTitleDivider';
import Button from '@/components/Button';

export const data = [
    {
        title: 'اصفهان را بهتر بشناسیم',
        description: 'اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است. سومین شهر پرجمعیت ایران پس از تهران و مشهد است',
        date: '2022-12-167T15:24:17.604594',
        media: {
            src: 'https://mestergraph.com/uploads/pictures/gardeshgariii/irannn/master_groph_22-7_40.jpg',
            alt: "isfahan"
        }
    },
    {
        title: 'اصفهان را بهتر بشناسیم',
        description: 'اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است. سومین شهر پرجمعیت ایران پس از تهران و مشهد است',
        date: '2022-12-167T15:24:17.604594',
        media: {
            src: 'https://images.kojaro.com/2021/5/64f16bc0-176c-41eb-91e3-b7a4d92be8ea.jpg',
            alt: "isfahan"
        }
    },
    {
        title: 'اصفهان را بهتر بشناسیم',
        description: 'اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است. سومین شهر پرجمعیت ایران پس از تهران و مشهد است',
        date: '2022-12-17T15:24:17.604594',
        media: {
            src: 'https://mestergraph.com/uploads/pictures/gardeshgariii/irannn/master_groph_22-7_40.jpg',
            alt: "isfahan"
        }
    },
    {
        title: 'اصفهان را بهتر بشناسیم',
        description: 'اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است. سومین شهر پرجمعیت ایران پس از تهران و مشهد است',
        date: '2022-12-17T15:24:17.604594',
        media: {
            src: 'https://mestergraph.com/uploads/pictures/gardeshgariii/irannn/master_groph_22-7_40.jpg',
            alt: "isfahan"
        }
    },
    {
        title: 'اصفهان را بهتر بشناسیم',
        description: 'اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است. سومین شهر پرجمعیت ایران پس از تهران و مشهد است',
        date: '2022-12-17T15:24:17.604594',
        media: {
            src: 'https://images.kojaro.com/2021/5/64f16bc0-176c-41eb-91e3-b7a4d92be8ea.jpg',
            alt: "isfahan"
        }
    },
]
const Blog = () => {
    return (
        <div className="pb-44">
            <SectionTitleDivider title="بلاگ"></SectionTitleDivider>
            <div className="flex gap-8 container">
                <div className="flex flex-wrap basis-1/3 gap-8">
                    <BlogCard className="h-[24rem] w-full" data={data[4]}></BlogCard>
                    <BlogCard className="h-[28rem] w-full" data={data[2]}></BlogCard>
                </div>
                <div className="flex flex-wrap basis-2/3 gap-8">
                    <BlogCard className="h-[28rem] w-full" data={data[0]}></BlogCard>
                    <div className="flex gap-11 w-full">
                        <BlogCard className="h-[24rem] basis-1/2" data={data[1]}></BlogCard>
                        <BlogCard className="h-[24rem] basis-1/2" data={data[3]}></BlogCard>
                    </div>
                </div>
            </div>
            <Button
                className={"h-[4.6rem] w-52 rounded-3xl btn-circle mx-auto flex mt-20 text-[1.5rem] font-light btn-ghost"}
                link={"/auth"}
            >
                بیشتر
            </Button>
        </div>
    );
}

export default Blog;
