import { useReducer, useState } from "react"
import { ControlsAndResult } from "../controls/Controls";
import { Player, Simulation, Quote } from "../preview/Preview";
import { ColorDeficiencyEnum } from "../preview/types";

import './Main.scss';

export type ColorState = {
  foreground: string;
  background: string;
  link: string;
  linkActive: string;
};
export type ColorAction = 
  | { type: 'SET_FOREGROUND', payload: string }
  | { type: 'SET_BACKGROUND', payload: string }
  | { type: 'SET_LINK', payload: string }
  | { type: 'SET_LINK_ACTIVE', payload: string }
  | { type: 'SWAP_COLORS' };

// Reducer function
const colorReducer = (state: ColorState, action: ColorAction): ColorState => {
  switch (action.type) {
    case 'SET_FOREGROUND':
      return { ...state, foreground: action.payload };
    case 'SET_BACKGROUND':
      return { ...state, background: action.payload };
    case 'SET_LINK':
      return { ...state, link: action.payload };
    case 'SET_LINK_ACTIVE':
      return { ...state, linkActive: action.payload };
    case 'SWAP_COLORS':
      return { 
        ...state, 
        foreground: state.background,
        background: state.foreground 
      };
    default:
      return state;
  }
};
const initialColorState: ColorState = {
    foreground: "#000000", //#4dff00
    background: "#ffffff", //#000
    link: "#345acb", //#8d5cff
    linkActive: "#a100ff" //#e81111
};

export function Main() {
    const [colorState, dispatch] = useReducer(colorReducer, initialColorState);
    const [simulation, setSimulation] = useState<ColorDeficiencyEnum>(ColorDeficiencyEnum.None);

    return (
        <section className="cxc-main__wrap" style={{
            "--_foreground": colorState.foreground,
            "--_background": colorState.background,
            "--_link": colorState.link,
            "--_link-active": colorState.linkActive,
        } as React.CSSProperties}>
            <div className="cxc-main__content">
                {/* Preview Section: Displays text and links with chosen colors */}
                <div className="cxc-main__preview">
                    <div className="cxc-main__preview-head">
                        <h2>Preview</h2>
                        {/* Color simulation + tooltip */}
                        <Simulation simulation={simulation} setSimulation={setSimulation}/>
                    </div>
                    <div className="cxc-main__preview-body">
                        <Player simulation={simulation}/>
                        <Quote simulation={simulation}/>
                    </div>
                </div>
                {/* Control Section: Inputs for user to select colors */}
                <ControlsAndResult 
                    colorState={colorState}
                    dispatch={dispatch}
                />
            </div>
        </section>
    )
}


