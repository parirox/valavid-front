import Button from "@/components/Button";
import { useAddMessageMutation, useGetTicketDetailsMutation } from "@/datasources/ticket/remote/TicketSliceApi";
import toast from "@/utils/notification/toast";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { RiSendPlaneFill } from "react-icons/ri";


export default function TicketBox({ data, id }) {

  const [fetchDetails, {
    data: getDetails,
    isSuccess: detailsIsSuccess,
    error: detailsError,
    isError: detailsIsError,
    isLoading: detailsIsLoading
  }] = useGetTicketDetailsMutation()
  const [fetchSendMessage, {
    data: getSendData,
    isSuccess: sendIsSuccess,
    error: sendError,
    isError: sendIsError,
    isLoading: sendIsLoading
  }] = useAddMessageMutation()

  const [msg, setMsg] = useState({
    message: ''
  })
  const [open, setOpen] = useState(false)
  const openTicket = async () => {
    if (open === false) {
      await fetchDetails({ id: id }) 
      console.log(detailsIsSuccess);
      setOpen(true)
    } else {
      setOpen(false)
    }
  }
  const updateMessage = (newMessage) => {
    setMsg((prev) => {
      return {
        ...prev,
        message: newMessage
      }
    })
  }
  const check_sendMessage = () => {
    if (msg.message !== '' || msg.message !== null || msg.message !== undefined) {
      console.log(msg);
      sendMessage(msg)
    }
  }
  const sendMessage = (message) => {
    fetchSendMessage({ id, body: message }).unwrap().then((data) => {
      toast.success("پیام شما با موفقیت ثبت شد!")
    }).catch((err) => {
      toast.error(err)
    })
  }
  useEffect(() => {

  }, [])
  return (
    <div className={`relative group border border-solid bg-secondary-500 group-hover:bg-secondary
    group-hover:border-primary border-accent rounded-[2rem] px-3 ${open ? 'pb-7' : ''}`}>
      <div className="relative flex items-center w-full ">
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
      {
        open &&
        <div className="bg-secondary-light w-[calc(100%_-_2rem)] mx-auto py-8 px-2 rounded-[2rem]">
          <div className="px-6 w-full">
            <div className=" relative w-full h-32">
              <RiSendPlaneFill className="absolute bottom-5 left-7 text-3xl cursor-pointer" onClick={check_sendMessage}></RiSendPlaneFill>
              <HiOutlineEmojiHappy className="absolute bottom-5 left-20 text-3xl cursor-pointer"></HiOutlineEmojiHappy>
              <textarea type="text" className="min-h-full max-h-full w-full border-secondary-300 bg-transparent rounded-[2rem] px-6 py-5" onChange={(e) => updateMessage(e.target.value)} placeholder="متن خود را بنویسید ..." />
            </div>
            <div className="flex flex-col gap-4 pt-10 pr-14">
              {
                getDetails?.results?.map((data, index) => (
                  <div className="relative py-7" key={index}>
                    <div className={`flex justify-between items-center`}>
                      <div className="flex gap-5 items-center">
                        {
                          data.user.profile_image == '' || data.user.profile_image == null ?
                            <div className="w-14 h-14 rounded-full bg-primary"></div>
                            :
                            <Image src={'https://placeimg.com/192/192/people'} className={'w-14 h-14 rounded-full'} alt={''} width={100} height={100}></Image>
                        }
                        <p className="text-lg">{
                          data.user.first_name + " " + data.user.last_name
                          
                        }</p>
                      </div>
                      <p className="">{
                        data.created_at.slice(0,10).replace('-', '/').replace('-', '/')
                      }</p>
                    </div>
                    <div className="pr-10" dangerouslySetInnerHTML={{__html:data.message}}></div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      }
    </div>
  )
}
