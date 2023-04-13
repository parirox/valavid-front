import { uncompletedProductItems } from "@/datasources/user/local/UserSlice";
import SortTabs from "../SortTabs";
import UploadCard from "../UploadCard/UploadCard";
import { useSelector } from "react-redux";
import UnCompletedUploadCard from "../UploadCard/UnCompletedUploadCard";
import Pagination from "../Pagination";
import Divider from "@/components/Divider";
import {useRouter} from "next/router";
import Spinner from "@/components/Spinner";
import classNames from "classnames";

const Uploads = ({
  getAccountProductList,
  products,
  isLoading,
  setProduct,
  handleReloadFile,
}) => {
  const router = useRouter()
  const uncompletedProducts = useSelector(uncompletedProductItems);

  return (
    <div className="pb-72">
      <SortTabs
        count={(products && uncompletedProducts) && products.count + uncompletedProducts.length}
        className={"pt-7"}></SortTabs>
      <div className="flex flex-col gap-6 pt-8">
        {uncompletedProducts.length > 0 && <Divider start="تکمیل نشده" className={"mt-5"}/>}
        {uncompletedProducts &&
          uncompletedProducts.map((upload, index) => (
            <UnCompletedUploadCard
              key={upload.id}
              id={upload.id}
              cover={upload.path ? `${upload.path}` : upload.localSrc}
              fileType={upload.fileType || null}
              file={upload}
              getAccountProductList={getAccountProductList}
              setProduct={setProduct}
              handleReloadFile={handleReloadFile}></UnCompletedUploadCard>
          ))}
        {uncompletedProducts.length > 0 && <Divider start="تایید شده" className={"mt-5"} id={"product-submitted-list"}/>}
        {products &&
          products.results.map((upload, index) => (
            <UploadCard
              className={classNames(`animate-in slide-in-from-bottom-1/2`)}
              key={upload.id}
              id={upload.id}
              cover={upload.media.src}
              status={upload.status}
              downloadUrl={upload.file}
              price={upload.price}
              title={upload.title}
              date={upload.created_at}
              likes={upload.like_count}
              purchases={upload.sell_count}
              views={upload.view_count}
              getAccountProductList={getAccountProductList}></UploadCard>
          ))}
        {isLoading && (
        <div className="py-40 full flex justify-center items-center">
          <Spinner/>
        </div>
        )}
      </div>
      <div className="flex cursor-pointer justify-center gap-3 py-20 aligns-center">
        {products && (
          <Pagination
            totalCount={products.count}
            currentPage={router?.query?.page ?? 1}
            itemsPerPage={24}
            scroll={false}
          />
        )}
      </div>
    </div>
  );
};

export default Uploads;
