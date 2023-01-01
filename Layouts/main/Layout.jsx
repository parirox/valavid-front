import Footer from "./Footer";
import Header from "./Header";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <>
      {router.pathname !== "/auth" && <Header />}
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
