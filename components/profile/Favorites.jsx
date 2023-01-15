import PopularCardVideo from "../PopularCardVideo";
import PopularCardImage from '@/components/PopularCardImage';
import {useGetCollectionQuery, useGetFavoritesQuery} from "@/datasources/user/remote/UserSliceApi";
import NoContent from "@/components/NoContent";

const data = [
  {
    id: 6,
    type: "image",
    title: "مقبره بزرگ زیبای شب در شهر اصفهان",
    author: {
      name: "حمید باقری",
      profile_image: "https://placeimg.com/192/192/people",
    },
    price: "2,500 T",
    stats: {
      liked: false,
      cart_added: false,
      added_in_collection: false,
    },
    media: {
      alt: "natural",
      src: "https://placeimg.com/640/480/nature"
    }
  },
]

const Favorites = () => {
  const {data2, isSuccess, isError, isLoading} = useGetFavoritesQuery()

  if (!isSuccess) return <></>
  return (
    <div className="flex flex-wrap py-7 w-full pb-48">
      {data.count === 0 ? <NoContent/> :
        data.map((favorite, key) => {

        })
      }
    </div>
  );
}

export default Favorites;