import Chip from "@/components/Chip";

const data = {
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
    },
    tags: [
        {
            id: 1,
            label: "مشهد"
        },
        {
            id: 2,
            label: "میلاد"
        },
        {
            id: 3,
            label: "برج میلاد"
        },
        {
            id: 4,
            label: "شب های قدر"
        },
        {
            id: 5,
            label: "امام رضا"
        }
    ]
}

function index() {
    return (
        <div className="container mt-20">
            <div className="flex">
                <div className="basis-7/12">
                    <div className="relative">
                        <video autoPlay={false} controls loop className="h-full w-full object-cover transition-400-linear group-hover/popularCard:scale-110 rounded-[2.6rem] z-30 hover:autoPlay">
                            <source src={data.media.src} type="video/mp4" />
                        </video>
                        <span></span>
                    </div>

                    <div className="flex justify-start gap-3 mt-6">
                        {data.tags.map((v, i) => (
                            <Chip key={i} className={"btn-glass font-bold h-[24px]"} content={v.label} />
                        ))}
                    </div>
                </div>
                <div className="basis-5/12">

                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(ctx) {


    return {
        props: {
            data: null
        }
    }
}

export default index;