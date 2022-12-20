import Footer from "@/layouts/main/Footer";
import Header from "@/layouts/main/Header";
import LoadingBar from 'react-redux-loading-bar'

const Layout = ({children, styleMode = "others"}) => {
    return (
        <>
            <LoadingBar className={"bg-primary h-1 fixed z-50"} />
            <Header styleMode={styleMode}/>
            <main className={"min-h-screen"}>{children}</main>
            <Footer styleMode={styleMode}/>
        </>
    );
}


export default Layout;
