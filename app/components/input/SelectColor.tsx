"use client";

import { ImageType } from "@/app/admin/add-products/AddProductForm";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import SelectImage from "./SelectImage";
import Button from "../Button";

interface SelectColorProps {
  item: ImageType;
  addImageToState: (value: ImageType) => void;
  removeImageFromState: (value: ImageType) => void;
  isProductCreated: boolean;
}

const SelectColor: React.FC<SelectColorProps> = ({
  item,
  addImageToState,
  removeImageFromState,
  isProductCreated,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);

  const handleFileChange = useCallback(
    (value: File) => {
      setFile(value);
      addImageToState({ ...item, image: value });
    },
    [addImageToState, item],
  );

  const handleCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setIsSelected(e.target.checked);

      if (!e.target.checked) {
        setFile(null);
        removeImageFromState(item);
      }
    },
    [item, removeImageFromState],
  );

  return (
    <div className="grid grid-cols-1 items-center overflow-y-auto border-b-[1.2px] border-slate-400 p-2 md:grid-cols-2">
      <div className="flex h-[70px] flex-row items-center gap-2">
        <input
          id={item.color}
          type="checkbox"
          checked={isSelected}
          onChange={handleCheck}
          className="cursor-pointer"
        />
        <label
          htmlFor={item.color}
          className="flex cursor-pointer items-center gap-2 font-medium"
        >
          <div
            style={{ backgroundColor: item.colorCode }}
            className="h-4 w-4 rounded-full border-[1px] border-slate-500"
          ></div>
          {item.color}
        </label>
      </div>
      <>
        {isSelected && !file && (
          <div className="col-span-2 text-center">
            <SelectImage item={item} handleFileChange={handleFileChange} />
          </div>
        )}
        {file && (
          <div className="col-span-2 flex flex-row items-center justify-between gap-2 text-sm">
            <p>{file?.name}</p>
            <div className="w-[70px]">
              <Button
                label="Cancel"
                small
                clear
                onClick={() => {
                  setFile(null);
                  removeImageFromState(item);
                }}
              />
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default SelectColor;
