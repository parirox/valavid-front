import Rhomboid from '@/public/icons/FillRhomboidSmall.svg';
export default function SectionTitleDivider({ title }) {
  return (
    <div className="w-full items-center flex">
      <div className="border-b border-solid border-gray-700 basis-full"></div>
      <Rhomboid className="w-9"></Rhomboid>
      <h2 className="flex justify-center text-[1.75rem] min-w-fit px-14">{title}</h2>
      <Rhomboid className="w-9"></Rhomboid>
      <div className="border-b border-solid border-gray-700 basis-full"></div>
    </div>
  )
}
