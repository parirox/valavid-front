import BlogBox from "@/components/BlogBox";
import MenuBlogs from "@/components/MenuBlogs";
import blog_api, {
  GetBlogCategories,
  GetBlogData,
  useGetBlogCategoriesQuery,
  useGetBlogDataMutation,
} from "@/datasources/blog/remote/BlogSliceApi";
import Head from "next/head";
import Link from "next/link";
import Error404 from "../404";
import { wrapper } from "@/datasources/store";
import { useEffect } from "react";
import { useState } from "react";
import _toast from "@/utils/notification/toast";
import { handleApiError } from "@/datasources/errorHandler";
import { IoMailOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSubmitNewsletterMutation } from "@/datasources/pages/remote/PageSliceApi";
import toast from "@/utils/notification/toast";

function BlogList() {
  const [membershipEmail, setMembershipEmail] = useState("");
  const {
    data: blogCategories,
    isSuccess: CategoriesSuccess,
    isError: CategoriesError,
  } = useGetBlogCategoriesQuery();
  const [getBlogData, { data: blogsData, isSuccess, isError }] =
    useGetBlogDataMutation();

  const [submitNewsletter] = useSubmitNewsletterMutation();
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required("ایمیل را وارد کنید")
      .email("ایمیل معتبر نمی باشد."),
  });
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data) => {
    let isValid = await trigger(["email"]);
    if (!isValid) {
      _toast.error(errors.email.message);
      return;
    }
    submitNewsletter(data)
      .unwrap()
      .then((data) => {
        toast.success("با موفقیت ثبت نام شدید!");
        reset();
      })
      .catch((e) => {
        handleApiError(e);
      });
  };

  useEffect(() => {
    getBlogData();
  }, []);

  if (isError) return <Error404 />;

  if (isSuccess)
    return (
      <>
        <Head>
          <title>Valavid | Blog list</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="container flex gap-16 pt-16 pb-80">
          <div className="basis-1/3">
            <div className="col-span-3 flex flex-col gap-3 items-end text-right">
              <span className="text-2xl text-secondary block w-full">
                اشتراک خبرنامه
              </span>
              <div className="form-control w-full">
                <label className="block label mb-7">
                  <span className="text-[#90999F] text-lg">
                    عضو خبرنامه ما شوید و از تازه ترین خبرها به روز رسانی‌ها و
                    تخفیف های ویژه سایت با خبر شوید
                  </span>
                </label>
                <div className="relative mb-8 rounded-[1.6rem] h-[4.3rem] border border-secondary-100">
                  <div className="absolute right-0 top-0 bottom-0 flex justify-center items-center px-3">
                    <IoMailOutline className="text-2xl text-[#90999F]" />
                  </div>
                  <input
                    {...register("email")}
                    type="text"
                    placeholder="ایمیل شما"
                    className="input w-full pr-10 py-3 text-secondary flex justify-center items-center h-full"
                  />
                  <button
                    onClick={handleSubmit(onSubmit)}
                    className="bg-secondary-300 absolute left-1 top-0 h-[3.7rem] rounded-[1.6rem] w-[4.2rem] m-auto bottom-0 px-2 text-center"
                  >
                    عضویت
                  </button>
                </div>
              </div>
            </div>

            {blogCategories && (
              <MenuBlogs
                getBlogData={getBlogData}
                menuBlogsData={blogCategories}
              ></MenuBlogs>
            )}
          </div>
          <div className="basis-2/3">
            <Link href={`/blogs/${blogsData.results[0].id}`}>
              <BlogBox
                className="mb-5"
                row
                title={blogsData.results[0].title}
                description={blogsData.results[0].description}
                tags={blogsData.results[0].tags || []}
                image={blogsData.results[0].media}
                date={blogsData.results[0].date}
              ></BlogBox>
            </Link>
            <div className="flex gap-5 w-100">
              <div className="w-100 basis-1/2">
                {blogsData.results.map((blog, index) => (
                  <Link href={`/blogs/${blog.id}`} key={blog + index}>
                    {index % 2 != 0 && index != 0 ? (
                      <BlogBox
                        className={"mb-5"}
                        row={false}
                        title={blog.title}
                        description={blog.description}
                        tags={blog.tags || []}
                        image={blog.media}
                        date={blog.date}
                      ></BlogBox>
                    ) : (
                      ""
                    )}
                  </Link>
                ))}
              </div>
              <div className="w-100 basis-1/2">
                {blogsData.results.map((blog, index) => (
                  <Link href={`/blogs/${blog.id}`} key={blog + index}>
                    {index % 2 == 0 && index != 0 ? (
                      <BlogBox
                        className={"mb-5"}
                        row={false}
                        title={blog.title}
                        description={blog.description}
                        tags={blog.tags || []}
                        image={blog.media}
                        date={blog.date}
                      ></BlogBox>
                    ) : (
                      ""
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

BlogList.styleMode = "blog";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(GetBlogData.initiate());
    store.dispatch(GetBlogCategories.initiate());
    await Promise.all(store.dispatch(blog_api.util.getRunningQueriesThunk()));
    return {
      props: {
        protected: true,
      },
    };
  }
);

export default BlogList;
