import Image from "next/image";

export default function AdvantageBox({icon, advantage, description}) {
  return (
    <div className="flex gap-3">
      <Image src={icon} alt="" width={50} className="w-14 h-[4rem]"></Image>
      <div className="text-start">
        <p className="text-lg">
          {advantage}
        </p>
        <p className="text-base text-secondary-200 pt-2">
          {description}
        </p>
      </div>
    </div>
  )
}
