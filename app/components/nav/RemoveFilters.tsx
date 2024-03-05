"use client";

import { useRouter } from "next/navigation";
import Button from "../Button";

const RemoveFilters = () => {
  const router = useRouter();
  return (
    <div>
      <div>
        <Button
          clear
          label="Remove Filters"
          outline
          onClick={() => {
            router.push("/");
          }}
        />
      </div>
    </div>
  );
};

export default RemoveFilters;
