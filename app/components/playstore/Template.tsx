import Image from "next/image";

const Template = () => {
  return (
    <div className="w-full mb-3 md:mb-[-30px] md:z-10">
      <Image
        className="mx-auto max-w-full h-auto"
        src="/scrop.png"
        alt="Nova app"
        width={400}
        height={500}
      />
    </div>
  );
};

export default Template;
