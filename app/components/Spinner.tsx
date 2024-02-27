import { MdCached } from "react-icons/md";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin">
        <MdCached className="h-6 w-6 text-gray-600" />
      </div>
    </div>
  );
};

export default Spinner;
