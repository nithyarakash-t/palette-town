import './Main.scss';
import { data, UniqueColorItem } from '../data/data';
import { FormEvent, useEffect, useState } from 'react';

export function Main() {
    const [color, setColor] = useState<UniqueColorItem | null>(null);

    useEffect(()=>{
        setColor(getRandomColor());        
    },[])

    function getRandomColor() {
        return data[getRandomIntInclusive(0, data.length - 1)];
    }

    function handleColorInput(e:FormEvent) {
        const INPUT_COLOR = (e.currentTarget as HTMLInputElement).value;
        compareColors(INPUT_COLOR.toLowerCase(), color?.hex.toLowerCase() ?? '#000000')
    }

    function compareColors(color1:string, color2:string) {
        console.log(color1, color2);
    }

    return (
        <section className='cg-main__wrap'>
            <label className='cg-main__input'>
                <input type='color' aria-label='Choose color' name='cg-input' id='cg-input' onInput={(e)=>handleColorInput(e)}/>
            </label>
            <p className='cg-main__color'>{color ? `${color.name}` : 'Choose new color'}</p>

            <div className='cg-main__btngroup'>
                <button type='button' className='cg-main__submit' aria-label='Submit your guess'>
                    Submit
                </button>
                <button type='button' className='cg-main__reset'
                onClick={()=>{return setColor(getRandomColor());}} aria-label='Reset to a different color'>Reset</button>
            </div>
        </section>
    )
}

function getRandomIntInclusive(min:number, max:number) {
    const RANDOM_BUFFER = new Uint32Array(1);

    window.crypto.getRandomValues(RANDOM_BUFFER);

    const RANDOM_NUMBER = RANDOM_BUFFER[0] / (0xffffffff + 1);

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(RANDOM_NUMBER * (max - min + 1)) + min;
}