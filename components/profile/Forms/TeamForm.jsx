import {useGetProfileDetailsQuery} from "@/datasources/user/remote/UserSliceApi";
import ContactData from "@/components/profile/Forms/TeamForm/ContactData";
import DocsUpload from "@/components/profile/Forms/TeamForm/DocsUpload";
import CompanyData from "@/components/profile/Forms/TeamForm/CompanyData";


const TeamForm = () => {
  const {data, isSuccess, isError, error} = useGetProfileDetailsQuery();

  if (!isSuccess) return <></>
  return (
    <div className="mb-40">
      <div className="text-lg py-5">
        <CompanyData defaultValues={{
          company_name: '',
          company_address: '',
          employees_count: '',
          statute: '',
          newspaper_ads: '',
        }}/>
        <div className="mb-16"></div>
        <ContactData defaultValues={{
          company_email: '',
          company_phonenumber: '',
          company_socials: [
            {
              name: 'instagram',
              address: ''
            },
            {
              name: 'youtube',
              address: ''
            },
          ],
        }}/>
        <div className="mb-16"></div>
        <DocsUpload
          defaultValues={{
            company_idcart_photo: '',
            company_shabanumber: '',
            company_banknumber: '',
          }}
        />
      </div>
    </div>
  );
}

export default TeamForm;