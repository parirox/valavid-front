import { getCookieClient } from "@/utils/general";
import { useRouter } from "next/router";
const withAuth = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();

      const accessToken = getCookieClient("valavid_token");

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
