import BlogBox from "@/components/BlogBox"
import MenuBlogs from "@/components/MenuBlogs";
import Head from "next/head"
import Link from "next/link";

const blogsData = [
  {
    title: 'نقش جهان اصفهان',
    description: 'اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است این شهر مرکز استان اصفهان و نیز شهرستان اصفهان استاین شهر مرکز استان اصفهان و نیز شهرستان اصفهان است',
    tags: ['نصف جهان'],
    image: 'https://placeimg.com/640/480/nature/6',
    date: '1400/03/08'
  },
  {
    title: 'نقش جهان اصفهان',
    description: 'اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است این شهر مرکز استان اصفهان و نیز شهرستان اصفهان استاین شهر مرکز استان اصفهان و نیز شهرستان اصفهان است',
    tags: ['اصفهان'],
    image: 'https://placeimg.com/640/480/nature/7',
    date: '1400/03/08'
  },
  {
    title: 'نقش جهان اصفهان',
    description: 'اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است این شهر مرکز استان اصفهان و نیز شهرستان اصفهان استاین شهر مرکز استان اصفهان و نیز شهرستان اصفهان است',
    tags: ['اصفهان'],
    image: 'https://placeimg.com/640/480/nature/8',
    date: '1400/03/08'
  },
  {
    title: 'نقش جهان اصفهان',
    description: 'اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است این شهر مرکز استان اصفهان و نیز شهرستان اصفهان استاین شهر مرکز استان اصفهان و نیز شهرستان اصفهان است',
    tags: ['اصفهان'],
    image: 'https://placeimg.com/640/480/nature/9',
    date: '1400/03/08'
  },
]
const menuBlogsData = [
  {
    count: 56,
    title: 'ایران',
    id: 1,
    children: [
      {
        title: 'اقوام',
        id: 2,
      },
      {
        title: 'آداب و رسوم',
        id: 3,
      },
    ]
  },
  {
    count: 56,
    title: 'ایران',
    id: 1,
    children: []
  },
  {
    count: 56,
    title: 'ایران',
    id: 1,
    children: []
  },
  {
    count: 56,
    title: 'ایران',
    id: 1,
    children: [
      {
        title: 'غذاها',
        id: 10
      }
    ]
  },
  {
    count: 56,
    title: 'ایران',
    id: 1,
    children: []
  },
]

function BlogList() {
  return (
    <>
      <Head>
        <title>Valavid | Blog list</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container flex gap-16 pt-16 pb-80">
        <div className="basis-1/3">
          <div className="relative mb-8 rounded-[1.6rem] h-[4.3rem] border border-secondary-100">
            <input type="text" placeholder="ایمیل شما" className="input w-full pr-10 py-3 text-secondary flex justify-center items-center h-full" />
            <button className="bg-secondary-300 absolute left-1 top-0 h-[3.7rem] rounded-[1.6rem] w-[4.2rem] m-auto bottom-0 px-2 text-center">عضویت</button>
          </div>
          <MenuBlogs menuBlogsData={menuBlogsData}></MenuBlogs>
        </div>
        <div className="basis-2/3">
          <Link href={`/blog/${blogsData[0].title}`}>
            <BlogBox className="mb-5" row title={blogsData[0].title} description={blogsData[0].description} tags={blogsData[0].tags} image={blogsData[0].image} date={blogsData[0].date}></BlogBox>
          </Link>
          <div className="flex gap-5 w-100">
            <div className="w-100 basis-1/2">
              {
                blogsData.map((blog, index) => (
                  <Link href={`/blog/${blog.title}`} key={blog + index}>
                    {
                      index % 2 != 0 && index != 0 ? <BlogBox className={'mb-5'} row={false} title={blog.title} description={blog.description} tags={blog.tags} image={blog.image} date={blog.date}></BlogBox> : ''
                    }
                  </Link>
                ))
              }
            </div>
            <div className="w-100 basis-1/2">
              {
                blogsData.map((blog, index) => (
                  <Link href={`/blog/${blog.title}`} key={blog + index}>
                    {
                      index % 2 == 0 && index != 0 ? <BlogBox className={'mb-5'} row={false} title={blog.title} description={blog.description} tags={blog.tags} image={blog.image} date={blog.date}></BlogBox> : ''
                    }
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

BlogList.styleMode = "blog";

export default BlogList;