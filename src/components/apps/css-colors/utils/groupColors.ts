import { parsedUniqueColors } from '../data/parsedUniqueColors';
import { filterColorsByHue, groupColorsByLightness, isMonochrome } from './utils';

export const groupColors = (hue:number, tolerance:number, mono:boolean) => {
    const baseColors = parsedUniqueColors.filter((color)=> mono ? isMonochrome(color) : !isMonochrome(color));
    const sortedColors = [...baseColors].sort((a, b) => a.hsl[1] - b.hsl[1])
    
    const colorsFilteredByHue = filterColorsByHue(sortedColors, hue, tolerance)
    const lightnessGroups = groupColorsByLightness(colorsFilteredByHue.list, tolerance)

    const finalColorsList = lightnessGroups.filter(group => !!group.length)
    
    return {
      list: finalColorsList,
      tolerance: colorsFilteredByHue.tolerance
    }
}
  