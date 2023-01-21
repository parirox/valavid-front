import {useGetProfileDetailsQuery} from "@/datasources/user/remote/UserSliceApi";
import ContactData from "@/components/profile/Forms/SellerForm/ContactData";
import DocsUpload from "@/components/profile/Forms/SellerForm/DocsUpload";


const SellerForm = () => {
  const {data, isSuccess, isError, error} = useGetProfileDetailsQuery();

  if (!isSuccess) return <></>
  return (
    <div className="mb-40">
      <div className="text-lg py-5">
        <ContactData defaultValues={{
          email:data.seller?.email ?? "",
          phonenumber: data.seller?.phonenumber ?? "",
          socials: [
            {
              name: 'instagram',
              address: ''
            }
          ],
        }}/>
        <div className="mb-16"></div>
        <DocsUpload
          defaultValues={{
            idcart_photo: '',
            shabanumber: '',
            banknumber: '',
          }}
        />
      </div>
    </div>
  );
}

export default SellerForm;

