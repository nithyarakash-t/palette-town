import React, { createContext, useEffect, useState } from "react";

// const RGBA_RANGE = {
//     red: { min: 0, max: 255 },
//     green: { min: 0, max: 255 },
//     blue: { min: 0, max: 255 },
//     alpha: {min: 0, max: 100}
// } as const; // `as const` ensures these values are read-only
// type RangedNumber<T extends number> = T & { _brand: "RangedNumber" };
// function createRangedNumber<T extends number>(value: T, min: number, max: number): RangedNumber<T> {
//   if (value < min || value > max) {
//     throw new Error(`Value must be between ${min} and ${max}`);
//   }
//   return value as RangedNumber<T>;
// }

export type MetaColorNumber = number; //RangedNumber<number>;
export type MetaColorSetter = React.Dispatch<React.SetStateAction<MetaColorNumber>>
type MetaColorContextType = {
  red: MetaColorNumber,
  setRed: MetaColorSetter,
  green: MetaColorNumber,
  setGreen: MetaColorSetter,
  blue: MetaColorNumber,
  setBlue: MetaColorSetter
};

const MetaColorContext = createContext<MetaColorContextType | undefined>(undefined);

export const MetaColorContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [red, setRed] = useState<MetaColorNumber>(10);
  const [green, setGreen] = useState<MetaColorNumber>(100);
  const [blue, setBlue] = useState<MetaColorNumber>(80);

  useEffect(() => {
    const styleTag = document.getElementById("dynamic-style") || document.createElement("style");
    styleTag.id = "dynamic-style";
    styleTag.innerHTML = `:root { --meta-color: rgb(${red}, ${green}, ${blue}); }`;
    document.head.appendChild(styleTag);
    // document.documentElement.style.setProperty("--metacolor", `rgb(${red}, ${green}, ${blue})`);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, [red, green, blue]);

  return (
    <MetaColorContext.Provider value={{ red, setRed, green, setGreen, blue, setBlue }}>
      {children}
    </MetaColorContext.Provider>
  );
}

export default MetaColorContext;