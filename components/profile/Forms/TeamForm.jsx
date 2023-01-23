import {useGetProfileDetailsQuery} from "@/datasources/user/remote/UserSliceApi";
import ContactData from "@/components/profile/Forms/TeamForm/ContactData";
import DocsUpload from "@/components/profile/Forms/TeamForm/DocsUpload";
import CompanyData from "@/components/profile/Forms/TeamForm/CompanyData";
import {isEmpty} from "@/utils/general";


const TeamForm = () => {
  const {data, isSuccess, isError, error} = useGetProfileDetailsQuery();

  if (!isSuccess) return <></>
  return (
    <div className="mb-40">
      <div className="text-lg py-5">
        <CompanyData defaultValues={{
          team:{
            company_name: data.team?.company_name ?? "",
            company_address: data.team?.company_address ?? "",
            company_employees_count: data.team?.company_employees_count ?? "",
            company_document: data.team?.company_document ?? "",
            newspaper_poster: data.team?.newspaper_poster ?? "",
          }
        }}/>
        <div className="mb-16"></div>
        <ContactData defaultValues={{
          team:{
            email: data.team?.email ?? "",
            bank_owner_phone: data.team?.bank_owner_phone ?? "",
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
            team:{
              national_card: data.team?.national_card ?? "",
              bank_shaba: data.team?.bank_shaba ?? "",
              bank_account: data.team?.bank_account ?? "",
            }
          }}
        />
      </div>
    </div>
  );
}

export default TeamForm;