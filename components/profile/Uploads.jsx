import { uncompletedProductItems } from "@/datasources/user/local/UserSlice";
import SortTabs from "../SortTabs";
import UploadCard from "../UploadCard/UploadCard";
import { useSelector } from "react-redux";
import UnCompletedUploadCard from "../UploadCard/UnCompletedUploadCard";

const Uploads = ({ getAccountProductList, products, setProduct }) => {
  const uncompletedProducts = useSelector(uncompletedProductItems);

  return (
    <div className="pb-72">
      <SortTabs
        count={products && products.results.length}
        className={"pt-7"}
      ></SortTabs>
      <div className="flex flex-col gap-6 pt-8">
        {uncompletedProducts &&
          uncompletedProducts.map((upload, index) => (
            <UnCompletedUploadCard
              key={index}
              id={upload.id}
              cover={
                upload.path
                  ? `${upload.path}`
                  : upload.localSrc
              }
              fileType={upload.fileType || null}
              file={upload}
              getAccountProductList={getAccountProductList}
              setProduct={setProduct}
            ></UnCompletedUploadCard>
          ))}
        {products &&
          products.results.map((upload, index) => (
            <UploadCard
              key={index}
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
              getAccountProductList={getAccountProductList}
            ></UploadCard>
          ))}
      </div>
    </div>
  );
};

export default Uploads;
