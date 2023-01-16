import {useGetPublisherProductQuery} from "@/datasources/user/remote/UserSliceApi";
import ProductCart from "@/components/ProductCart";
import NoContent from "@/components/NoContent";


const Products = () => {
  const {data, isSuccess, isError, isLoading} = useGetPublisherProductQuery()

  if (!isSuccess) return <></>
  return (
    <div className="container">
      {data.count === 0 && <NoContent/>}
      <div className="grid grid-cols-3 gap-10 gap-x-14">
        {data.results.map((item, k) => (
          <ProductCart link={`/products/${item.type}/${item.id}`} key={k} data={item}/>
        ))}
      </div>
    </div>
  );
};

export default Products;
