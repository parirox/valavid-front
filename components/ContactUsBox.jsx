export default function ContactUsBox({
  value,
  connectionWay,
  icon,
  className,
}) {
  return (
    <div
      className={`h-28 rounded-[2rem] flex gap-10 items-center justify-start ${className}`}
    >
      <div className="bg-primary rounded-full w-14 h-14 flex items-center justify-center">{icon ?? ""}</div>
      <div className="flex flex-col gap-2">
        <p className="text-xl">{value ?? ""}</p>
        <p className="text-base text-[#424E57]">{connectionWay ?? ""}</p>
      </div>
    </div>
  );
}
