import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import GeneralData from "@/components/profile/Forms/UserForm/GeneralData";
import AccountData from "@/components/profile/Forms/UserForm/AccountData";
import {useGetProfileDetailsQuery} from "@/datasources/user/remote/UserSliceApi";
import PasswordData from "@/components/profile/Forms/UserForm/PasswordData";


const UserForm = () => {
  const {data, isSuccess, isError, error} = useGetProfileDetailsQuery();

  if (!isSuccess) return <></>

  return (
    <div className="mb-40">
      <div className="text-lg py-5">
        <GeneralData defaultValues={{
          info: data.info,
          first_name: data.first_name,
          last_name: data.last_name,
        }}/>
        <div className="mb-16"></div>
        <AccountData
          defaultMediaValues={{
            avatar: data.avatar?.src,
            background_image: data.background_image?.src,
          }}
          defaultAccountValues={{
            username: data.username,

        }}
          defaultSloganValues={{
            info: {user_slogan: data.info?.user_slogan}
          }}
        />
        <div className="mb-16"></div>
        <PasswordData />
      </div>
    </div>
  );
}

export default UserForm;
