//types
export type ColorRGB = `rgb(${number}, ${number}, ${number})`;
export type ColorRGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type ColorHEX = `#${string}`;
export type colorHSL = `hsl(${number}, ${number}, ${number})`;
export type colorHSLA = `hsla(${number}, ${number}, ${number}, ${number})`;
export type Color = ColorRGB | ColorRGBA | ColorHEX | colorHSL | colorHSLA;

/**Conversion methods */
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