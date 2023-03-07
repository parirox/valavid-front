import BlogFooter from "@/layouts/main/Footers/BlogFooter";
import MainFooter from "@/layouts/main/Footers/MainFooter";
import OtherPagesFooter from "@/layouts/main/Footers/OtherPagesFooter";

const Footer = ({styleMode}) => {
    switch (styleMode) {
        case "main":
            return <MainFooter/>
        case "blog":
            return <BlogFooter/>
        default:
            return <OtherPagesFooter/>
    }
};

export default Footer;
