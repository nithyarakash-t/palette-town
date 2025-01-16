import { Slider } from "./slider/Slider";
import './Csscolors.scss';
import { Chart } from "./chart/Chart";

export function CssColors() {
    return (
        <div className="app-grid cc-main__wrap">
            <div className="cc-main__inner">
                <Slider />
                <Chart/>
            </div>
        </div>
    )
}