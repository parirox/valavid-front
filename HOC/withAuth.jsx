import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

const withAuth = (WrappedComponent) => {
  const Component = async (props) => {
    const Router = useRouter();

    const accessToken = getCookie("valavid_token");

    if (!accessToken) {
      await Router.replace("/auth");
      return null;
    }

    return (
      <WrappedComponent {...props} />
    );
  }
  return Component;
};

export default withAuth;
