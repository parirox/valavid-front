import React, {useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import Link from "next/link";
import {useRouter} from "next/router";

function Pagination({totalCount, currentPage = 1, itemsPerPage}) {
  const router = useRouter()
  const pageCount = Math.ceil(totalCount / itemsPerPage);
  const handlePageClick = async (event) => {
    await router.push({query: {...router.query, page: event.selected + 1}})
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        onPageChange={handlePageClick}
        className={"flex gap-3 items-center"}
        previousClassName={"hidden"}
        nextLinkClassName={"hidden"}
        forcePage={currentPage - 1}
        pageClassName={"text-xl text-white text-center flex-1"}
        hrefBuilder={(pageIndex, pageCount1, selectedPage) => {
          return router.asPath.replace(`page=${currentPage}`, `page=${pageIndex}`)
        }}
        hrefAllControls
        pageLinkClassName={"px-4 py-2 bg-accent rounded-3xl border border-secondary-400"}
        activeLinkClassName={"!bg-primary"}
        pageRangeDisplayed={2}
        pageCount={pageCount}
      />
    </>
  );
}

export default Pagination