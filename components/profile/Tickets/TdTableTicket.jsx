import Button from "@/components/Button";
import { useEffect, useRef, useState } from "react";


export default function TdTableTicket({ data }) {
  const [open, setOpen] = useState(false)
  function openTicket() {
    setOpen(!open)
  }
  useEffect(() => {

  }, [])
  return (
    <div className="relative group">
      <div className="relative flex items-center w-full border border-solid bg-secondary-500 group-hover:bg-secondary
          group-hover:border-primary z-[-1] border-accent
          m-auto left-0 right-0 rounded-[2rem]">
        <div className="py-8 pr-14 basis-1/4">
          <div className="h-auto">
            {data.subject}
          </div>
        </div>
        <div className="py-8 basis-1/4">{data.productName}</div>
        <div className="py-8 basis-1/4">{data.date}</div>
        <div className="py-8 flex justify-center pl-7 basis-1/4">
          <Button className={'btn-accent group-hover:btn-primary py-4 px-9 rounded-3xl mr-auto'} onClick={openTicket}>
            {
              open ? 'جمع کردن' : 'مشاهده جزئیات'
            }
          </Button>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  )
}
