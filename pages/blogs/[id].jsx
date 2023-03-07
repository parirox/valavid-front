import Chip from "@/components/Chip";
import blog_api, {GetSingleBlog, useGetSingleBlogQuery,} from "@/datasources/blog/remote/BlogSliceApi";
import Head from "next/head";
import Image from "next/image";
import {BsFillPencilFill} from "react-icons/bs";
import {IoCalendarClearOutline} from "react-icons/io5";
import {useRouter} from "next/router";
import {wrapper} from "@/datasources/store";
import moment from "jalali-moment";
import styles from "@/styles/blog.module.css";
import Link from "next/link";
import ErrorPage from "../ErrorPage";
import {Fragment} from "react";

function SingleBlog() {
  const router = useRouter();
  const {
    data: blog,
    isSuccess,
    isError,
    error,
  } = useGetSingleBlogQuery(router.query);

  if (isError) return <ErrorPage info={error}/>;

  if (isSuccess)
    return (
      <div>
        <Head>
          <title>Valavid | {blog?.title} </title>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </Head>
        <div className="container pb-96 pt-16">
          <div className="max-w-[820px] mx-auto text-start">
            <Image
              src={blog.media.src}
              alt={blog.media.alt}
              className="z-10 w-100 h-[350px] sm:h-[450px] mx-auto rounded-md"
              width={1000}
              height={200}
            ></Image>
            <h3 className="pt-7 text-secondary">{blog.title}</h3>
            <div className="pt-6 flex gap-16">
              <div className="flex gap-2 text-secondary items-center text-lg">
                <BsFillPencilFill
                  className={"text-primary text-lg"}
                ></BsFillPencilFill>
                {blog.author}
              </div>
              <div className="flex gap-1 text-lg text-primary">
                <IoCalendarClearOutline
                  className={"text-primary text-xl"}
                ></IoCalendarClearOutline>
                {moment(blog.date, "YYYY/MM/DD")
                  .locale("fa")
                  .format("YYYY/MM/DD")}
              </div>
            </div>
            <p className="py-10 border-b border-secondary-300 text-start text-lg leading-9 text-secondary-200">
              {blog.title}
            </p>
            {
              <div
                className={styles.blog}
                dangerouslySetInnerHTML={{__html: blog.content}}
              />
            }
            <div className="flex pt-8 pb-16 gap-6 items-center text-lg text-secondary flex-wrap whitespace-nowrap">
              کلید واژه ها:
              {blog.tags.map((tag, index) => (
                <Fragment key={index}>
                  <Chip
                    href={`/blogs/?tag=${tag.title}`}
                    className="bg-gray text-white rounded-2xl text-sm"
                    content={tag.title}
                  ></Chip>
                </Fragment>
              ))}
            </div>
            <p className="pb-8 pt-12 text-secondary-200">مشابه</p>
            <div className="flex gap-8 overflow-auto hide-scrollbar">
              {blog.similar.map((item, k) => (
                <Link
                href={`/blogs/${item.id}`}
                  key={k}
                  className="w-[calc(33.32%_-_1.34rem)] bg-white rounded-2xl shadow-md min-w-[250px]"
                >
                  <div className="w-100 h-52 relative overflow-hidden">
                    <Image
                      alt={item.media.alt}
                      src={item.media.src}
                      className="z-10 rounded-t-2xl"
                      fill
                      sizes="33vw"
                    />
                    <div className="flex absolute z-30 bottom-4 right-4 gap-1">
                      {item.tags.slice(0, 3).map((tag, k) => (
                        <Link key={k}
                              className={"btn min-h-0 border-none rounded-full flex items-center gap-3 px-4 py-2 bg-[#00101C] text-white rounded-2xl text-xs"}
                              href={`/blogs/?tag=${tag.title}`}>
                          {tag.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 flex gap-16 px-4">
                    <div className="flex gap-2 text-sm items-center text-secondary-300">
                      <BsFillPencilFill/>
                      {blog.author}
                    </div>
                    <div className="flex gap-1 text-sm text-secondary-300">
                      <IoCalendarClearOutline
                        className={"text-base"}
                      ></IoCalendarClearOutline>
                      {moment(item.date, "YYYY/MM/DD").locale("fa").format("YYYY/MM/DD")}
                    </div>
                  </div>
                  <h4 className="text-black px-4 pt-4 pb-11 text-xl lg:text-2xl leading-10">
                    {item.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}

SingleBlog.styleMode = "blog";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    console.log(context.params)
    store.dispatch(GetSingleBlog.initiate(context.params));
    await Promise.all(store.dispatch(blog_api.util.getRunningQueriesThunk()));
    return {
      props: {},
    };
  }
);

export default SingleBlog;
