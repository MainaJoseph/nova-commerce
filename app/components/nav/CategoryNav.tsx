import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import queryString from "query-string";

interface CategoryNavProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryNav: React.FC<CategoryNavProps> = ({
  label,
  icon: Icon,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    if (label === "All") {
      router.push("/");
    } else {
      let currentQuery = {};

      if (params) {
        currentQuery = queryString.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        category: label,
      };

      const url = queryString.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        {
          skipNull: true,
        },
      );

      router.push(url);
    }
  }, [label, router, params]);

  return (
    <div
      onClick={handleClick}
      className={`group relative flex cursor-pointer items-center justify-start gap-2 border-b-2 px-4 py-3 transition-all duration-300 hover:border-orange-400 hover:bg-orange-50 ${
        selected
          ? "border-orange-500 bg-orange-50 font-semibold text-orange-600"
          : "border-transparent text-slate-600 hover:text-orange-500"
      } `}
    >
      <Icon
        size={20}
        className={`transition-transform duration-300 ${selected ? "scale-110" : "group-hover:scale-110"} `}
      />
      <div className="whitespace-nowrap text-sm font-medium">{label}</div>

      {/* Active indicator dot */}
      {selected && (
        <div className="absolute bottom-0 left-4 mb-[-3px] h-1 w-1 rounded-full bg-orange-500" />
      )}
    </div>
  );
};

export default CategoryNav;
