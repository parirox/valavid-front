import Footer from "@/layouts/main/Footer";
import Header from "@/layouts/main/Header";
import { useRouter } from "next/router";
import LoadingBar from "react-redux-loading-bar";

const Layout = ({ children, styleMode = "others" }) => {
  const router = useRouter();
  return (
    <>
      {/*<LoadingBar className={"bg-primary h-1 fixed z-[100]"}/>*/}
      {router.pathname !== "/auth" && <Header styleMode={styleMode}/>}
      <main className={`min-h-screen ${styleMode === 'blog' ? 'bg-[#F8F8F8]' : ''}`}>{children}</main>
      {/* <Footer styleMode={styleMode}/> */}
    </>
  );
};

export default Layout;
