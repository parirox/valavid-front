import useInfiniteScroll from 'react-infinite-scroll-hook';
import product_api, {
  GetVideosList,
  GetVideosListScroll, productSliceApiTag,
  useGetVideosListScrollQuery
} from "@/datasources/product/remote/ProductSliceApi";
import {Fragment, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {wrapper} from "@/datasources/store";
import {useDispatch} from "react-redux";
import Pagination from "@/components/Pagination";
import dynamic from 'next/dynamic'

const VideoCardLoader = dynamic(import("@/components/skelton/VideoCardLoader"), {ssr: false}) // disable ssr

function InfiniteList({className, query, rtkSlice, page, setPage, items, isFetching, isLoading, isError, children}) {
  const dispatch = useDispatch()
  const router = useRouter()
  // const [page, setPage] = useState(parseInt(query?.page ?? 1))
  // const {
  //   data: items,
  //   isFetching,
  //   isSuccess,
  //   isLoading,
  //   isError
  // } = useGetVideosListScrollQuery({query: {...query, page: page}});
  const loadMore = () => {
    // if (page > 3) {
    //   dispatch(rtkSlice.util.resetApiState())
    //   router.reload()
    // }
    if (!isFetching) {
      setPage((prev) => prev + 1)
      router.replace({
          query: {...query, page: page + 1}
        },
        undefined, {shallow: true}
      )
    }
  }

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: !!items.next,
    onLoadMore: loadMore,
    disabled: isError,
    rootMargin: '0px 0px 400px 0px',
  });

  return (
    <>
      <div className={className}>
        {items.results.map((video, key) => (
          children(video, key)
        ))}
      </div>
      {(isLoading || !!items.next) && (
        <div ref={sentryRef} className={"flex w-full gap-10"}>
          <VideoCardLoader count={3}/>
        </div>
      )}
    </>
  );
}

export default InfiniteList