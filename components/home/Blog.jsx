import React from 'react';
import BlogCard from '@/components/BlogCard';
import SectionTitleDivider from '../SectionTitleDivider';
export const blogCardData = [
    {
        title: 'اصفهان را بهتر بشناسیم',
        description: 'اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است. سومین شهر پرجمعیت ایران پس از تهران و مشهد است',
        date: '21/2/1400',
        backgroundImage: 'https://mestergraph.com/uploads/pictures/gardeshgariii/irannn/master_groph_22-7_40.jpg'
    },
    {
        title: 'اصفهان را بهتر بشناسیم',
        description: 'اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است. سومین شهر پرجمعیت ایران پس از تهران و مشهد است',
        date: '21/2/1400',
        backgroundImage: 'https://images.kojaro.com/2021/5/64f16bc0-176c-41eb-91e3-b7a4d92be8ea.jpg'
    },
    {
        title: 'اصفهان را بهتر بشناسیم',
        description: 'اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است. سومین شهر پرجمعیت ایران پس از تهران و مشهد است',
        date: '21/2/1400',
        backgroundImage: 'https://mestergraph.com/uploads/pictures/gardeshgariii/irannn/master_groph_22-7_40.jpg'
    },
    {
        title: 'اصفهان را بهتر بشناسیم',
        description: 'اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است. سومین شهر پرجمعیت ایران پس از تهران و مشهد است',
        date: '21/2/1400',
        backgroundImage: 'https://mestergraph.com/uploads/pictures/gardeshgariii/irannn/master_groph_22-7_40.jpg'
    },
    {
        title: 'اصفهان را بهتر بشناسیم',
        description: 'اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است. سومین شهر پرجمعیت ایران پس از تهران و مشهد است',
        date: '21/2/1400',
        backgroundImage: 'https://images.kojaro.com/2021/5/64f16bc0-176c-41eb-91e3-b7a4d92be8ea.jpg'
    },
]
const Blog = () => {
    return (
        <>
            <SectionTitleDivider title="بلاگ"></SectionTitleDivider>
            <div className="flex gap-11 container">
                <div className="flex flex-wrap basis-1/3 gap-11">
                    <BlogCard className="h-[30rem] w-full" data={blogCardData[4]}></BlogCard>
                    <BlogCard className="h-[40rem] w-full" data={blogCardData[2]}></BlogCard>
                </div>
                <div className="flex flex-wrap basis-2/3 gap-11">
                    <BlogCard className="h-[40rem] w-full" data={blogCardData[0]}></BlogCard>
                    <div className="flex gap-11 w-full">
                        <BlogCard className="h-[30rem] basis-1/2" data={blogCardData[1]}></BlogCard>
                        <BlogCard className="h-[30rem] basis-1/2" data={blogCardData[3]}></BlogCard>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Blog;
