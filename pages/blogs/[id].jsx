import Chip from "@/components/Chip";
import blog_api, {
  GetSingleBlog,
  useGetSingleBlogQuery,
} from "@/datasources/blog/remote/BlogSliceApi";
import Head from "next/head";
import Image from "next/image";
import { BsFillPencilFill } from "react-icons/bs";
import { IoCalendarClearOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { wrapper } from "@/datasources/store";
import moment from "jalali-moment";
import styles from "../../styles/blog.module.css";
import Error404 from "../404";

function SingleBlog() {
  const router = useRouter();
  const {
    data: blog,
    isSuccess,
    isError,
  } = useGetSingleBlogQuery(router.query);

  if (isError) {
    <Error404 />;
  }

  if (isSuccess)
    return (
      <div>
        <Head>
          <title>Valavid | {blog.title} </title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="container pb-96 pt-16">
          <div className="max-w-[820px] mx-auto text-start">
            <Image
              src={blog.media.src}
              alt={blog.media.alt}
              className="z-10 w-100 h-[450px] mx-auto rounded-md"
              width={1000}
              height={200}
            ></Image>
            <h3 className="pt-7 text-secondary">{blog.title}</h3>
            <div className="pt-6 flex gap-16">
              <div className="flex gap-2 text-secondary items-center text-lg">
                <BsFillPencilFill
                  className={"text-primary text-lg"}
                ></BsFillPencilFill>
                امید اسلامی
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
            {/* <div className="text-[1.4rem] text-secondary py-8">
            16 فوتیج با کیفیت با موضوع عید نوروز
          </div>
          <p className="leading-9 pb-8 text-secondary-200">

            اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است. سومین
            شهر پرجمعیت ایران پس از تهران و مشهد اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان
            اصفهان و نیز شهرستان اصفهان است. سومین شهر پرجمعیت ایران پس از تهران و مشهد است

            اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است. سومین
            شهر پرجمعیت ایران پس از تهران و مشهد اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان
            اصفهان و نیز شهرستان اصفهان است. سومین شهر پرجمعیت ایران پس از تهران و مشهد است

            اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است. سومین
            شهر پرجمعیت ایران پس از تهران و مشهد اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان
            اصفهان و نیز شهرستان اصفهان است. سومین شهر پرجمعیت ایران پس از تهران و مشهد است

          </p>
          <Image alt={""} src='https://placeimg.com/640/480/nature/11' className="h-64 rounded-[2.75rem]" width={320}
                 height={100}></Image>
          <p className="leading-9 pb-8 pt-12 text-secondary-200">

            اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است. سومین
            شهر پرجمعیت ایران پس از تهران و مشهد اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان
            اصفهان و نیز شهرستان اصفهان است. سومین شهر پرجمعیت ایران پس از تهران و مشهد است

            اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است. سومین
            شهر پرجمعیت ایران پس از تهران و مشهد اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان
            اصفهان و نیز شهرستان اصفهان است. سومین شهر پرجمعیت ایران پس از تهران و مشهد است

            اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان اصفهان و نیز شهرستان اصفهان است. سومین
            شهر پرجمعیت ایران پس از تهران و مشهد اِصفَهان شهری تاریخی و گردشگری در مرکز ایران است. این شهر مرکز استان
            اصفهان و نیز شهرستان اصفهان است. سومین شهر پرجمعیت ایران پس از تهران و مشهد است

          </p> */}
            {
              <div
                className={styles.blog}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            }
            <div className="flex pt-8 pb-16 gap-6 items-center text-lg text-secondary">
              کلید واژه ها:
              {blog.tags.map((tag, index) => (
                <React.Fragment key={index}>
                  <Chip
                    className="bg-gray text-white rounded-2xl text-sm"
                    content={tag}
                  ></Chip>
                </React.Fragment>
              ))}
            </div>
            <p className="pb-8 pt-12 text-secondary-200">مشابه</p>
            <div className="flex flex-wrap gap-8">
              {[1, 2, 3].map((item, k) => (
                <div
                  key={k}
                  className="w-[calc(33.32%_-_1.34rem)] bg-white rounded-2xl shadow-md"
                >
                  <div className="w-100 h-52 relative">
                    <Image
                      alt={""}
                      src="https://placeimg.com/640/480/nature/11"
                      className="z-10 rounded-t-2xl"
                      fill
                      sizes="33vw"
                    ></Image>
                    <div className="flex absolute bottom-4 right-4 gap-1">
                      <Chip
                        className="bg-[#00101C] text-white rounded-2xl text-xs"
                        content="تصویربرداری"
                      ></Chip>
                      <Chip
                        className="bg-[#00101C] text-white rounded-2xl text-xs"
                        content="گردشگری"
                      ></Chip>
                    </div>
                  </div>
                  <div className="pt-4 flex gap-16 px-4">
                    <div className="flex gap-2 text-sm items-center text-secondary-300">
                      <BsFillPencilFill className={""}></BsFillPencilFill>
                      امید اسلامی
                    </div>
                    <div className="flex gap-1 text-sm text-secondary-300">
                      <IoCalendarClearOutline
                        className={"text-base"}
                      ></IoCalendarClearOutline>
                      1402/3/23
                    </div>
                  </div>
                  <h4 className="text-black px-4 pt-4 pb-11">
                    نقش جهان اصفهان
                  </h4>
                </div>
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
    store.dispatch(GetSingleBlog.initiate(context.params));
    await Promise.all(store.dispatch(blog_api.util.getRunningQueriesThunk()));
    return {
      props: {},
    };
  }
);

export default SingleBlog;
