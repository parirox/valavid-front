import DownloadCard from "@/components/DownloadCard";

const DownloadsData = [
    {
        title: "تصویر سی و سه پل در شب مهتابی",
        filters: [],
        haveLicense: true,
        price: 250000,
        media: '/videos/sample2.mp4',
        type: "video",
        mediaLink: ''
    },
    {
        title: "تصویر سی و سه پل در شب مهتابی",
        filters: ["24 fps", "4K", "QuickTime","24 fps", "4K", "QuickTime","24 fps", "4K", "QuickTime","24 fps", "4K", "QuickTime",],
        haveLicense: false,
        price: 20000,
        media: '/videos/sample2.mp4',
        type: "video",
        mediaLink: ''
    },
    {
        title: "تصویر سی و سه پل در شب مهتابی",
        filters: [],
        haveLicense: true,
        price: 250000,
        media: "https://placeimg.com/640/480/nature/10",
        type: "image",
        mediaLink: ''
    },
    {
        title: "تصویر سی و سه پل در شب مهتابی",
        filters: ["24 fps", "4K",],
        haveLicense: true,
        price: null,
        media: "/videos/sample2.mp4",
        type: "video",
        mediaLink: ''
    },
]

const Downloads = () => {
    return (
        <div className="flex gap-12 flex-wrap w-full pb-72 px-6">
            {
                DownloadsData.map((download, index) => (
                    <DownloadCard className="w-[calc(33.33%_-_2rem)]"
                        title={download.title} filterTags={download.filters} haveLicense={download.haveLicense} price={download.price} 
                        key={index} type={download.type} media={download.media} mediaLink={download.mediaLink}>
                    </DownloadCard>
                ))
            }
        </div>
    );
}

export default Downloads;