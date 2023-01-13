import MedalBox from "../MedalBox";

const MedalsData = [
    {
        title: "محبوبترین ویدئو هفته",
        picture: "/images/mustPopularVideoMedal.png",
        progressBar: 5
    },
    {
        title: "1000+  لایک محصول",
        picture: "/images/Medal2.png",
        progressBar: 100
    },
    {
        title: "محبوبترین ویدئو هفته",
        picture: "/images/mustPopularVideoMedal.png",
        progressBar: 100
    },
    {
        title: "1000+  لایک محصول",
        picture: "/images/Medal2.png",
        progressBar: 70
    },
    {
        title: "محبوبترین ویدئو هفته",
        picture: "/images/mustPopularVideoMedal.png",
        progressBar: 0
    },
]

const Medals = () => {
    return (
        <div className="flex gap-12 flex-wrap pt-20">
            {
                MedalsData.map((medal, index) => (
                    <MedalBox className={'w-[calc(25%_-_2.26rem)]'} title={medal.title} picture={medal.picture} progressBar={medal.progressBar} key={index}></MedalBox>
                ))
            }
        </div>
    );
}

export default Medals;