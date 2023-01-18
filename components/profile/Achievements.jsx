import MedalBox from "../MedalBox";
import {useGetCartQuery, useGetMyAchievementsQuery} from "@/datasources/user/remote/UserSliceApi";
import NoContent from "@/components/NoContent";

const MedalsData = [
  {
    title: "محبوبترین ویدئو هفته",
    picture: "/images/mustPopularVideoMedal.png",
    progressBar: 5
  },
  {
    title: "1000+  لایک محصول",
    picture: "/images/Medal2.png",
    progressBar: 100
  },
  {
    title: "محبوبترین ویدئو هفته",
    picture: "/images/mustPopularVideoMedal.png",
    progressBar: 100
  },
  {
    title: "1000+  لایک محصول",
    picture: "/images/Medal2.png",
    progressBar: 70
  },
  {
    title: "محبوبترین ویدئو هفته",
    picture: "/images/mustPopularVideoMedal.png",
    progressBar: 0
  },
]

const Achievements = () => {
  const {data, isSuccess, error, isError, isLoading} = useGetMyAchievementsQuery()
  if (!isSuccess) return <></>
  return (
    <div className="flex gap-12 flex-wrap pt-20">
      {data.count === 0 && <NoContent/>}
      {
        MedalsData.map((medal, index) => (
          <MedalBox className={'w-[calc(25%_-_2.26rem)]'} title={medal.title} picture={medal.picture}
                    progressBar={medal.progressBar} key={index}></MedalBox>
        ))
      }
    </div>
  );
}

export default Achievements;