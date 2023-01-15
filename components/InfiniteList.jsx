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

function InfiniteList({className, query, items, isFetching, isLoading, loadingContent, isError, children}) {
  const router = useRouter()
  const loadMore = () => {
    if (!isFetching) {
      router.replace({
          query: {...query, page: query.page + 1}
        },
        undefined, {scroll: false}
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
          {loadingContent}
        </div>
      )}
    </>
  );
}

export default InfiniteList