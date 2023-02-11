import useInfiniteScroll from 'react-infinite-scroll-hook';
import {useRouter} from "next/router";


function InfiniteList({className, query,page, items, isFetching, isLoading, loadingContent, isError, children}) {
  const router = useRouter()
  const loadMore = () => {
    if (!isFetching) {
      router.replace({
          query: {...query, page: parseInt(page) + 1}
        },
        undefined, {scroll: false, shallow: true}
      )
    }
  }

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: !!items.next,
    onLoadMore: loadMore,
    disabled: isError,
    rootMargin: '800px 0px 0px 0px',
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