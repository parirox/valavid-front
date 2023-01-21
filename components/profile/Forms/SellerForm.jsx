import {useGetProfileDetailsQuery} from "@/datasources/user/remote/UserSliceApi";
import ContactData from "@/components/profile/Forms/SellerForm/ContactData";
import DocsUpload from "@/components/profile/Forms/SellerForm/DocsUpload";
import {isEmpty} from "@/utils/general";


const SellerForm = () => {
  const {data, isSuccess, isError, error} = useGetProfileDetailsQuery();

  if (!isSuccess) return <></>
  return (
    <div className="mb-40">
      <div className="text-lg py-5">
        <ContactData defaultValues={{
          seller:{
            email:data.seller?.email ?? "",
            bank_owner_phone:data.seller?.bank_owner_phone ?? ""
          },
          info: {
            socials: !isEmpty(data.info?.socials) ? data.info?.socials : [
              {
                name: 'instagram',
                address: ''
              }
            ]
          },
        }}/>
        <div className="mb-16"></div>
        <DocsUpload
          defaultValues={{
            seller:{
              national_card: data.seller?.national_card ?? "",
              bank_shaba: data.seller?.bank_shaba ?? "",
              bank_account: data.seller?.bank_account ?? "",
            }
          }}
        />
      </div>
    </div>
  );
}

export default SellerForm;

