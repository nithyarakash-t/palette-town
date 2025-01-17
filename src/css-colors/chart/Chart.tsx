import { useEffect, useState } from 'react';
import './Chart.scss';
import { groupColors } from '../utils/groupColors';
import { Tolerance } from '../Csscolors';
import { ColorListItem } from '../data/parsedUniqueColors';

export function Chart({hue, tolerance, setTolerance, mono}
    :{readonly hue:number, 
    readonly tolerance:Tolerance, readonly setTolerance:(tolerance:Tolerance)=>void
    readonly mono:boolean}) {

    const [colorList, setColorList] = useState<ColorListItem[][]>([]);

    useEffect(()=>{
        const result = groupColors(hue, tolerance.min, mono);
        console.log(result.tolerance);

        setColorList(result.list);
        setTolerance({min: 5, val: result.tolerance});
        return ()=>{

        }
    }, [hue, mono])
    return (
        <div className='cc-chart__wrap'>
            <ul className='cc-chart__container'>
                {
                    colorList.map((item, index)=>
                    <li className='cc-chart__row' key={index}>
                        {item.map((el, ind)=>
                            <button type='button' className={`cc-chart__button -${el.type}`} key={ind}
                            style={{'--_bg': el.hex} as React.CSSProperties}>
                                {el.name}
                            </button>
                        )}
                    </li>
                )}
            </ul>
            <p className='cc-chart__axis -lightness'>LIGHTNESS</p>
            {!mono && <p className='cc-chart__axis -saturation'>SATURATION</p>}
        </div>
    )
}