import { IconType } from "react-icons";

interface AgentNavItemProps {
  selected?: boolean;
  icon: IconType;
  label: string;
}

const AgentNavItem: React.FC<AgentNavItemProps> = ({
  selected,
  icon: Icon,
  label,
}) => {
  return (
    <div
      className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-orange-400 transition cursor-pointer text-orange-500 ${
        selected ? "border-b-orange-500" : "border-transparent"
      }`}
    >
      <Icon size={20} />
      <div className="font-medium text-sm text-center break-normal text-slate-600 hover:text-slate-800">
        {label}
      </div>
    </div>
  );
};

export default AgentNavItem;
