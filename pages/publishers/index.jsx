import Button from "@/components/Button";
import PageTitle from "@/components/PageTitle";
import Head from "next/head";
import Image from "next/image";
import React, { Fragment } from "react";
import page_api, {
  GetPublishers,
  useGetPublishersQuery,
} from "@/datasources/pages/remote/PageSliceApi";
import { wrapper } from "@/datasources/store";
import NoContent from "@/components/NoContent";
import Avatar from "react-avatar";
import Pagination from "@/components/Pagination";

function Publishers({ query }) {
  const { data, isSuccess, isError, isLoading } = useGetPublishersQuery({
    query,
  });

  if (!isSuccess) return <></>;
  return (
    <>
      <Head>
        <title>والاوید | تولید کنندگان</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container pt-20 pb-96">
        <PageTitle>تولید کنندگان</PageTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-10 gap-y-14 pt-28">
          {data.count === 0 && <NoContent />}
          {data.results.map((item, i) => (
            <div key={i} className="">
              <Fragment>
                <div className="flex-1 group/topSellerCard h-full rounded-2xl bg-[#051622]  hover:bg-gradient-to-t hover:from-[#173358] hover:to-[#0D213B44] p-7 cursor-pointer">
                  <div className="flex flex-col gap-5 w-full items-center justify-end h-full">
                    <div className="flex-grow">
                      {item.profile_image ? (
                        <Image
                          src={item.profile_image}
                          alt={item.name}
                          width={90}
                          height={90}
                          className="w-8 rounded-full"
                        />
                      ) : (
                        <Avatar round={true} name={item.name} size="90" />
                      )}
                    </div>
                    <div className="flex-1 text-xl">
                      <span>{item.name}</span>
                    </div>
                    <div className="flex-1 text-primary font-bold text-lg">
                      <span>تولید {item.products_count}</span>
                    </div>
                    <div className="flex-1 w-full h-full">
                      <Button
                        link={`/profile/${item.username}`}
                        className="whitespace-nowrap text-xl w-full h-14 opacity-50 bg-secondary-400 transition-all group-hover/topSellerCard:btn-primary-gradient group-hover/topSellerCard:opacity-100"
                      >
                        مشاهدات تولیدات
                      </Button>
                    </div>
                  </div>
                </div>
              </Fragment>
            </div>
          ))}
        </div>
        <div className="py-20 flex justify-center aligns-center w-full gap-3 cursor-pointer">
          {isSuccess && data.count > 0 && (
            <Pagination
              totalCount={data.count}
              currentPage={query?.page}
              itemsPerPage={30}
            />
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const page = parseInt(context.query?.page ?? 1);
    const query = { page };
    store.dispatch(GetPublishers.initiate(query));
    await Promise.all(store.dispatch(page_api.util.getRunningQueriesThunk()));
    return {
      props: {
        query,
      },
    };
  }
);

export default Publishers;
