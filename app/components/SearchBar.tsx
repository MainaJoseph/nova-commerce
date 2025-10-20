"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { Search, X } from "lucide-react";

const SearchBar = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });

  const searchTerm = watch("searchTerm");

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      if (!data.searchTerm) return router.push("/");

      const url = queryString.stringifyUrl(
        {
          url: "/",
          query: {
            searchTerm: data.searchTerm,
          },
        },
        { skipNull: true },
      );

      router.push(url);
      // Don't reset or collapse after search if there's a search term
    },
    [router],
  );

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleClear = () => {
    reset();
    setIsExpanded(false);
  };

  const handleBlur = () => {
    // Only collapse if there's no text in the input
    setTimeout(() => {
      if (!searchTerm || searchTerm.trim() === "") {
        setIsExpanded(false);
      }
    }, 200);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
      <div
        className={`group relative overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "w-64 md:w-96" : "w-32"} `}
      >
        <div
          onClick={!isExpanded ? handleExpand : undefined}
          className={`flex cursor-pointer items-center gap-2 rounded-full border-2 border-orange-400 bg-white px-5 py-3 transition-all duration-500 ${isExpanded ? "shadow-lg" : "shadow-sm hover:shadow-md"} `}
        >
          <Search className="flex-shrink-0 text-orange-500" size={20} />

          <input
            {...register("searchTerm")}
            autoComplete="off"
            type="text"
            placeholder={isExpanded ? "Search products, brands..." : ""}
            onFocus={handleExpand}
            onBlur={handleBlur}
            className={`flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 transition-all duration-500 focus:outline-none ${isExpanded ? "w-full opacity-100" : "w-0 opacity-0"} `}
          />

          {isExpanded && searchTerm && searchTerm.trim() !== "" && (
            <button
              type="button"
              onClick={handleClear}
              className="flex-shrink-0 rounded-full p-1 transition-colors duration-200 hover:bg-gray-100"
            >
              <X className="text-gray-400 hover:text-gray-600" size={16} />
            </button>
          )}

          {!isExpanded && (
            <span className="whitespace-nowrap text-sm font-medium text-orange-600">
              Search
            </span>
          )}
        </div>
      </div>

      {isExpanded && (
        <button
          type="submit"
          className="animate-in fade-in slide-in-from-right-5 flex transform items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400 px-6 py-3 text-sm font-medium text-orange-800 shadow-sm transition-all duration-300 hover:scale-105 hover:from-orange-300 hover:via-orange-400 hover:to-orange-500 hover:shadow-md"
        >
          <Search size={18} />
          <span className="hidden sm:inline">Search</span>
        </button>
      )}
    </form>
  );
};

export default SearchBar;
