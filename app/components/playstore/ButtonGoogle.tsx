import Image from "next/image";

const ButtonGoogle = () => {
  return (
    <div className="flex items-center">
      <button className="flex bg-white text-slate-800 py-1 px-4 rounded-md hover:opacity-80 transition">
        <div className="flex items-center">
          <div>
            <Image src="/google.png" alt="playstore" width={40} height={40} />
          </div>
        </div>
        <div className="flex flex-col ml-2">
          <div className="text-xs">Get it On</div>
          <div className="text-sm font-semibold">Playstore</div>
        </div>
      </button>
    </div>
  );
};

export default ButtonGoogle;
