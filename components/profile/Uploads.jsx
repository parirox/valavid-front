import SortTabs from "../SortTabs";
import UploadCard from "../UploadCard";

const UploadsData = [
    {
        cover: 'https://placeimg.com/192/192/people',
        title: null,
        address: 'image3.jpg',
        status: 0,
        downloadUrl: 'https://placeimg.com/192/192/people',
        price: null,
        date: null,
        likes: 22,
        views: 1002,
        purchases: 2342,
    },
    {
        cover: 'https://placeimg.com/192/192/people',
        title: 'سی و سه پل اصفهان',
        address: 'image3.jpg',
        status: 1,
        downloadUrl: 'https://placeimg.com/192/192/people',
        price: null,
        date: null,
        likes: 22,
        views: 1002,
        purchases: 2342,
    },
    {
        cover: 'https://placeimg.com/192/192/people',
        title: 'سی و سه پل اصفهان',
        address: 'image3.jpg',
        status: 2,
        downloadUrl: 'https://placeimg.com/192/192/people',
        price: 255000,
        date: '1401/12/23',
        likes: 22,
        views: 1002,
        purchases: 2342,
    },
    {
        cover: 'https://placeimg.com/192/192/people',
        title: 'سی و سه پل اصفهان',
        address: 'image3.jpg',
        status: 2,
        downloadUrl: 'https://placeimg.com/192/192/people',
        price: 255000,
        date: '1401/12/23',
        likes: 22,
        views: 1002,
        purchases: 2342,
    },
    {
        cover: 'https://placeimg.com/192/192/people',
        title: 'سی و سه پل اصفهان',
        address: 'image3.jpg',
        status: 2,
        downloadUrl: 'https://placeimg.com/192/192/people',
        price: 255000,
        date: '1401/12/23',
        likes: 22,
        views: 1002,
        purchases: 2342,
    },
]

const Uploads = () => {
    return (
        <div className="pb-72">
            <SortTabs className={'pt-7'}></SortTabs>
            <div className="flex flex-col gap-6 pt-8">
                {
                    UploadsData.map((upload, index) => (
                        <UploadCard
                            key={index}
                            cover={upload.cover} status={upload.status} address={upload.address}
                            downloadUrl={upload.downloadUrl} price={upload.price} title={upload.title}
                            date={upload.date} likes={upload.likes} purchases={upload.purchases} views={upload.views}>
                        </UploadCard>
                    ))
                }
            </div>
        </div>
    );
}

export default Uploads;