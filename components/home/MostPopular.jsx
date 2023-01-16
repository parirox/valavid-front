import Button from '@/components/Button';
import SectionTitleDivider from '@/components/SectionTitleDivider';
import MainProductCard from "@/components/MainProductCard";

const MostPopular = ({data}) => {
    return (
        <div className='my-40'>
            <SectionTitleDivider title="محبوب ها‍" ></SectionTitleDivider>
            <div className='container grid grid-cols-3 gap-2'>
                {data.map((item, key) => (
                    <MainProductCard key={key} data={item} link={`/products/${item.type}/${item.id}`} />
                ))}
            </div>
            <Button
                className={"h-[4.6rem] w-52 rounded-3xl btn-circle mx-auto flex mt-20 text-[1.5rem] font-light btn-ghost"}
                link={"/products/video?order=popular"}
              >
                بیشتر
              </Button>
        </div>
    );
}

export default MostPopular;
