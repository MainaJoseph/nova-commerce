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
        }
      );

      router.push(url);
    }
  }, [label, router, params]);

  return (
    <div
      onClick={handleClick}
      className={`flex items-start justify-start  gap-1 p-2 border-b-2 hover:text-orange-500 transition cursor-pointer 
    ${
      selected
        ? "border-b-orange-500 text-orange-500"
        : "border-tranparent text-slate-500"
    }
    `}
    >
      <Icon size={20} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryNav;
