import Button from "@/components/Button";
import TdTable from "./TdTableTicket";
const ticketsData = [
    {
        id: 1,
        subject: "اعتراض قیمت گذاری",
        productName: "تصویر صحرای دشت مغان در غروب",
        date: "1401/12/24"
    },
    {
        id: 1,
        subject: "اعتراض قیمت گذاری",
        productName: "تصویر صحرای دشت مغان در غروب",
        date: "1401/12/24"
    },
]
const Tickets = () => {
    return (
        <div className="pt-7 pb-20">
            <Button className={'btn-primary py-4 px-12 rounded-full text-2xl'}>افزودن تیکت</Button>
            <div className="pt-10">
                <div className="h-16 flex w-full">
                    <div className="text-start pr-14 basis-1/4">موضوع</div>
                    <div className="text-start basis-1/4">محصول</div>
                    <div className="text-start basis-1/4">تاریخ</div>
                    <div className="text-start basis-1/4"></div>
                </div>
                <div className="flex flex-col gap-6">
                    {
                        ticketsData.map((data, index) => (
                            <TdTable data={data} key={index}></TdTable>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Tickets;