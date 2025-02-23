
export type ColorRGB = `rgb(${number}, ${number}, ${number})`;
export type ColorRGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type ColorHEX = `#${string}`;
export type colorHSL = `hsl(${number}, ${number}, ${number})`;
export type colorHSLA = `hsla(${number}, ${number}, ${number}, ${number})`;
export type Color = ColorRGB | ColorRGBA | ColorHEX | colorHSL | colorHSLA;

// Get a random number in the range
export function getRandomIntInclusive(min: number, max: number): number {
    const RANDOM_BUFFER = new Uint32Array(1);

    window.crypto.getRandomValues(RANDOM_BUFFER);

    const RANDOM_NUMBER = RANDOM_BUFFER[0] / (0xffffffff + 1);

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(RANDOM_NUMBER * (max - min + 1)) + min;
}

// Compute similarity between two colours
export function colorSimilarity(rgb1:ColorRGB, rgb2:ColorRGB) {
    // Parse the RGB strings into individual components
    const parseRgb = (rgb:ColorRGB) => rgb.match(/\d+/g)?.map(Number);
    
    const [r1, g1, b1] = parseRgb(rgb1) || [0, 0, 0];
    const [r2, g2, b2] = parseRgb(rgb2) || [0, 0, 0];
  
    // Calculate the Euclidean distance between the two colors
    const distance = Math.sqrt(
      Math.pow(r1 - r2, 2) +
      Math.pow(g1 - g2, 2) +
      Math.pow(b1 - b2, 2)
    );
  
    // Normalize the distance to a similarity score (0 = identical, 1 = most different)
    const maxDistance = Math.sqrt(Math.pow(255, 2) * 3); // Max possible distance
    const similarity = 1 - distance / maxDistance;
  
    return similarity; // Similarity as a decimal between 0 and 1
}

//Hex to RGB
export function hexToRGB(hex:ColorHEX):ColorRGB {
  // Remove the hash (#) if it exists
  let hexNoHash = hex.replace(/^#/, "");
  // If the hex is in shorthand form (e.g., #03F), expand it to full form (#0033FF)
  if (hexNoHash.length === 3) {
    hexNoHash = hexNoHash.split("").map(char => char + char).join("");
  }

  // Convert the expanded hex string to RGB values
  const bigint = parseInt(hexNoHash, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgb(${r}, ${g}, ${b})`;
}



//////////////////////////////////////////////////////////
//Compare color difference in RGB
// export function colorDifference(color1: ColorRGB, color2: ColorRGB) {
//     const rgb1 = color1.match(/rgb\((\d+),(\d+),(\d+)\)/)?.slice(1).map(Number);
//     const rgb2 = color2.match(/rgb\((\d+),(\d+),(\d+)\)/)?.slice(1).map(Number);
//     if (!rgb1 || !rgb2) return null;

//     const [r1, g1, b1] = rgb1,
//         [r2, g2, b2] = rgb2;
    
//     const d = Math.sqrt((r2-r1)^2+(g2-g1)^2+(b2-b1)^2);
//     const p = d / (Math.sqrt((255)^2+(255)^2+(255)^2));

//     return p;
// }

// //Compare color difference in RGB
// export function deltaRgb(color1: ColorRGB, color2: ColorRGB) {
//     const rgb1 = color1.match(/rgb\((\d+),(\d+),(\d+)\)/)?.slice(1).map(Number);
//     const rgb2 = color2.match(/rgb\((\d+),(\d+),(\d+)\)/)?.slice(1).map(Number);
//     if (!rgb1 || !rgb2) return null;

//     const [r1, g1, b1] = rgb1,
//         [r2, g2, b2] = rgb2,
//         drp2 = Math.pow(r1 - r2, 2),
//         dgp2 = Math.pow(g1 - g2, 2),
//         dbp2 = Math.pow(b1 - b2, 2),
//         t = (r1 + r2) / 2

//     return Math.sqrt(2 * drp2 + 4 * dgp2 + 3 * dbp2 + t * (drp2 - dbp2) / 256)
// }

// const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
//     const hex = x.toString(16)
//     return hex.length === 1 ? '0' + hex : hex
// }).join('');
// const hexToRgb = hex =>
//     hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
//         , (m, r, g, b) => '#' + r + r + g + g + b + b)
//         .substring(1).match(/.{2}/g)
//         .map(x => parseInt(x, 16));
// const rgbToHex = (r, g, b) => '#' + [r, g, b]
//   .map(x => x.toString(16).padStart(2, '0')).join('');

// export function hexToRgbNew(hex: ColorHEX) {
//     const arrBuff = new ArrayBuffer(4);
//     const vw = new DataView(arrBuff);
//     vw.setUint32(0, parseInt(hex, 16), false);
//     const arrByte = new Uint8Array(arrBuff);

//     return arrByte[1] + "," + arrByte[2] + "," + arrByte[3];
// }
// export function hexToRgb4(hex: ColorHEX) {
//     // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
//     const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
//     hex = <ColorHEX>hex.replace(shorthandRegex, function (m, r, g, b) {
//         return r + r + g + g + b + b;
//     });

//     const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//     return result ? {
//         r: parseInt(result[1], 16),
//         g: parseInt(result[2], 16),
//         b: parseInt(result[3], 16)
//     } : null;
// }

// export const hexToRGB2 = (hexValue: ColorHEX):ColorRGB => {
//     const numericValue = parseInt(hexValue, 16);
//     const r = (numericValue >> 16) & 0xff;
//     const g = (numericValue >> 8) & 0xff;
//     const b = numericValue & 0xff;
//     return `rgb(${r}, ${g}, ${b})`;
// };

// export function hexToRGB3(hex: ColorHEX) {
//     const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//     return result ? {
//         r: parseInt(result[1], 16),
//         g: parseInt(result[2], 16),
//         b: parseInt(result[3], 16)
//     } : null;
// }

// export function componentToHex(c: number) {
//     const hex = c.toString(16);
//     return hex.length == 1 ? "0" + hex : hex;
// }

// export function rgbToHex(r: number, g: number, b: number) {
//     return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
// }