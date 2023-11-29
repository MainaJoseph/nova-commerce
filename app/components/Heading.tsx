interface HeadingProps {
  title: string;
  center?: boolean;
  color?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, center, color }) => {
  return (
    <div
      className={`${center ? "text-center" : "text-start"} ${
        color ? (color === "orange" ? "text-orange-400" : "text-slate-500") : ""
      }`}
    >
      <h1 className="font-bold text-2xl">{title}</h1>
    </div>
  );
};

export default Heading;
