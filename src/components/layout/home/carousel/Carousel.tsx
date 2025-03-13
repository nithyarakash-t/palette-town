import { useState } from 'react';
import './Carousel.scss';

export function Carousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    function goToPrev() {
        setActiveIndex(activeIndex === 0 ? data.length - 1 : activeIndex - 1);
    }

    function goToNext() {
        setActiveIndex(activeIndex === data.length - 1 ? 0 : activeIndex + 1);
    }

    return (
        <div className='app-tcarousel__wrap'>
            <div className='app-tcarousel__controls'>
                <button type='button' className='app-tcarousel__control -prev' aria-label='prev' onClick={goToPrev}></button>
                <button type='button' className='app-tcarousel__control -next' aria-label='next' onClick={goToNext}></button>
            </div>
            <ul className='app-tcarousel__scroller'>
                {data.map((item, index)=>
                    <li key={index} className='app-tcarousel__card' hidden={index !== activeIndex}>{item}</li>
                )}
            </ul>
        </div>
    )
}

const data = [
    'card 1',
    'card 2',
    'card 3',
]