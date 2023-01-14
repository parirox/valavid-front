import Image from "next/image";
import { MdDone } from "react-icons/md";

export default function MedalBox({ className, picture, progressBar, title }) {
  const progressStyle = {
    width: (progressBar / 100) * 14 + 'rem'
  }
  const filterImage = {
    filter: 'grayscale(100%)',
    opacity: '0.3'
  }
  return (
    <div className={`pb-7 relative ${className}`}>
      <div className="relative h-60 w-28 m-auto block ">
        <Image style={progressBar == 100 ? '' : filterImage} src={picture} className={`${progressBar == 100 ? '' : ''}`} fill></Image>
        {
        progressBar == 100 ? <MdDone className='absolute -right-7 -top-5 text-white text-xl bg-success w-8 h-8 p-[0.2rem] rounded-[50%]'></MdDone> : ''
        }
      </div>
      <div className="bg-secondary py-5 px-9 text-white rounded-[1.8rem] w-fit m-auto block">{title}</div>
      <div className={`h-1 py-[1px] bg-accent mx-auto my-7 ${progressBar == 100 ? 'hidden' : `w-56`}`}>
        <div style={progressStyle} className={`border-t border-solid mr-auto border-success-100 bottom-[1px] ${progressBar == 100 ? 'hidden' : ``}`}></div>
      </div>

    </div>
  )
}
