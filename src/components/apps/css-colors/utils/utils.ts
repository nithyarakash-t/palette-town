import { ColorListItem } from "../data/parsedUniqueColors";

const { abs } = Math;
const getNumbers = (n:number) => [...Array(n).keys()];
export const formatRGB = (rgb:ColorListItem["rgb"]) => `rgb(${rgb.join(', ')})`;
export const formatHSL = (hsl:ColorListItem["hsl"]) => `hsl(${hsl.map((_, i) => i === 0 ? _ : `${_}%`).join(', ')})`;
export const exampleHues = [13, 25, 36, 47, 105, 150, 178, 210, 240, 297, 336, 350]
export const isMonochrome = (color:ColorListItem) => color.hsl[1] === 0;
export const isNonMonochrome = (color:ColorListItem) => !isMonochrome(color);

export const filterColorsByHue = (colorList:ColorListItem[], hue:number, tolerance:number):{
    list: ColorListItem[];
    tolerance: number;
} => {
    const colors = colorList.filter(color =>  Math.abs(hue - color.hsl[0]) < tolerance)
    if (colors.length) {
      return {
        list: colors,
        tolerance
      } 
    }
    return filterColorsByHue(colorList, hue, tolerance + 1)
}
export const groupColorsByLightness = (colorList:ColorListItem[], tolerance:number) => {
    return getNumbers(100 / tolerance + 1).map(t =>
      colorList.filter(color => {
        const difference = 100 - color.hsl[2] - t * tolerance
        const differenceLimit = tolerance / 2
        if (abs(difference) === differenceLimit) {
          return difference > 0
        }
        return abs(difference) < differenceLimit
      })
    )
}