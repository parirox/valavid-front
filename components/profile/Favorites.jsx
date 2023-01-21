import {useGetFavoritesQuery} from "@/datasources/user/remote/UserSliceApi";
import NoContent from "@/components/NoContent";
import MainProductCard from "@/components/MainProductCard";

const Favorites = () => {
  const {data, isSuccess, isError, isLoading} = useGetFavoritesQuery()

  if (!isSuccess) return <></>
  return (
    <div className="grid flex-wrap py-7 w-full pb-48">
      {data.count === 0 && <NoContent/>}
      <div className={`grid gap-2 grid-cols-3`}>
      {
        data.results.map((item, k) => (
          <MainProductCard link={`/products/${item.type}/${item.id}`} key={k} data={item}/>
        ))
      }
      </div>
    </div>
  );
}

export default Favorites;