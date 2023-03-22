import CoverPage from "@/components/CoverPage";
import SortTabs from "@/components/SortTabs";
import PicMountain from "@/public/images/astara_mountain.jpg";
import Head from "next/head";
import React, {useDeferredValue, useEffect, useMemo, useState} from "react";
import product_api, {
    GetProductListFilter,
    GetProductListScroll,
    useGetProductListFilterQuery,
    useGetProductListScrollQuery,
} from "@/datasources/product/remote/ProductSliceApi";
import {wrapper} from "@/datasources/store";
import {useRouter} from "next/router";
import {IoClose, IoVideocam} from "react-icons/io5";
import {TiFilter} from "react-icons/ti";
import Pagination from "@/components/Pagination";
import InfiniteList from "@/components/InfiniteList";
import {isEmpty} from "@/utils/general";
import dynamic from "next/dynamic";
import ManageCollectionDialog from "@/components/ManageCollectionDialog";
import VideoFilter from "@/components/products/filter/VideoFilter";
import ImageFilter from "@/components/products/filter/ImageFilter";
import MainProductCard from "@/components/MainProductCard";
import ErrorPage from "../../ErrorPage";
import NoContent from "@/components/NoContent";
import classNames from "classnames";
import ButtonIcon from "@/components/ButtonIcon";
import {getCurrentBreakpoint} from "@/utils/tailwind/breakpoint";
import Button from "@/components/Button";
import {parse} from "next-useragent";
import {makeTitleWith} from "@/utils/seo/meta";

const VideoCardLoader = dynamic(
  import("@/components/skelton/VideoCardLoader"),
  { ssr: false }
);

