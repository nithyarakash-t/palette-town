import { Slider } from "../slider/Slider";
import { Chart } from "../chart/Chart";
import { useState } from "react";
import { Tolerance } from "../Csscolors";
import './Main.scss';
import { ColorListItem } from "../data/parsedUniqueColors";

export function Main() {
    const [hue, setHue] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [hueTolerance, setHueTolerance] = useState<Tolerance>({ min: 5, val: 5 })
    const [selectedColor, setSelectedColor] = useState<ColorListItem | null>(null);

    return (
        <div className="app-fullwidth">
            <div className="app-grid cc-main__wrap">
                <div className="cc-main__inner">
                    <Slider hueValue={hue} setHueValue={setHue} toggle={toggle} setToggle={setToggle} tolerance={hueTolerance} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
                    <Chart hue={hue} tolerance={hueTolerance} setTolerance={setHueTolerance} mono={toggle} selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
                </div>
            </div>
        </div>
    )
}