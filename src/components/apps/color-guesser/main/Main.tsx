import './Main.scss';
import { data, UniqueColorItem } from '../data/data';
import { FormEvent, useEffect, useState } from 'react';
import { ColorHEX, ColorRGB, colorSimilarity, getRandomIntInclusive, hexToRGB } from '../utils';

type Difficulty =  'easy' | 'assisted' | 'challenging';

export function Main() {
    const [difficulty, setDifficulty] = useState<Difficulty>('challenging');
    const [targetColor, setTargetColor] = useState<UniqueColorItem>(getRandomColor());
    const [inputColor, setInputColor] = useState<ColorHEX>(getDifferentRandomColor(targetColor).hex as ColorHEX);
    const [similarity, setSimilarity] = useState<number | null>(null);

    useEffect(()=>{
    },[])

    function getRandomColor() {
        return data[getRandomIntInclusive(0, data.length - 1)];
    }

    function getDifferentRandomColor(excludeColor: UniqueColorItem) {
        let randomColor = getRandomColor();
        while (randomColor.hex === excludeColor.hex) {
            randomColor = getRandomColor();
        }
        return randomColor;
    }

    function handleColorInput(e:FormEvent) {
        const INPUT_COLOR = (e.currentTarget as HTMLInputElement).value;
        setInputColor(INPUT_COLOR as ColorHEX);
                
    }

    function handleSubmit() {
        const deltaE = colorSimilarity(hexToRGB(inputColor), targetColor.rgb as ColorRGB);
        setSimilarity(parseFloat((deltaE * 100).toFixed(2)));
    }

    function handleReset() {
        setSimilarity(null);
        setTargetColor(getRandomColor());
        setInputColor(getDifferentRandomColor(targetColor).hex as ColorHEX)
    }

    return (
        <section className='cg-main__wrap'>
            <fieldset className='cg-difficulty__group'>
                <legend>Choose your difficulty </legend>
                <div className='cg-difficulty__wrap'>
                    <label className='cg-difficulty__rdo'>
                        <input type="radio" id="cg-difficulty-easy" name="cg-diff-easy" value="easy"
                        checked={difficulty==='easy'} onChange={()=>setDifficulty('easy')}/>
                        <span>Easy</span>
                    </label>
                    <label className='cg-difficulty__rdo'>
                        <input type="radio" id="cg-difficulty-medium" name="cg-diff-assisted" value="assisted"
                        checked={difficulty==='assisted'} onChange={()=>setDifficulty('assisted')}/>
                        <span>Assisted</span>
                    </label>
                    <label className='cg-difficulty__rdo'>
                        <input type="radio" id="cg-difficulty-hard" name="cg-diff-challenging" value="challenging"
                        checked={difficulty==='challenging'} onChange={()=>setDifficulty('challenging')}/>
                        <span>Challenging</span>
                    </label>

                    <div className="cg-difficulty__bar"></div>
                    <div className="cg-difficulty__slidebar"></div>
                </div>
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
                    <div className={`cg-main__vennitem -question ${difficulty === 'easy' && '-easy'}`} style={{backgroundColor: targetColor.hex}}>
                        <div>
                            <svg aria-hidden="true" width="169" height="137" viewBox="0 0 169 137" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                <path fillRule="evenodd" clipRule="evenodd" d="M40 136.5C36.47 136.65 33.64 135.32 31.5 132.5C28.35 122.56 28.35 112.56 31.5 102.5C34.01 94.4799 37.34 86.82 41.5 79.5C41.41 72.7099 38.58 67.21 33 63C28.88 61.08 24.88 61.42 21 64C13.49 67.85 7.64999 73.3499 3.5 80.5C1.67 80 0.5 78.83 0 77C5.78999 64.7199 15.46 57.55 29 55.5C31.93 55.47 34.6 56.3 37 58C40.89 61.39 44.23 65.22 47 69.5C52.77 62.48 59.1 55.98 66 50C71.7 45.4 78.2 42.57 85.5 41.5C91.73 42.45 96.73 45.45 100.5 50.5C114.81 32.19 132.97 19.36 155 12C148.15 8.26996 140.82 5.93996 133 4.99995C130.97 3.59996 130.64 1.93996 132 -4.57764e-05C144.15 0.399948 155.48 3.72995 166 9.99995C168.68 13.42 169.51 17.26 168.5 21.5C164.4 30.21 159.9 38.71 155 47C150.83 48.17 149.33 46.67 150.5 42.5C155.15 34.86 158.99 26.86 162 18.5C158.23 18.26 154.56 18.76 151 20C133.59 27.74 118.76 38.9 106.5 53.5C105.19 55.13 104.36 56.97 104 59C107.35 73.74 105.18 87.57 97.5 100.5C93.42 106.12 88.76 106.79 83.5 102.5C81.31 93.68 81.97 85.0099 85.5 76.5C88.22 69.39 91.72 62.72 96 56.5C93.95 51.64 90.28 48.97 85 48.5C69.69 54.14 58.02 64.14 50 78.5C56.68 94.61 56.52 110.61 49.5 126.5C47.44 130.99 44.28 134.33 40 136.5Z" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M39.9997 128.499C38.6797 128.669 37.5097 128.339 36.4997 127.499C34.4897 117.889 35.4897 108.549 39.4997 99.4993C41.2297 95.0493 43.2297 90.7093 45.4997 86.4993C50.2997 101.519 48.4597 115.519 39.9997 128.499Z" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M89.9987 98.4996C88.7587 86.6796 91.5887 75.6796 98.4987 65.4996C100.489 77.8696 97.6587 88.8696 89.9987 98.4996Z" />
                            </svg>
                            {/* <span>Target</span> */}
                        </div>
                    </div>
                }
            </div>

            {(difficulty === 'assisted' || difficulty === 'easy') && <div className='cg-main__yinyang'
            style={{'--_yin': `${inputColor}`, '--_yang': `${targetColor.hex}`} as React.CSSProperties}>
                {/* {similarity}% */}
            </div>}

            <p className='cg-main__color'>{targetColor ? `Color to find: ${targetColor.name} ${targetColor.alternativeName ? "/" + targetColor.alternativeName: ''}` : 'Reset to choose new color'}</p>
            
            {/* Use Gsap pricing button animation */}
            <div className='cg-main__btngroup'>
                <button type='button' className='cg-main__submit' aria-label='Submit your guess' onClick={handleSubmit}>
                    <span> Submit </span>
                </button>
                <button type='button' className='cg-main__reset'
                onClick={handleReset} aria-label='Reset to a different color'>
                    <span>Reset</span>
                </button>
            </div>

            {similarity && <p  className='cg-main__result'>{similarity}%</p>}
        </section>
    )
}

