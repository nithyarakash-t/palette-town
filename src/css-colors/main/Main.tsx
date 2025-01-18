import { Slider } from "../slider/Slider";
import { Chart } from "../chart/Chart";
import { useState } from "react";
import { Tolerance } from "../Csscolors";
import './Main.scss';

export function Main() {
    const [hue, setHue] = useState(0);
        const [toggle, setToggle]= useState(false);
        const [hueTolerance, setHueTolerance] = useState<Tolerance>({min: 5, val: 5})
    
        return (
            <div className="app-fullwidth">
                <div className="app-grid cc-main__wrap">
                    <div className="cc-main__inner">
                        <Slider hueValue={hue} setHueValue={setHue} toggle={toggle} setToggle={setToggle} tolerance={hueTolerance}/>
                        <Chart hue={hue} tolerance={hueTolerance} setTolerance={setHueTolerance} mono={toggle}/>
                    </div>
                </div>
            </div>
        )
}