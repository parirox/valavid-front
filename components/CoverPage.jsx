import Image from 'next/image'
import PageTitle from './PageTitle';

export default function CoverPage({ className, children, icon, backgroundImage, description }) {
  return (
    <div className={`relative w-full flex items-center justify-center h-[30rem] ${className}`}>
      <Image fill sizes='' src={backgroundImage} alt="" className='z-[-1] object-cover'></Image>
      <PageTitle description={description} icon={icon}>{children}</PageTitle>
    </div>
  )
}
