import Button from "@/components/Button";
import SectionTitleDivider from "@/components/SectionTitleDivider";
import MainProductCard from "@/components/MainProductCard";

const MostPopular = ({ data }) => {
  return (
    <div className="my-40">
      <SectionTitleDivider title="محبوب ها‍"></SectionTitleDivider>
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {/* {data.map((item, key) => ( */}
        <MainProductCard
          data={data[0]}
          link={`/products/${data[0].type}/${data[0].id}`}
        />
        <MainProductCard
          className="sm:row-span-2 lg:row-span-1"
          data={data[1]}
          link={`/products/${data[1].type}/${data[1].id}`}
        />
        <MainProductCard
          data={data[2]}
          link={`/products/${data[2].type}/${data[2].id}`}
        />
        <MainProductCard
          data={data[3]}
          link={`/products/${data[3].type}/${data[3].id}`}
        />
        <MainProductCard
          className="sm:row-span-2 lg:row-span-1"
          data={data[4]}
          link={`/products/${data[4].type}/${data[4].id}`}
        />
        <MainProductCard
          data={data[5]}
          link={`/products/${data[5].type}/${data[5].id}`}
        />
        <MainProductCard
          data={data[6]}
          link={`/products/${data[6].type}/${data[6].id}`}
        />
        <MainProductCard
          data={data[7]}
          link={`/products/${data[7].type}/${data[7].id}`}
        />
        <MainProductCard
          data={data[8]}
          link={`/products/${data[8].type}/${data[8].id}`}
        />
        {/* ))} */}
      </div>
      <Button
        className={
          "h-[4.6rem] w-52 rounded-3xl btn-circle mx-auto flex mt-20 text-[1.5rem] font-light btn-ghost"
        }
        link={"/products/video?order=popular"}
      >
        بیشتر
      </Button>
    </div>
  );
};

export default MostPopular;
