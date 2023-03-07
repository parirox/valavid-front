import {useGetPublisherProductQuery} from "@/datasources/user/remote/UserSliceApi";
import MainProductCard from "@/components/MainProductCard";
import NoContent from "@/components/NoContent";
import Pagination from "@/components/Pagination";
import React, {useEffect, useMemo, useState} from "react";
import {useRouter} from "next/router";
import VideoCardLoader from "@/components/skelton/VideoCardLoader";


const Products = (query) => {
    const router = useRouter()
    const [page, setPage] = useState(parseInt(query.page ?? 1))
    const {
        data, isFetching, isSuccess, isLoading, isError, error,
    } = useGetPublisherProductQuery({username: query.username, page})

    useEffect(() => {
        if (router.isReady) {
            const server_page = query.page
            const client_page = parseInt(router.query?.page ?? 1)
            if (client_page !== server_page) {
                setPage(client_page)
            }
        }
    }, [isFetching, isSuccess, isLoading, isError, router.query])
    if (!isSuccess) return <></>
    return (
    <div className="container">
        {isSuccess && <>
            {data?.count === 0 ? <NoContent/> :
            <>
                <div
                className={"grid gap-x-6 gap-y-8 py-16 grid-cols-1 md:grid-cols-2 xl:grid-cols-3"}>
                    {data.results.map((item, key) => {
                        return <MainProductCard link={`/products/${item.type}/${item.id}`} key={item.id}
                                                data={item}/>
                    })}
                </div>
                <div className="flex cursor-pointer justify-center gap-3 py-20 aligns-center">
                    {isSuccess && (data.count > 0) &&
                    <Pagination totalCount={data.count} currentPage={page} itemsPerPage={30}/>}
                </div>
            </>
            }
        </>}
        {isLoading && <div className={"grid gap-x-6 gap-y-8 gap-10 py-16 grid-cols-1 md:grid-cols-2 xl:grid-cols-3"}>
            <VideoCardLoader count={6}/>
        </div>}
        {data.count === 0 && <NoContent/>}
    </div>
    );
};

export default Products;
