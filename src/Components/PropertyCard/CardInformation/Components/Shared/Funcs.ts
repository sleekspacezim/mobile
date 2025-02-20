export const processSizeDimensions = (
  sizeDimensions: string,
  sizeNumber: number
) => {
  if (sizeDimensions === "Acres") {
    if (sizeNumber === 1) return "Acre";
    else return sizeDimensions;
  }
  if (sizeDimensions === "Square meters") return "m²";
  else return sizeDimensions;
};
