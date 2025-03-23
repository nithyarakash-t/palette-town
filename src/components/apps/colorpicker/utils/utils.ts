//types
export type ColorRGB = `rgb(${number}, ${number}, ${number})`;
export type ColorRGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type ColorHEX = `#${string}`;
export type ColorHSL = `hsl(${number}, ${number}, ${number})`;
export type ColorHSLA = `hsla(${number}, ${number}, ${number}, ${number})`;
export type Color = ColorRGB | ColorRGBA | ColorHEX | ColorHSL | ColorHSLA;

/**Conversion methods */
export function convertHexToRGB(hex:ColorHEX):ColorRGB {
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

export function convertRGBToHex(rgb:ColorRGB):ColorHEX {
  // Extract the RGB values from the string
  const [r, g, b] = rgb.match(/\d+/g)!.map(Number);
  // Convert the RGB values to a hex string
  const hex = ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");

  return `#${hex}`;
}

export function convertHSLAtoHex(hsla: ColorHSLA = 'hsla(0, 0, 0, 1)'): ColorHEX {
    // Extract numbers and handle percentage values
    const matches = hsla.match(/[\d.]+/g);
    if (!matches || matches.length !== 4) {
        return '#000000';
    }

    // Normalize values to correct ranges
    const hue = Math.min(360, Math.max(0, parseInt(matches[0])));
    const saturation = Math.min(100, Math.max(0, parseInt(matches[1]))) / 100;
    const lightness = Math.min(100, Math.max(0, parseInt(matches[2]))) / 100;
    const alpha = Math.min(100, Math.max(0, parseInt(matches[3]))) / 100;

    // Calculate RGB values
    const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const huePrime = hue / 60;
    const x = chroma * (1 - Math.abs((huePrime % 2) - 1));
    const m = lightness - chroma / 2;

    let r = 0, g = 0, b = 0;

    if (huePrime >= 0 && huePrime <= 1) { r = chroma; g = x; b = 0; }
    else if (huePrime > 1 && huePrime <= 2) { r = x; g = chroma; b = 0; }
    else if (huePrime > 2 && huePrime <= 3) { r = 0; g = chroma; b = x; }
    else if (huePrime > 3 && huePrime <= 4) { r = 0; g = x; b = chroma; }
    else if (huePrime > 4 && huePrime <= 5) { r = x; g = 0; b = chroma; }
    else if (huePrime > 5 && huePrime <= 6) { r = chroma; g = 0; b = x; }

    // Convert to 8-bit integers
    const red = Math.round((r + m) * 255);
    const green = Math.round((g + m) * 255);
    const blue = Math.round((b + m) * 255);
    const alphaInt = Math.round(alpha * 255);

    // Convert to hex
    const toHex = (n: number) => n.toString(16).padStart(2, '0');

    return alpha < 1 
        ? `#${toHex(red)}${toHex(green)}${toHex(blue)}${toHex(alphaInt)}`
        : `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}