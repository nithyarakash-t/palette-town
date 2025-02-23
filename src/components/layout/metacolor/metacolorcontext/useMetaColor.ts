import { useContext } from "react";
import MetaColorContext from "./MetaColorContext";

// Custom hook to use the context
export const useMetaColor = () => {
    const context = useContext(MetaColorContext);
    if (!context) {
      throw new Error("MetaColorContext values unavailable");
    }
    return context;
};
  