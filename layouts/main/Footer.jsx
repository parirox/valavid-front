import { IoMailOutline } from "react-icons/io5";
import {
  FaCopyright,
  FaInstagram,
  FaTelegramPlane,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSubmitNewsletterMutation } from "@/datasources/pages/remote/PageSliceApi";
import toast from "@/utils/notification/toast";
import { handleApiError } from "@/datasources/errorHandler";
import ValavidLogo from "@/public/icons/ValavidLogo.svg";

const Footer = ({ styleMode }) => {
  const [submitNewsletter] = useSubmitNewsletterMutation();
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required("ایمیل را وارد کنید")
      .email("ایمیل معتبر نمی باشد."),
  });
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data) => {
    let isValid = await trigger(["email"]);
    if (!isValid) {
      toast.error(errors.email.message);
      return;
    }
    submitNewsletter(data)
      .unwrap()
      .then((data) => {
        toast.success("با موفقیت ثبت نام شدید!");
        reset();
      })
      .catch((e) => {
        handleApiError(e);
      });
  };

  if (styleMode === "main") {
    return (
      <footer className="bg-secondary">
        <div className="container">
          <div className="max-md:text-center whitespace-nowrap grid grid-cols-1 sm:grid-cols-9 lg:grid-cols-9 gap-10 pt-20 pb-12 border-b border-accent">
            <div className="col-span-9 lg:col-span-2 flex flex-col gap-3 sm:block">
              <span className="text-3xl font-bold md:block hidden">والاویــد</span>
              <div className="text-3xl font-bold md:hidden">
                    <Link href={"/"} className={"[&>svg>g>path]:fill-white [&>svg]:m-auto"}>
                        <ValavidLogo/>
                    </Link>
              </div>
              <p className="text-lg mt-3">مرجع فوتیج های ایرانی</p>
            </div>
            <div className="col-span-9 flex-col gap-3 items-end text-right flex lg:hidden">
              <p
                className={
                  "text-justify text-gray text-lg leading-8 whitespace-pre-line"
                }
              >
                والاوید پلتفرم خرید و به اشتراک گذاشتن فوتیج یا تکه ویدئو است که
                توسط شرکت رویای والاهنر از سال 96 کار خودشو شروع کرد. این پلتفرم
                پلی است برای دسترسی به دنیایی از فوتیج های خام از ایران و فرهنگ
                ایرانیان که با بهترین کیفیت از سراسر کشور در دسته بندی های متنوع
                قرارداده شده است. اگر شما هم یک فیلمساز هستید و میخواهید از
                آرشیوی که دارید، درآمد نامحدود کسب کنید و از تخفیف های ویژه
                فروشندگان والاوید هم بهره مند بشید؛ همین الان ویدیوهاتون با چند
                کلیک ساده آپلود کنید و والاویدی شوید.
              </p>
            </div>
            <div className="hidden md:flex md:col-span-9 lg:col-span-4  flex-col justify-between sm:flex-row gap-20">
              <div className="flex-initial flex sm:items-start sm:justify-start flex-col gap-3">
                <span className="text-2xl">دسته بندی ها</span>
                <Link
                  href={"/products/video"}
                  className="text-[#90999F] text-lg"
                >
                  ویدئو ها
                </Link>
                <Link
                  href={"/products/image"}
                  className="text-[#90999F] text-lg"
                >
                  تصاویر
                </Link>
                {/*<Link href={'#'} className="text-[#90999F] text-lg">مجموعه ها</Link>*/}
              </div>
              <div className="flex-initial flex sm:items-start sm:justify-start flex-col gap-3">
                <span className="text-2xl">مطالب</span>
                <Link
                  href={"/product/aboutUs"}
                  className="text-[#90999F] text-lg"
                >
                  درباره ما
                </Link>
                <Link href={"/blogs"} className="text-[#90999F] text-lg">
                  وبلاگ
                </Link>
                <Link href={"/publishers"} className="text-[#90999F] text-lg">
                  تولید کنندگان
                </Link>
              </div>
              <div className="flex-initial flex sm:items-start sm:justify-start flex-col gap-3">
                <span className="text-2xl">سوالات</span>
                <Link href={"/faq"} className="text-[#90999F] text-lg">
                  پرسش های متداول
                </Link>
                <Link href={"/plans"} className="text-[#90999F] text-lg">
                  انواع اشتراک
                </Link>
                <Link href={"/terms"} className="text-[#90999F] text-lg">
                  قوانین و مقررات
                </Link>
              </div>
            </div>
            <div className="sm:col-span-3 flex-col gap-3 items-end text-right hidden lg:flex">
              <p
                className={
                  "text-justify text-gray text-lg leading-8 whitespace-pre-line"
                }
              >
                والاوید پلتفرم خرید و به اشتراک گذاشتن فوتیج یا تکه ویدئو است که
                توسط شرکت رویای والاهنر از سال 96 کار خودشو شروع کرد. این پلتفرم
                پلی است برای دسترسی به دنیایی از فوتیج های خام از ایران و فرهنگ
                ایرانیان که با بهترین کیفیت از سراسر کشور در دسته بندی های متنوع
                قرارداده شده است. اگر شما هم یک فیلمساز هستید و میخواهید از
                آرشیوی که دارید، درآمد نامحدود کسب کنید و از تخفیف های ویژه
                فروشندگان والاوید هم بهره مند بشید؛ همین الان ویدیوهاتون با چند
                کلیک ساده آپلود کنید و والاویدی شوید.
              </p>
              {/*<span className="text-2xl block w-full">اشتراک خبرنامه</span>*/}
              {/*<div className="form-control w-full">*/}
              {/*    <label className="block label mb-7">*/}
              {/*        <span className="text-[#90999F] text-lg">عضو خبرنامه ما شوید و از تازه ترین خبرها به روز رسانی‌ها و تخفیف های ویژه سایت با خبر شوید</span>*/}
              {/*    </label>*/}
              {/*    <div className="p-1 border border-accent rounded-xl">*/}
              {/*        <div className="relative">*/}
              {/*            <div className="absolute right-0 top-0 bottom-0 flex justify-center items-center px-3">*/}
              {/*                <IoMailOutline className="text-2xl text-[#90999F]" />*/}
              {/*            </div>*/}
              {/*            <input {...register('email')} type="text" placeholder="ایمیل شما" className="input w-full pr-16 py-3" />*/}
              {/*            <button onClick={handleSubmit(onSubmit)} className="btn btn-primary absolute left-0 top-0 h-full rounded-xl px-10">عضویت</button>*/}
              {/*        </div>*/}
              {/*    </div>*/}
              {/*</div>*/}
            </div>
          </div>
          <div className="copyright py-5 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 sm:justify-between">
            <div className="flex-none flex items-center gap-3">
              <FaCopyright />
              <span className="text-sm text-[#F2F4F4]">
                {" "}
                تمام حقوق محفوظ است و هرگونه استفاده غیر قانونی از مطالب پیگرد
                قانونی دارد
              </span>
            </div>
            <div className="flex-none flex flex-row gap-6 text-3xl justify-end">
              <Link href={"https://instagram.com/valavid.ir"}>
                <FaInstagram />
              </Link>
              <Link href={"https://youtube.com/valavid"}>
                <FaYoutube />
              </Link>
              <Link href={"https://t.me/valavid_ir"}>
                <FaTelegramPlane />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  return (
    <footer className="bg-secondary">
      <div className="container">
        <div className="grid grid-cols-9 gap-10 pt-20 pb-12 border-b border-accent">
          <div className="col-span-6">
            <span className="text-3xl font-bold block mb-10 sm:mb-7">والاویــد</span>

            <div className="flex-initial flex flex-col sm:flex-row gap-10 whitespace-nowrap">
              <Link href={"/products/video"} className="text-[#90999F] text-lg">
                ویدئوها
              </Link>
              <Link href={"/products/image"} className="text-[#90999F] text-lg">
                تصاویر
              </Link>
              {/*<Link href={'#'} className="text-[#90999F] text-lg">مجموعه ها</Link>*/}
              <Link href={"/aboutUs"} className="text-[#90999F] text-lg">
                درباره ما
              </Link>
              <Link href={"/blogs"} className="text-[#90999F] text-lg">
                وبلاگ
              </Link>
              <Link href={"/publishers"} className="text-[#90999F] text-lg">
                تولید کنندگان
              </Link>
              <Link href={"/faq"} className="text-[#90999F] text-lg">
                پرسش های متداول
              </Link>
            </div>
          </div>
          {/* <div className="col-span-3 flex flex-col gap-3 items-end text-right">
            <span className="text-2xl block w-full mb-3">اشتراک خبرنامه</span>
            <div className="form-control w-full">
              <div className="p-1 border border-accent rounded-xl">
                <div className="relative">
                  <div className="absolute right-0 top-0 bottom-0 flex justify-center items-center px-3">
                    <IoMailOutline className="text-2xl text-[#90999F]" />
                  </div>
                  <input
                    {...register("email")}
                    type="text"
                    placeholder="ایمیل شما"
                    className="input w-full pr-16 py-3"
                  />
                  <button
                    onClick={handleSubmit(onSubmit)}
                    className="btn btn-primary absolute left-0 top-0 h-full rounded-xl px-10"
                  >
                    عضویت
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="copyright py-5 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 sm:justify-between">
          <div className="flex-none flex items-center gap-3">
            <FaCopyright />
            <span className="text-sm text-[#F2F4F4]">
              {" "}
              تمام حقوق محفوظ است و هرگونه استفاده غیر قانونی از مطالب پیگرد
              قانونی دارد
            </span>
          </div>
          <div className="flex-none flex flex-row gap-6 text-3xl justify-end">
            <Link href={"https://instagram.com/valavid.ir"}>
              <FaInstagram />
            </Link>
            <Link href={"https://youtube.com/valavid"}>
              <FaYoutube />
            </Link>
            <Link href={"https://t.me/valavid_ir"}>
              <FaTelegramPlane />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
