export default function ContactUsBox({ value, connectionWay, icon, className }) {
  return (
    <div className={`bg-[#0E1F2C] h-28 rounded-[2rem] flex gap-10 px-9 items-center justify-end ${className}`}>
      <div className="flex flex-col gap-2">
        <p className="text-2xl">
          {value ?? ''}
        </p>
        <p className="text-base text-end">
          {connectionWay ?? ''}
        </p>
      </div>
      {icon ?? ''}
    </div>
  )
}
