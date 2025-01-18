import { useEffect, useState } from 'react';
import './Chart.scss';
import { groupColors } from '../utils/groupColors';
import { Tolerance } from '../Csscolors';
import { ColorListItem } from '../data/parsedUniqueColors';
import { ColorInfo } from '../colorinfo/colorInfo';

export function Chart({hue, tolerance, setTolerance, mono}
    :{readonly hue:number, 
    readonly tolerance:Tolerance, readonly setTolerance:(tolerance:Tolerance)=>void
    readonly mono:boolean}) {

    const [colorList, setColorList] = useState<ColorListItem[][]>([]);
    const [selectedColor, setSelectedColor] = useState<ColorListItem | null>(null);

    useEffect(()=>{
        const result = groupColors(hue, tolerance.min, mono);

        setColorList(result.list);
        setTolerance({min: 5, val: result.tolerance});
        return ()=>{

        }
    }, [hue, mono]);

    useEffect(()=>{
        document.addEventListener('keydown', handleKeydown);

        function handleKeydown(e:KeyboardEvent) {
            if(e.key === 'Escape') {
                setSelectedColor(null);
            }
        }
        return ()=>{
            document.removeEventListener('keydown', handleKeydown);
        }
    }, [])

    function handleSelection(color:ColorListItem) {
        setSelectedColor(color);
    }
    return (
        <div className='cc-chart__wrap'>
            <ul className='cc-chart__container'>
                {
                    colorList.map((item, index)=>
                    <li className='cc-chart__row' key={index}>
                        {item.map((el, ind)=>
                            <button type='button' key={ind}
                            tabIndex={selectedColor !== null ? -1 : undefined}
                            className={`cc-chart__button -${el.type} ${el.name === selectedColor?.name ? '-selected' : ''}`} 
                            style={{'--_bg': el.hex} as React.CSSProperties}
                            onClick={()=>{handleSelection(el)}}>
                                {el.name}
                            </button>
                        )}
                    </li>
                )}
            </ul>
            <p className='cc-chart__axis -lightness'>LIGHTNESS</p>
            {!mono && <p className='cc-chart__axis -saturation'>SATURATION</p>}
            {selectedColor && <ColorInfo selectedColor={selectedColor} setSelectedColor={setSelectedColor} />}
        </div>
    )
}