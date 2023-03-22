export default function PageTitle({ icon, children, description }) {
  return (
    <div className="flex items-center gap-3 flex-col">
      {icon ? <div className="bg-white flex justify-center items-center w-16 h-16 rounded-full">{icon}</div> : null}
      <h3 className={"max-sm:px-3 md:text-3xl text-2xl"}> {children} </h3>
      { description ? <p> { description } </p> : ''}
    </div>
  )
}
