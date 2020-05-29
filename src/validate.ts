const regex = {
  fex: /(#([\da-fA-F]{6}|[\da-fA-F]{3}))/,
  rgb: /(rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\))/,
  rgba: /(rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\))/,
};

const fexRegex = new RegExp(regex.fex);
const rgbRegex = new RegExp(regex.rgb);
const rgbaRegex = new RegExp(regex.rgba);

const isFex = (code: string) => {
  return fexRegex.test(code);
};

const isRgb = (code: string) => {
  return rgbRegex.test(code);
};

const isRgba = (code: string) => {
  return rgbaRegex.test(code);
};

export const validateColorCode = (code: string): boolean => {
  return isFex(code) || isRgb(code) || isRgba(code);
};

export const extractFex = (code: string) => {
  const match = code.match(fexRegex);
  if (!match) return "";
  return match[1];
};

export const extractRgb = (code: string) => {
  const match = code.match(rgbRegex);
  if (!match) return "";
  return match[1];
};

export const extractRgba = (code: string) => {
  const match = code.match(rgbaRegex);
  if (!match) return "";
  return match[1];
};

export const extractColor = (code: string) => {
  return extractFex(code) || extractRgb(code) || extractRgba(code) || "";
};
