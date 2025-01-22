import './Main.scss';
import { data, UniqueColorItem } from '../data/data';
import { FormEvent, useEffect, useState } from 'react';
import { ColorHEX, ColorRGB, colorSimilarity, getRandomIntInclusive, hexToRGB } from '../utils';

export function Main() {
    const [color, setColor] = useState<UniqueColorItem>(getRandomColor());
    const [inputColor, setInputColor] = useState<ColorHEX>(getRandomColor().hex as ColorHEX);
    const [similarity, setSimilarity] = useState<number | null>(null);

    useEffect(()=>{
    },[])

    function getRandomColor() {
        return data[getRandomIntInclusive(0, data.length - 1)];
    }

    function handleColorInput(e:FormEvent) {
        const INPUT_COLOR = (e.currentTarget as HTMLInputElement).value;
        setInputColor(INPUT_COLOR as ColorHEX);
                
    }

    function handleSubmit() {
        const deltaE = colorSimilarity(hexToRGB(inputColor), color.rgb as ColorRGB);
        setSimilarity(parseFloat((deltaE * 100).toFixed(2)));
    }

    function handleReset() {
        setSimilarity(null);
        setColor(getRandomColor());
        setInputColor(getRandomColor().hex as ColorHEX)
    }

    return (
        <section className='cg-main__wrap'>
            <label className='cg-main__input'>
                <input type='color' aria-label='Choose color' name='cg-input' id='cg-input'
                value={inputColor} onInput={(e)=>handleColorInput(e)}/>
            </label>
            <p className='cg-main__color'>{color ? `${color.name}` : 'Choose new color'}</p>

            <div className='cg-main__btngroup'>
                <button type='button' className='cg-main__submit' aria-label='Submit your guess' onClick={handleSubmit}>
                    Submit
                </button>
                <button type='button' className='cg-main__reset'
                onClick={handleReset} aria-label='Reset to a different color'>Reset</button>
            </div>

            {similarity && <p  className='cg-main__result'>{similarity}%</p>}
        </section>
    )
}

