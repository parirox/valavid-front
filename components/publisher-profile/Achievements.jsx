import {useGetPublisherAchievementsQuery} from "@/datasources/user/remote/UserSliceApi";
import NoContent from "@/components/NoContent";
import MedalBox from "@/components/MedalBox";

const Achievements = (query) => {
    const {data, isSuccess} = useGetPublisherAchievementsQuery(query)
    if (!isSuccess) return <></>
    return (
      <div className="flex gap-12 flex-wrap pt-20">
          {data.count === 0 && <NoContent/>}
          {
              data.results.map((medal, index) => (
                <MedalBox className={'w-[calc(25%_-_2.26rem)]'} title={medal.title} picture={medal.image}
                          progressBar={medal.progress} key={index}></MedalBox>
              ))
          }
      </div>
    );
}

export default Achievements;