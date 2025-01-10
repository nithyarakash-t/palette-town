import { FormEvent, useState } from 'react';
import './Slider.scss';

export function Slider() {
    const [val, setVal] = useState(0);
    const [toggle, setToggle]= useState(false);

    function handleInput(e:FormEvent) {
        setVal(+(e.currentTarget as HTMLInputElement).value);
    }

    return (
        <div className='cc-slider__wrap'>
            <div className='cc-slider__flex'>
                <label className='cc-slider__label'>
                    <span>Hue: {val}</span>
                    <input type='range' className={toggle ? '-mono' : ''} id='hue_control' value={val} min={0} max={360} aria-label='Select Hue value between 0 and 360'
                    onInput={handleInput} style={{'--pos': '0'} as React.CSSProperties} />
                </label>
                <input type='checkbox' className='cc-slider__toggle' name='hue_toggle' id='hue_toggle' 
                aria-label='Toggle between monochrome and hsl color range'
                value={`${toggle}`} onInput={()=>{setToggle(!toggle)}}/>
            </div>
        </div>
    )
}