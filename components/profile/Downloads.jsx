import DownloadCard from "@/components/DownloadCard";
import {
  useGetDownloadsQuery,
  useGetMyAchievementsQuery,
} from "@/datasources/user/remote/UserSliceApi";
import NoContent from "@/components/NoContent";
import MedalBox from "@/components/MedalBox";

const Downloads = () => {
  const { data, isSuccess } = useGetDownloadsQuery();
  if (!isSuccess) return <></>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full pb-72 px-6">
      {data?.count === 0 && <NoContent />}
      {data.results.map((download, index) => (
        <DownloadCard
          className="w-full"
          id={download.id}
          title={download.title}
          extra_information={download.extra_information}
          price={download.price.pay_price}
          key={index}
          type={download.type}
          media={download.media}
          mediaLink={download.mediaLink}
        ></DownloadCard>
      ))}
    </div>
  );
};

export default Downloads;
