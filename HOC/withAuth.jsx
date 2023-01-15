import { useRouter } from "next/router";
import { getCookie } from 'cookies-next';

const withAuth = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();

      const accessToken = getCookie("valavid_token")

      if (!accessToken) {
        Router.replace("/auth");
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;
