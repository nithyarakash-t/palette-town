import { ColorListItem } from '../data/parsedUniqueColors';
import { formatHSL, formatRGB } from '../utils/utils';
import './Colorinfo.scss';

export function ColorInfo({selectedColor, setSelectedColor}
    :{readonly selectedColor:ColorListItem, readonly setSelectedColor:(color:ColorListItem | null)=>void}) {
    return (
        <div className='cc-colorinfo__wrap -active'>
            <div className={`cc-colorinfo__container ${selectedColor.type === 'dark' ? '-dark' : '-light'}`}>
                <h2>
                    <span>{selectedColor.name}</span>
                </h2>
                <p>{selectedColor.hex}</p>
                <p>{formatHSL(selectedColor.hsl)}</p>
                <p>{formatRGB(selectedColor.rgb)}</p>
                {selectedColor.alternativeName && <p>Alt name: {selectedColor.alternativeName}</p>}

                <button type='button' aria-label='Back' onClick={()=>setSelectedColor(null)}>
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 1024 1024"><path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"/><path fill="currentColor" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"/></svg>
                    Back
                </button>
            </div>
        </div>
    )
}