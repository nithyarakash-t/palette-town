import { Slider } from "./slider/Slider";
import './Csscolors.scss';

export function CssColors() {
    return (
        <div className="app-grid cc-main__wrap">
            <div className="cc-main__inner">
                <Slider />
                <CssColors/>
            </div>
        </div>
    )
}