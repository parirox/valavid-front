import Image from "next/image";

const NoContent = () => {
  return (
    <div className={"w-full h-72 relative my-20"}>
      <Image fill className={"object-contain"} src={"/images/NoContent.png"} alt={"محتوایی وجود ندارد"}/>
      <div className={"text-secondary-300 text-lg text-center -bottom-10 absolute left-0 right-0"}>محتوایی وجود ندارد</div>
    </div>
  );
};

export default NoContent;