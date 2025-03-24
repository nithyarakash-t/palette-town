//types
export type ColorHEX = `#${string}`;
export type ColorRGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type ColorHSLA = `hsla(${number}, ${number}%, ${number}%, ${number})`;
export type ColorHWB = `hwb(${number} ${number} ${number} / ${number})`;
export type Color = ColorRGBA | ColorHEX | ColorHSLA | ColorHWB;

//needs verification
export type ColorHSL = `hsl(${number} ${number} ${number} / ${number})`;
export type ColorRGB = `rgb(${number} ${number} ${number} / ${number})`;
export type ColorLAB = `lab(${number} ${number} ${number} / ${number})`;
export type ColorOKLCH = `oklch(${number} ${number} ${number} / ${number})`;
export type ColorLCH = `lch(${number} ${number} ${number} / ${number})`;
export type ColorCMYK = `cmyk(${number} ${number} ${number} ${number} / ${number})`;

/**Conversion methods */
export function convertHexToRGBA(hex: ColorHEX): { r: number; g: number; b: number; a: number } {
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

    // return `rgba(${r}, ${g}, ${b}, ${a})`;
    return {
        r: r,
        g: g,
        b: b,
        a: a
    }
}
export function convertHexToHSLA(hex: ColorHEX): { h: number; s: number; l: number; a: number } {
    // Remove the hash and handle both 6 and 8 digit hex
    const hexNoHash = hex.replace(/^#/, "");
    
    // Convert hex to rgba values
    let r, g, b, a = 1;
    if (hexNoHash.length === 8) {
        r = parseInt(hexNoHash.slice(0, 2), 16) / 255;
        g = parseInt(hexNoHash.slice(2, 4), 16) / 255;
        b = parseInt(hexNoHash.slice(4, 6), 16) / 255;
        a = parseInt(hexNoHash.slice(6, 8), 16) / 255;
    } else {
        r = parseInt(hexNoHash.slice(0, 2), 16) / 255;
        g = parseInt(hexNoHash.slice(2, 4), 16) / 255;
        b = parseInt(hexNoHash.slice(4, 6), 16) / 255;
    }

    // Find greatest and smallest channel values
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    // Calculate hue and saturation
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

    // Convert to degrees and percentages
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
        a: Math.round(a * 100)
    };
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

/**TO BE FIXED */
export function convertHexToHWB(hex: ColorHEX): {h: number, w: number, b: number, a: number} {
    const { r, g, b, a } = convertHexToRGBA(hex);
  
    // Normalize RGB to 0-1 range
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
  
    // Calculate Whiteness (W) and Blackness (B)
    const whiteness = Math.min(rNorm, gNorm, bNorm);
    const blackness = 1 - Math.max(rNorm, gNorm, bNorm);
  
    // Calculate Hue (H)
    let hue = 0;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const chroma = max - min;
  
    if (chroma !== 0) {
      if (max === rNorm) {
        hue = ((gNorm - bNorm) / chroma) % 6;
      } else if (max === gNorm) {
        hue = (bNorm - rNorm) / chroma + 2;
      } else if (max === bNorm) {
        hue = (rNorm - gNorm) / chroma + 4;
      }
      hue *= 60; // Convert to degrees
      if (hue < 0) hue += 360;
    }
  
    // HWB values with inline bounds
    const h = Math.round(hue); // Hue is naturally 0-360 from calculation
    const w = Math.round(Math.min(Math.max(whiteness * 100, 0), 100)); // 0-100
    const bVal = Math.round(Math.min(Math.max(blackness * 100, 0), 100)); // 0-100
    const alpha = Math.min(Math.max(a, 0), 1); // 0-1
  
    return {
        h,
        w,
        b: bVal,
        a: alpha
    }
}
export function convertHWBToHex(hwb: ColorHWB): ColorHEX {
    const match = hwb.match(/^hwb\((\d+)\s+(\d+)\s+(\d+)\s*\/\s*([0-1]?\.?\d*)\)$/);
    if (!match) {
      throw new Error("Invalid HWB format. Must be hwb(H W B / A).");
    }
  
    const [, hStr, wStr, bStr, aStr] = match;
    const h = parseInt(hStr, 10);
    let w = parseInt(wStr, 10) / 100; // Convert percentage to 0-1
    let b = parseInt(bStr, 10) / 100; // Convert percentage to 0-1
    const a = parseFloat(aStr);
  
    /**
     * Normalizes whiteness (w) and blackness (b) if their sum exceeds 1 (100%). In HWB, 
     * `chroma = 1 - w - b` must be non-negative for valid RGB conversion. If `w + b > 1`, 
     * values are scaled proportionally to fit within 100%, aligning with CSS Color Module 
     * Level 4 (https://drafts.csswg.org/css-color-4/#hwb-color). For example, `hwb(200 60 60 / 1)` 
     * becomes `hwb(200 50 50 / 1)` to ensure a valid color (e.g., gray).
     */
    if (w + b > 1) {
        const scale = 1 / (w + b);
        w *= scale;
        b *= scale;
    }
  
    // Normalize hue to 0-360
    const hue = h % 360;
  
    // Convert HWB to RGB
    const chroma = 1 - w - b;
    let r = 0, g = 0, blue = 0;
  
    if (chroma !== 0) {
      const hPrime = hue / 60;
      const x = chroma * (1 - Math.abs(hPrime % 2 - 1));
      let rgb = [0, 0, 0];
  
      if (hPrime >= 0 && hPrime < 1) rgb = [chroma, x, 0];
      else if (hPrime < 2) rgb = [x, chroma, 0];
      else if (hPrime < 3) rgb = [0, chroma, x];
      else if (hPrime < 4) rgb = [0, x, chroma];
      else if (hPrime < 5) rgb = [x, 0, chroma];
      else if (hPrime < 6) rgb = [chroma, 0, x];
  
      r = rgb[0] + w;
      g = rgb[1] + w;
      blue = rgb[2] + w;
    } else {
      r = g = blue = w; // Grayscale case
    }
  
    // Convert to 0-255 range and format as HEX with inline bounds
    const rHex = Math.round(Math.min(Math.max(r * 255, 0), 255)).toString(16).padStart(2, "0");
    const gHex = Math.round(Math.min(Math.max(g * 255, 0), 255)).toString(16).padStart(2, "0");
    const bHex = Math.round(Math.min(Math.max(blue * 255, 0), 255)).toString(16).padStart(2, "0");
  
    // Handle alpha
    if (a < 1) {
      const aHex = Math.round(Math.min(Math.max(a * 255, 0), 255)).toString(16).padStart(2, "0");
      return `#${rHex}${gHex}${bHex}${aHex}` as ColorHEX;
    }
  
    return `#${rHex}${gHex}${bHex}` as ColorHEX;
}
  


// Helper functions to validate and parse HEX - from Claude
export function parseHex(hex: ColorHEX): { r: number; g: number; b: number; a: number } {
    if (!/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(hex)) {
      throw new Error("Invalid HEX format. Must be #RRGGBB or #RRGGBBAA.");
    }
  
    const hexValue = hex.slice(1); // Remove '#'
    const r = parseInt(hexValue.slice(0, 2), 16);
    const g = parseInt(hexValue.slice(2, 4), 16);
    const b = parseInt(hexValue.slice(4, 6), 16);
    const a = hexValue.length === 8 ? parseInt(hexValue.slice(6, 8), 16) / 255 : 1;
  
    return { r, g, b, a };
}
export function parseHex2(hex: ColorHEX): { r: number; g: number; b: number; a: number } {
    const hexNoHash = hex.replace(/^#/, "");
    if (hexNoHash.length !== 6 && hexNoHash.length !== 8) {
      throw new Error("HEX must be 6 or 8 characters (excluding #).");
    }
  
    const r = parseInt(hexNoHash.slice(0, 2), 16);
    const g = parseInt(hexNoHash.slice(2, 4), 16);
    const b = parseInt(hexNoHash.slice(4, 6), 16);
    const a = hexNoHash.length === 8 ? parseInt(hexNoHash.slice(6, 8), 16) / 255 : 1;
  
    return { r, g, b, a };
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