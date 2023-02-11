import {useGetPublisherProductQuery} from "@/datasources/user/remote/UserSliceApi";
import MainProductCard from "@/components/MainProductCard";
import NoContent from "@/components/NoContent";


const Products = (query) => {
  const {data, isSuccess} = useGetPublisherProductQuery(query)

  if (!isSuccess) return <></>
  return (
    <div className="container">
      {data.count === 0 && <NoContent/>}
      <div className="grid grid-cols-3 gap-10 gap-x-14">
        {data.results.map((item, k) => (
          <MainProductCard link={`/products/${item.type}/${item.id}`} key={k} data={item}/>
        ))}
      </div>
    </div>
  );
};

export default Products;
