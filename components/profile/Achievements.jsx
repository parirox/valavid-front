import { useGetMyAchievementsQuery } from "@/datasources/user/remote/UserSliceApi";
import NoContent from "@/components/NoContent";
import MedalBox from "@/components/MedalBox";

const Achievements = () => {
  const { data, isSuccess } = useGetMyAchievementsQuery();
  if (!isSuccess) return <></>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 pt-20">
      {data.count === 0 && <NoContent />}
      {data.results.map((medal, index) => (
        <>
          <MedalBox
            className={"w-full"}
            title={medal.title}
            picture={medal.image}
            progressBar={medal.progress}
            key={index}
          ></MedalBox>
          <MedalBox
            className={"w-full"}
            title={medal.title}
            picture={medal.image}
            progressBar={medal.progress}
            key={index}
          ></MedalBox>
          <MedalBox
            className={"w-full"}
            title={medal.title}
            picture={medal.image}
            progressBar={medal.progress}
            key={index}
          ></MedalBox>
          <MedalBox
            className={"w-full"}
            title={medal.title}
            picture={medal.image}
            progressBar={medal.progress}
            key={index}
          ></MedalBox>
        </>
      ))}
    </div>
  );
};

export default Achievements;
