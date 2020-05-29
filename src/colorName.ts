const colorNameList = require("color-name-list");
const nearestColors = require("nearest-color");

export const searchMatchColor = (targetHex: string) => {
  const matchColor = colorNameList.find(
    (color: any) => color.hex === targetHex
  );
  return matchColor ? matchColor.name : "";
};

type Color = {
  name: string;
  hex: string;
};

type Colors = { [key: string]: string };
export const searchNearestColor = (targetHex: string) => {
  const colors: Colors = colorNameList.reduce(
    (obj: Colors, { name, hex }: Color) => {
      return Object.assign(obj, { [name]: hex });
    },
    {}
  );

  const nearest = nearestColors.from(colors);
  const nearestName = nearest(targetHex);

  return nearestName ? nearestName.name : "";
};
