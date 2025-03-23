//types
export type ColorRGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type ColorHEX = `#${string}`;
export type ColorHSLA = `hsla(${number}, ${number}%, ${number}%, ${number})`;
export type Color = ColorRGBA | ColorHEX | ColorHSLA;

/**Conversion methods */
export function convertHexToRGBA(hex: ColorHEX): ColorRGBA {
    // Remove the hash (#) if it exists
    const hexNoHash = hex.replace(/^#/, "");
    
    // Handle both 6-digit and 8-digit hex
    let r, g, b, a = 1;
    
    if (hexNoHash.length === 8) {
        r = parseInt(hexNoHash.slice(0, 2), 16);
        g = parseInt(hexNoHash.slice(2, 4), 16);
        b = parseInt(hexNoHash.slice(4, 6), 16);
        a = parseInt(hexNoHash.slice(6, 8), 16) / 255;
    } else {
        r = parseInt(hexNoHash.slice(0, 2), 16);
        g = parseInt(hexNoHash.slice(2, 4), 16);
        b = parseInt(hexNoHash.slice(4, 6), 16);
    }

    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function convertRGBAToHex(rgba: ColorRGBA): ColorHEX {
    // Extract the RGBA values from the string
    const matches = rgba.match(/[\d.]+/g);
    if (!matches || matches.length !== 4) {
        return '#000000';
    }

    // Convert values to numbers and clamp to valid ranges
    const [r, g, b] = matches.slice(0, 3).map(val => Math.min(255, Math.max(0, parseInt(val))));
    const alpha = Math.min(1, Math.max(0, parseFloat(matches[3])));
    
    // Convert to hex
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    const alphaHex = Math.round(alpha * 255);

    return alpha < 1
        ? `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alphaHex)}`
        : `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}


export function convertHSLAtoHex(hsla: ColorHSLA = 'hsla(0, 50%, 50%, 1)'): ColorHEX {
    const rgba = convertHSLAtoRGBA(hsla);
    return convertRGBAToHex(rgba);
}


export function convertHSLAtoRGBA(hsla: ColorHSLA): ColorRGBA {
    // Updated regex to handle percentage signs
    const matches = hsla.match(/[\d.]+/g);
    if (!matches || matches.length !== 4) {
        return 'rgba(0, 0, 0, 1)';
    }

    // Note: saturation and lightness already come with % in the type
    const hue = Math.min(360, Math.max(0, parseInt(matches[0])));
    const saturation = Math.min(100, Math.max(0, parseInt(matches[1]))) / 100;
    const lightness = Math.min(100, Math.max(0, parseInt(matches[2]))) / 100;
    const alpha = Math.min(100, Math.max(0, parseInt(matches[3]))) / 100;

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

    const red = Math.round((r + m) * 255);
    const green = Math.round((g + m) * 255);
    const blue = Math.round((b + m) * 255);

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export function convertRGBAtoHSLA(rgba: ColorRGBA): ColorHSLA {
    const matches = rgba.match(/[\d.]+/g);
    if (!matches || matches.length !== 4) {
        return 'hsla(0, 0%, 0%, 1)';
    }

    const [r, g, b] = matches.slice(0, 3).map(val => parseInt(val) / 255);
    const alpha = parseFloat(matches[3]);

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0;
    let s = 0;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    // Updated return to include % signs for saturation and lightness
    return `hsla(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, ${alpha})`;
}



/**
 * 
 * export function convertHexToRGB(hex:ColorHEX):ColorRGB {
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
 */