function Products({ query, agent }) {
  const router = useRouter();
  const firstPage = useMemo(() => query.page, []);
  const [page, setPage] = useState(parseInt(query.page));

  const { data, isFetching, isSuccess, isLoading,refetch, isError, error } =
    useGetProductListScrollQuery({ query: { ...query, page: page } });

  const {
    data: filterOptions,
    isSuccess: filterIsSuccess,
    isLoading: filterIsLoading,
  } = useGetProductListFilterQuery({ query: { type: query.type } });

  const [filterChanged, setFilterChanged] = useState(false);
  const [filterState, setFilterState] = useState(agent?.isDesktop ?? true);
  const [formData, setFormData] = useState({
    price: [],
    resolution: [],
    frame_rate: [],
    video_time: [],
    environment: [],
    color_theme: [],
    colors: [],
    people_count: [],
    gender: [],
    camera_angle: [],
    orientation: [],
    aspect_ratio: [],
    country: {},
    province: {},
    city: {},
    shutter_speed: [],
  });
  const deferredQuery = useDeferredValue(formData);
  const filter_watcher = useMemo(
    () =>
      JSON.stringify({
        ...Object.fromEntries(
          Object.entries(deferredQuery).filter((v) => !isEmpty(v[1]))
        ),
      }),
    [deferredQuery]
  );

  const setFormDataHandler = (field) => (value) => {
    if (!filterChanged) setFilterChanged(true);
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  useEffect(() => {
    if (router.isReady) {
      const server_page = query.page;
      const client_page = parseInt(router.query?.page ?? 1);
      if (client_page !== server_page) {
        setPage(client_page);
      }
    }
  }, [isFetching, isSuccess, isLoading, isError, router.query]);

  useEffect(() => {
    if (filterChanged && !isFetching) {
      const { order, type } = query;
      let newQuery = { ...deferredQuery, type, page: 1 };
      if (!isEmpty(order)) {
        newQuery.order = order;
      }
      const removedEmptyObject = Object.fromEntries(
        Object.entries(newQuery).filter((v) => !isEmpty(v[1]))
      );
      setPage(1);
      router.replace(
        {
          pathname: router.pathname,
          query: { ...removedEmptyObject, page: 1 },
        },
        undefined,
        { scroll: false }
      );
    }
  }, [filter_watcher, filterChanged, isFetching]);

  useEffect(() => {
    if (["xs", "sm", "md"].includes(getCurrentBreakpoint())) {
      setFilterState(false);
    }
  }, [getCurrentBreakpoint()]);

  const changePositionState = () => {
    setFilterState(!filterState);
  };

  if (isError) {
    if (isEmpty(data)) return <ErrorPage info={error} />;
    // toast.error(error)
  }

  const loaderCount = () => {
    const currentBreakpoint = getCurrentBreakpoint();
    if (["xl", "2xl"].includes(currentBreakpoint) && filterState) return 3;
    if (["xl", "2xl"].includes(currentBreakpoint) && !filterState) return 4;
    if (currentBreakpoint === "lg" && filterState) return 2;
    if (currentBreakpoint === "lg" && !filterState) return 3;
    if (currentBreakpoint === "md") return 2;
    return 1;
  };

  return (
    <>
      <Head>
        <title>{makeTitleWith("لیست محصولات")}</title>
      </Head>
      <CoverPage
        className="bg-gradient-to-l from-[#13222db3] via-[#14232f59] to-[#13222db3]"
        description={
          "با خرید فیلم های با کیفیت بالا توسط هنرمندانی از سراسر ایران، در زمان و هزینه خود صرفه جویی کنید."
        }
        backgroundImage={PicMountain}
        icon={<IoVideocam className={"text-primary text-4xl"} />}
      >
        فوتیج هایی به وسعت ایران
      </CoverPage>
      <ManageCollectionDialog />
      <div className="relative flex w-full items-start">
        <div
          onClick={changePositionState}
          className={classNames(
            "fixed lg:hidden inset-0 backdrop-blur bg-color7/80 transition-400-linear",
            {
              "height-0 opacity-0 hidden": !filterState,
              "height-auto opacity-1 z-[70]": filterState,
            }
          )}
        ></div>
        <aside
          className={classNames(
            "bg-white lg:bg-secondary-light lg:text-white text-color7 py-6 h-auto lg:h-screen inset-3 z-[80] lg:z-30 lg:sticky lg:m-0 lg:rounded-none rounded-3xl animate-in zoom-in-95",
            {
              "xl:basis-1/4 basis-4/12 fixed": filterState,
              "hidden lg:block": !filterState,
            }
          )}
        >
          <div className="h-full overflow-auto scrollbar-thin scrollbar-w-1 scrollbar-thumb-accent">
            <div
              className={
                "flex justify-between items-center gap-5 block lg:hidden px-10 pb-5 bg-white sticky top-0 z-50"
              }
            >
              <span className={"flex-auto"}>فیلتر ها</span>
              <Button
                className={"btn-primary flex-basis py-4 px-7"}
                onClick={changePositionState}
              >
                اعمال فیلتر
              </Button>
              <IoClose
                className={"text-2xl cursor-pointer"}
                onClick={changePositionState}
              />
            </div>

            <div
              className={classNames(
                "flex flex-col gap-14 pt-5 lg:pt-24 transition-all",
                {
                  "w-full px-10 lg:px-7": filterState,
                  "w-0": !filterState,
                }
              )}
            >
              {filterIsSuccess &&
                !filterIsLoading &&
                query.type === "video" && (
                  <VideoFilter
                    filterOptions={filterOptions}
                    setFormDataHandler={setFormDataHandler}
                    formData={formData}
                  />
                )}
              {filterIsSuccess &&
                !filterIsLoading &&
                query.type === "image" && (
                  <ImageFilter
                    filterOptions={filterOptions}
                    setFormDataHandler={setFormDataHandler}
                    formData={formData}
                  />
                )}
            </div>
          </div>
        </aside>
        <div className="basis-full overflow-hidden sm:px-10 px-5 transition-all pb-[10rem]">
          <div>
            <ButtonIcon
              onClick={changePositionState}
              className={classNames(
                "h-14 w-40 rounded-2xl text-xl font-light bg-secondary-400 sm:mx-7 absolute right-3 top-7 z-40"
              )}
              icon={<TiFilter className="text-[2.1rem]" />}
            >
              فیلترها
            </ButtonIcon>
            <SortTabs
              count={data?.count}
              className={classNames(
                "border-b border-solid border-secondary-400 transition-400-linear",
                { "": filterState, "sm:pr-52": !filterState }
              )}
            ></SortTabs>
          </div>
          {isSuccess && (
            <>
              {data?.count === 0 && <NoContent />}
              {firstPage === 1 ? (
                <InfiniteList
                  className={classNames("grid gap-x-6 gap-y-8 py-16", {
                    "grid-cols-1 md:grid-cols-2 xl:grid-cols-3": filterState,
                    "md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4":
                      !filterState,
                  })}
                  {...{query,page,isError,refetch,isFetching}}
                  rtkSlice={product_api}
                  loadingContent={<VideoCardLoader count={loaderCount()} />}
                  items={data}
                >
                  {(item, k) => {
                    return (
                      <MainProductCard
                        link={`/products/${item.type}/${item.id}`}
                        key={item.id}
                        data={item}
                      />
                    );
                  }}
                </InfiniteList>
              ) : (
                <div
                  className={classNames("grid gap-x-6 gap-y-8 py-16", {
                    "grid-cols-1 md:grid-cols-2 xl:grid-cols-3": filterState,
                    "md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4":
                      !filterState,
                  })}
                >
                  {data.results.map((item, key) => {
                    return (
                      <MainProductCard
                        link={`/products/${item.type}/${item.id}`}
                        key={item.id}
                        data={item}
                      />
                    );
                  })}
                </div>
              )}
              <div className="flex cursor-pointer justify-center gap-3 py-20 aligns-center">
                {isSuccess && data.count > 0 && (
                  <Pagination
                    totalCount={data.count}
                    currentPage={page}
                    itemsPerPage={30}
                  />
                )}
              </div>
            </>
          )}
          {isLoading && (
            <div
              className={classNames("grid gap-x-6 gap-y-8 gap-10 py-16", {
                "grid-cols-1 md:grid-cols-2 xl:grid-cols-3": filterState,
                "md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4": !filterState,
              })}
            >
              <VideoCardLoader count={loaderCount() * 2} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    if (!["video", "image"].includes(context.query.type)) {
      return {
        notFound: true,
      };
    }
    const page = parseInt(context.query?.page ?? 1);
    const query = { ...context.query, page };

    store.dispatch(
      GetProductListFilter.initiate({ query: { type: context.query.type } })
    );
    store.dispatch(GetProductListScroll.initiate({ query }));

    await Promise.all(
      store.dispatch(product_api.util.getRunningQueriesThunk())
    );

    return {
      props: {
        query,
        agent: parse(context.req.headers["user-agent"]),
      },
    };
  }
);

export default Products;
