import Footer from "@/layouts/main/Footer";
import Header from "@/layouts/main/Header";

const Layout = ({ children, styleMode = 2 }) => {
  return (
    <>
      <Header styleMode={styleMode} />
      <main>{children}</main>
      <Footer styleMode={styleMode} />
    </>
  );
}


export default Layout;
