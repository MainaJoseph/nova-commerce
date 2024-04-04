// utils/TruncateText.ts
export const TruncateTextOne = (str: string) => {
  if (str.length <= 12) return str;

  return str.substring(0, 12) + "...";
};
