import './Main.scss';
import { data, UniqueColorItem } from '../data/data';
import { FormEvent, useEffect, useState } from 'react';
import { ColorHEX, ColorRGB, colorSimilarity, getRandomIntInclusive, hexToRGB } from '../utils';

type Difficulty =  'easy' | 'assisted' | 'challenging';

export function Main() {
    const [difficulty, setDifficulty] = useState<Difficulty>('challenging');
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
            <fieldset className='cg-difficulty__group'>
                <legend>Choose your difficulty </legend>

                <label className='cg-difficulty__rdo'>
                    <input type="radio" id="cg-difficulty" name="cg-diff-easy" value="easy"
                    checked={difficulty==='easy'} onChange={()=>setDifficulty('easy')}/>
                    <span>Easy</span>
                </label>
                <label className='cg-difficulty__rdo'>
                    <input type="radio" id="cg-difficulty" name="cg-diff-assisted" value="assisted"
                    checked={difficulty==='assisted'} onChange={()=>setDifficulty('assisted')}/>
                    <span>Assisted</span>
                </label>
                <label className='cg-difficulty__rdo'>
                    <input type="radio" id="cg-difficulty" name="cg-diff-challenging" value="challenging"
                    checked={difficulty==='challenging'} onChange={()=>setDifficulty('challenging')}/>
                    <span>Challenging</span>
                </label>
            </fieldset>
            <label className='cg-main__input'>
                <input type='color' aria-label='Choose color' name='cg-input' id='cg-input'
                value={inputColor} onInput={(e)=>handleColorInput(e)}/>
            </label>

            {difficulty === 'easy' &&
            <p>If the colour's are same, intersection would be black - #000</p>}

            <div className={`cg-main__venn ${difficulty === 'easy' && '-easy'}`}>
                <div className={`cg-main__vennitem -selected ${difficulty === 'easy' && '-easy'}`} style={{backgroundColor: inputColor}}>

                </div>
                {
                    (difficulty === 'assisted' || difficulty === 'easy') &&
                    <div className={`cg-main__vennitem -question ${difficulty === 'easy' && '-easy'}`} style={{backgroundColor: color.hex}}></div>
                }
            </div>
            <p className='cg-main__color'>{color ? `Color to find: ${color.name} ${color.alternativeName ? "/" + color.alternativeName: ''}` : 'Reset to choose new color'}</p>

            {/* Use Gsap pricing button animation */}
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

