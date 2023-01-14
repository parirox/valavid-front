import Button from '@/components/Button';
import PopularCardCollection from '@/components/PopularCardCollection';
import PopularCardImage from '@/components/PopularCardImage';
import PopularCardVideo from '@/components/PopularCardVideo';
import SectionTitleDivider from '@/components/SectionTitleDivider';

const MostPopular = ({data}) => {
    return (
        <div className='my-40'>
            <SectionTitleDivider title="محبوب ها‍" ></SectionTitleDivider>
            <div className='container grid grid-cols-3 gap-2'>
                {data.map((item, key) => {
                    switch (item.type) {
                        case 'image':
                            return <PopularCardImage key={key} data={item} link={`/product/${item.id}`} />
                        case 'video':
                            return <PopularCardVideo key={key} data={item} link={`/product/${item.id}`} />
                        case 'collection':
                            return <PopularCardCollection key={key} data={item} link={`/product/${item.id}`} />
                    }
                })}
            </div>
            <Button
                className={"h-[4.6rem] w-52 rounded-3xl btn-circle mx-auto flex mt-20 text-[1.5rem] font-light btn-ghost"}
                link={"/videos?order=popular"}
              >
                بیشتر
              </Button>
        </div>
    );
}

export default MostPopular;
