import PopularCardVideo from "../PopularCardVideo";
import PopularCardImage from '@/components/PopularCardImage';

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
    },
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
]

const Favorites = () => {
    return (
        <div className="flex flex-wrap py-7 w-full pb-48">
            {data.map((favorite, key) => {
                return favorite.type === 'video' ? <PopularCardVideo className="basis-1/3" key={key} data={favorite} /> : <PopularCardImage className="basis-1/3 h-[25rem]" key={key} data={favorite} />
            })}
        </div>
    );
}

export default Favorites;