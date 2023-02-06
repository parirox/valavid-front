import BlogBox from "@/components/BlogBox";
import MenuBlogs from "@/components/MenuBlogs";
import blog_api, {
  GetBlogCategories,
  GetBlogData,
  useAddMembershipMutation,
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

function BlogList() {
  const [membershipEmail, setMembershipEmail] = useState("");
  const {
    data: blogCategories,
    isSuccess: CategoriesSuccess,
    isError: CategoriesError,
  } = useGetBlogCategoriesQuery();
  const [getBlogData, { data: blogsData, isSuccess, isError }] =
    useGetBlogDataMutation();
  const [addMembership] = useAddMembershipMutation();

  const handleAddMemberShip = () => {
    if (membershipEmail) {
      addMembership({
        email: membershipEmail,
      })
        .unwrap()
        .then((res) => {
          _toast.success("درخواست شما با موفقیت انجام شد.");
        })
        .catch((err) => {
          handleApiError(err);
        });
    } else {
      _toast.error("لطفا ایمیل خود را وارد کنید.");
    }
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
            <div className="relative mb-8 rounded-[1.6rem] h-[4.3rem] border border-secondary-100">
              <input
                type="email"
                placeholder="ایمیل شما"
                className="input w-full pr-10 py-3 text-secondary flex justify-center items-center h-full"
                value={membershipEmail}
                onChange={(e) => setMembershipEmail(e.target.value)}
              />
              <button
                onClick={() => handleAddMemberShip()}
                className="bg-secondary-300 absolute left-1 top-0 h-[3.7rem] rounded-[1.6rem] w-[4.2rem] m-auto bottom-0 px-2 text-center"
              >
                عضویت
              </button>
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
