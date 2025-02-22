import { useState } from "react"
import { ControlsAndResult } from "../controls/Controls";
import { Player, Simulation, Quote } from "../preview/Preview";
import { ColorDeficiencyEnum } from "../preview/types";

import './Main.scss';

export function Main() {
    const [foreground, setForeground] = useState("#000000");
    const [background, setBackground] = useState("#ffffff");
    const [link, setLink] = useState("#345acb");
    const [linkActive, setLinkActive] = useState("#a100ff");

    const [simulation, setSimulation] = useState<ColorDeficiencyEnum>(ColorDeficiencyEnum.None);

    return (
        <section className="cxc-main__wrap" style={{
            "--_foreground": foreground,
            "--_background": background,
            "--_link": link,
            "--_link-active": linkActive,
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
                    foreground={foreground} setForeground={setForeground}
                    background={background} setBackground={setBackground}
                    link={link} setLink={setLink}
                    linkActive={linkActive} setLinkActive={setLinkActive}
                />
            </div>
        </section>
    )
}


