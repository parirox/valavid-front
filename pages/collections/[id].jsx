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
import ProductCart from "@/components/ProductCart";
import moment from "jalali-moment";
import ManageCollectionDialog from "@/components/ManageCollectionDialog";

function Collections({query}) {
  const {data, isSuccess, isError} = useGetCollectionDetailsQuery(query);

  if (isError) return <Error404/>

  if (isSuccess) return (
    <>
      <Head>
        <title>والاوید | تصاویر</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
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
          <div className='grid grid-cols-4 gap-2 py-16'>
            {data?.products.map((item, k) => {
              return <ProductCart link={`/products/${item.type}/${item.id}`} key={k} data={item}/>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(GetCollectionDetails.initiate(context.params))
    await Promise.all(store.dispatch(product_api.util.getRunningQueriesThunk()))
    return {
      props: {
        query:context.params
      },
    };
  }
);

export default Collections