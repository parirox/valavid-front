import Image from 'next/image';

const Avatar = ({src,alt,badge}) => (
    <div className="flex-initial">
        <span className="relative">
            <Image src={src} alt={alt} width={50} height={50} className="rounded-full" />
            {badge && <span className="rounded-full bg-white absolute -right-3 -top-3 p-2 text-success-100 text-xl">
                {badge}
            </span>}
        </span>
    </div>
)

export default Avatar;