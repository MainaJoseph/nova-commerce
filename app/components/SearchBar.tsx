"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useCallback } from "react";

const SearchBar = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });

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
        { skipNull: true }
      );

      router.push(url);
      reset();
    },
    [router, reset]
  );

  // Function to handle Enter key press
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSubmit(onSubmit)(e);
      }
    },
    [handleSubmit, onSubmit]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress as any); // Casting handleKeyPress to any
    return () => {
      document.removeEventListener("keydown", handleKeyPress as any);
    };
  }, [handleKeyPress]); // Add any dependencies if needed

  return (
    <div className="flex items-center">
      <input
        {...register("searchTerm")}
        autoCapitalize="off"
        type="text"
        placeholder="Explore Nova"
        className="p-2 border border-slate-400 rounded-md focus:outline-none focus:border-[0.5px] focus:border-orange-300 w-80"
      />
      <button
        onClick={handleSubmit(onSubmit)}
        className="bg-orange-400 hover:opacity-80 text-white p-2 rounded-r-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
