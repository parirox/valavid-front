import Button from '@/components/Button';
import PopularCardCollection from '@/components/PopularCardCollection';
import PopularCardImage from '@/components/PopularCardImage';
import PopularCardVideo from '@/components/PopularCardVideo';
import SectionTitleDivider from '@/components/SectionTitleDivider';

const data = [
    {
        id: 1,
        type: "video",
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
            src: "/videos/sample1.mp4"
        }
    },
    {
        id: 2,
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
    {
        id: 3,
        type: "collection",
        label: "مقبره بزرگ زیبای شب در شهر اصفهان",
        media: [
            {
                alt: "natural",
                src: "https://placeimg.com/640/480/nature/1"
            },
            {
                alt: "natural",
                src: "https://placeimg.com/640/480/nature/2"
            }, {
                alt: "natural",
                src: "https://placeimg.com/640/480/nature/3"
            }, {
                alt: "natural",
                src: "https://placeimg.com/640/480/nature/4"
            }
        ]
    }, 
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
    {
        id: 5,
        type: "collection",
        label: "مقبره بزرگ زیبای شب در شهر اصفهان",
        media: [
            {
                alt: "natural",
                src: "https://placeimg.com/640/480/nature/5"
            },
            {
                alt: "natural",
                src: "https://placeimg.com/640/480/nature/6"
            }, {
                alt: "natural",
                src: "https://placeimg.com/640/480/nature/7"
            }, {
                alt: "natural",
                src: "https://placeimg.com/640/480/nature/8"
            }
        ]
    },
    {
        id: 4,
        type: "video",
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
            src: "/videos/sample2.mp4"
        }
    }
]

const MostPopular = () => {

    const likeItem = (v) => {
        // to do
    }

    const addToCart = (v) => {
        // to do
    }

    const addToCollection = (v) => {
        // to do
    }

    return (
        <div className='my-40'>
            <SectionTitleDivider title="محبوب ها‍" ></SectionTitleDivider>
            <div className='container grid grid-cols-3 gap-2'>
                {data.map((item, key) => {
                    switch (item.type) {
                        case 'image':
                            return <PopularCardImage key={key} data={item} link={`/footage/${item.id}`} />
                        case 'video':
                            return <PopularCardVideo key={key} data={item} link={`/footage/${item.id}`} />
                        case 'collection':
                            return <PopularCardCollection key={key} data={item} link={`/footage/${item.id}`} />
                    }
                })}
            </div>
            
            <Button
                className={"h-[4.6rem] w-52 rounded-3xl btn-circle mx-auto flex mt-20 text-[1.5rem] font-light btn-ghost"}
                link={"/auth"}
              >
                بیشتر
              </Button>
        </div>
    );
}

export default MostPopular;
