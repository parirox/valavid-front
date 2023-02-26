import {getCookie} from "cookies-next";

export function withAuthSSR(gssp) {
  return async (context) => {
    const accessToken = getCookie("valavid_token");

    if (!accessToken) {
      return {
        redirect: {
          destination: '/'
        }
      };
    }

    const gsspData = await gssp(context); // Run `getServerSideProps` to get page-specific data

    // Pass page-specific props along with user data from `withAuth` to component
    return {
      props: {
        ...gsspData.props,
      }
    };
  }
}