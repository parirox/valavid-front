import Footer from "./Footer";
import Header from "./Header";

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
