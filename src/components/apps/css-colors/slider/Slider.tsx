import { FormEvent } from 'react';
import './Slider.scss';
import { Tolerance } from '../Csscolors';
import { ColorListItem } from '../data/parsedUniqueColors';

interface ISliderProps {
    readonly hueValue: number;
    readonly setHueValue: (hue: number) => void;
    readonly toggle: boolean;
    readonly setToggle: (toggle: boolean) => void;
    readonly tolerance: Tolerance;
    readonly selectedColor: ColorListItem | null;
        readonly setSelectedColor: React.Dispatch<React.SetStateAction<ColorListItem | null>>;
}

export function Slider({ hueValue, setHueValue, toggle, setToggle, tolerance, selectedColor, setSelectedColor }
    : ISliderProps) {

    function handleInput(e: FormEvent) {
        if(selectedColor) setSelectedColor(null);
        setHueValue(+(e.currentTarget as HTMLInputElement).value);
    }

    return (
        <div className='cc-slider__wrap'>
            <div className='cc-slider__flex'>
                <label className='cc-slider__label'>
                    <span>Hue: {hueValue}</span>
                    <input type='range' className={toggle ? '-mono' : ''} id='hue_control' value={hueValue} min={0} max={360} aria-label='Select Hue value between 0 and 360'
                        onInput={handleInput} style={{ '--pos': (hueValue / 360) } as React.CSSProperties} />
                </label>
                <input type='checkbox' className='cc-slider__toggle' name='hue_toggle' id='hue_toggle'
                    aria-label='Toggle between monochrome and hsl color range'
                    title={toggle ? 'Turn OFF Monochrome' : 'Turn ON Monochrome'}
                    value={`${toggle}`} onInput={() => { setToggle(!toggle) }} />
            </div>
            <p className='cc-slider__tolerance'>Hue Tolerance: {tolerance.val}</p>
        </div>
    )
}