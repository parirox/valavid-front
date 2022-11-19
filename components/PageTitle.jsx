export default function PageTitle({ icon, children }) {
  return (
    <div className="flex items-center gap-3 flex-col">
      {icon ? <div className="bg-white flex justify-center items-center w-20 h-20 rounded-full">{icon}</div> : null}
      <h3> {children} </h3>
    </div>
  )
}
