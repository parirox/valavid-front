import { Disclosure } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";
import Chip from "./Chip";

export default function MenuBlogs({
  getBlogData,
  menuBlogsData,
  className,
  ...rest
}) {
  return (
    <div
      className={`bg-[#ECECEC] text-secondary p-5 rounded-[2rem] ${className}`}
    >
      <p className="text-[#D6DADC] pb-8">دسته بندی</p>
      <div className="text-secondary">
        {menuBlogsData.map((subject, index) => (
          <div
            key={index}
            className={`pb-4 pt-2 ${
              index < menuBlogsData.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex flex-row py-1 items-center justify-start w-full gap-3 cursor-pointer">
                    {subject.children.length !== 0 ? (
                      <IoIosArrowDown
                        className={`rotate-90 transition-all duration-100 text-2xl font-thin text-accent ${
                          open ? "rotate-[0deg] text-[#90999F]" : "rotate-90"
                        }`}
                      />
                    ) : (
                      ""
                    )}
                    <p
                      onClick={() =>
                        // subject.children.length === 0 &&
                        getBlogData({ category: subject.name })
                      }
                      className={`text-[1.1rem] font-thin text-secondary ${
                        subject.children.length === 0 ? "pr-9" : ""
                      }`}
                    >
                      {subject.name}
                    </p>
                    <Chip
                      href={"#" + subject.id}
                      content={subject.blog_count}
                      className="mr-auto bg-[#F2F4F4] px-[0.75rem] py-[0.5rem]"
                    ></Chip>
                  </Disclosure.Button>
                  {subject.children.length !== 0 ? (
                    <Disclosure.Panel className="px-6 pt-8 pb-4 text-sm flex flex-col gap-8">
                      {subject.children.map((child, index) => (
                        <p
                          onClick={() =>
                            getBlogData({ category: subject.name })
                          }
                          className="text-[1.1rem] font-thin text-secondary pr-9 cursor-pointer"
                          key={index}
                        >
                          {child.name}
                        </p>
                      ))}
                    </Disclosure.Panel>
                  ) : (
                    ""
                  )}
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </div>
  );
}
