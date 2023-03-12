import CoverPage from "@/components/CoverPage";
import Head from "next/head";
// Filter Drawern sidebar
import product_api, {
    GetCollectionDetails,
    useGetCollectionDetailsQuery
} from "@/datasources/product/remote/ProductSliceApi";
import {wrapper} from "@/datasources/store";
import Error404 from "pages/404";
import {IoImage} from "react-icons/io5";
import MainProductCard from "@/components/MainProductCard";
import moment from "jalali-moment";
import ManageCollectionDialog from "@/components/ManageCollectionDialog";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Pagination from "@/components/Pagination";
import {makeTitleWith} from "@/utils/seo/meta";

function Collections({query}) {
    const router = useRouter()
    const [page, setPage] = useState(parseInt(query.page ?? 1))
    const {data, isSuccess, isFetching, isLoading, isError} = useGetCollectionDetailsQuery({...query, page});


    useEffect(() => {
        if (router.isReady) {
            const server_page = query.page
            const client_page = parseInt(router.query?.page ?? 1)
            if (client_page !== server_page) {
                setPage(client_page)
            }
        }
    }, [isFetching, isSuccess, isLoading, isError, router.query])

    if (isError) return <Error404/>

    if (isSuccess) return (
    <>
        <Head>
            <title>{makeTitleWith("تصاویر")}</title>
        </Head>
        <CoverPage className="bg-opacity-30 bg-primary text-center" backgroundImage={data.background}
                   icon={<IoImage className={"text-primary text-3xl"}/>}>
            <div>
                {data.title}
            </div>
            <div className={"text-lg mt-3"}>
                گزینش مجموعه توسط :
            </div>
            <div className={'absolute bottom-10 left-0 right-0 text-center text-lg'}>
                بروزرسانی {moment(data.updated_at, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}
            </div>
        </CoverPage>
        <ManageCollectionDialog/>
        <div className="flex w-full">
            <div className="basis-full px-10 pb-[20rem]">
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 py-16'>
                    {data?.products.map((item, k) => {
                        return <MainProductCard link={`/products/${item.type}/${item.id}`} key={k} data={item}/>
                    })}
                </div>
                <div className="flex cursor-pointer justify-center gap-3 py-20 aligns-center">
                    {isSuccess && (data.total_count > 30) &&
                    <Pagination totalCount={data.total_count} currentPage={page} itemsPerPage={30}/>}
                </div>
            </div>

        </div>
    </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
(store) => async (context) => {
    const query= {page: 1, ...context.params}
    store.dispatch(GetCollectionDetails.initiate(query))
    await Promise.all(store.dispatch(product_api.util.getRunningQueriesThunk()))
    return {
        props: {
            query
        },
    };
}
);

export default Collections