import useInfiniteScroll from 'react-infinite-scroll-hook';
import {useRouter} from "next/router";
import {useMemo} from "react";


function InfiniteList({className, query,page, items, isFetching, loadingContent,refetch, isError, children}) {
  const router = useRouter()
  const hasNextPage = useMemo(()=>{
        return items.results.length < items.count
  },[items.results.length , items.count])
  const loadMore = () => {
    if (hasNextPage && !isFetching) {
      router.replace({
          query: {...query, page: parseInt(page) + 1}
        },
        undefined, {scroll: false, shallow: true}
      )
    }
  }

  const [sentryRef] = useInfiniteScroll({
    loading: isFetching,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: isError,
    rootMargin: '400px 0px 400px 0px',
  });

  return (
    <>
      <div className={className}>
        {items.results.map((video, key) => (
          children(video, key)
        ))}
      </div>
      {isError && <div className={"w-full"}><button className={"btn btn-ghost m-auto"} onClick={refetch}>تلاش مجدد</button></div>}
      {(!isError && (isFetching || hasNextPage) ) && (
        <div ref={sentryRef} className={"flex w-full gap-10"}>
          {loadingContent}
        </div>
      )}
    </>
  );
}

export default InfiniteList