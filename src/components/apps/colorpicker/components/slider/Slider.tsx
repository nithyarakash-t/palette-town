import { FormEvent } from 'react';
import './Slider.scss';

type SliderType = 'hue' | 'saturation' | 'lightness' | 'alpha' | 'red' | 'green' | 'blue';
const sliderRanges: Record<SliderType, { min: number; max: number }> = {
    hue: { min: 0, max: 360 },
    saturation: { min: 0, max: 100 },
    lightness: { min: 0, max: 100 },
    alpha: { min: 0, max: 100 },
    red: { min: 0, max: 255 },
    green: { min: 0, max: 255 },
    blue: { min: 0, max: 255 }
};
interface SliderProps {
    readonly customclass?: string;
    readonly showValue?: boolean;
    readonly value: number;
    readonly setValue: (val: number) => void;
    readonly id: string;
    readonly name: string;
    readonly label: string;
    readonly disabled?: boolean;
    readonly type?: SliderType;
    readonly step?:number;
    readonly min?: number;
    readonly max?: number;
}

export function Slider({
    customclass, showValue = true,
    value=50, setValue, 
    id, name, label, disabled, step=1,
    type='hue', min: minOverride, max: maxOverride
    }:SliderProps) {

    const defaultRange = sliderRanges[type];
    const min = minOverride ?? defaultRange.min;
    const max = maxOverride ?? defaultRange.max;
    function handleInput(e:FormEvent) {
        setValue(+(e.currentTarget as HTMLInputElement).value);
    }
    
    return (
        <label className={`cop-slider__label ${customclass}`}>
            <input type='range' className={'-' + type}
            id={id} name={name} aria-label={label} disabled={disabled ? true : undefined}
            value={value} min={min} max={max} step={step}
            onInput={handleInput} style={{'--_pos': (value / max)} as React.CSSProperties} />
        
            {showValue && <span>{value}</span>}
        </label> 
    )
}