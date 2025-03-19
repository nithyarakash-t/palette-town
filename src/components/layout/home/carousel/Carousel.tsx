import { useEffect, useRef, useState } from 'react';
import './Carousel.scss';

/**Custom hook to store previous z-inedx value
 * Previous z index is needed so that we preserve the z-index at the start of new animation
 * as currently z-index is maintained by animation-fill-mode: forwards
 * **/
function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

export function Carousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animationMode, setAnimationMode] = useState<'forwards' | 'reverse' | 'none'>('none');
    const prevActiveIndex = usePrevious(activeIndex);

    // prev page
    function goToPrev() {
        setAnimationMode('reverse');
        setActiveIndex(activeIndex === 0 ? data.length - 1 : activeIndex - 1);
    }

    // next page
    function goToNext() {
        setAnimationMode('forwards');
        setActiveIndex(activeIndex === data.length - 1 ? 0 : activeIndex + 1);
    }

    // order the cards 0...cards.length - 1 based on stacking / visual order
    function getCardOrder(index: number): number {
        const order = index - activeIndex;
        return order < 0 ? order + data.length : order;
    }

    // z-index inverse of stacking order
    function getZIndex(index: number):number {
        return (data.length - 1) - getCardOrder(index);
    }

    // We also require oldZIndex for proper animation
    function getOldCardOrder(index: number, prev: number): number {
        const order = index - prev;
        return order < 0 ? order + data.length : order;
    }
    function getOldZIndex(index: number): number {
        if (prevActiveIndex === undefined) {
            return getZIndex(index); // fallback for initial render
        }
        return (data.length - 1) - getOldCardOrder(index, prevActiveIndex);
    }


    return (
        <div className='app-tcarousel__wrap'>
            <div className='app-tcarousel__controls'>
                <button type='button' className='app-tcarousel__control -prev' aria-label='prev' onClick={goToPrev}></button>
                <button type='button' className='app-tcarousel__control -next' aria-label='next' onClick={goToNext}></button>
            </div>
            <ul className={`app-tcarousel__scroller`} data-animation-mode={animationMode}>
                {data.map((item, index)=> {

                    /**
                     * need to find a way to add translate in scss so that we dont keep on translating for complete data
                     * only first n number of cards allowed, all other cards will be at the end of deck replicating 1st or the nth card
                     */
                    return <li key={index} className='app-tcarousel__card' 
                        data-index={index} data-order={getCardOrder(index)}
                        style={{'--_zindex': getZIndex(index),
                            '--_old-zindex': getOldZIndex(index),
                            // translate: `calc(10px * attr(data-order type(<number>), 0)) calc(-10px * attr(data-order type(<number>), 0))`,
                            margin: `0 0 calc(10px * attr(data-order type(<number>), 0)) calc(10px * attr(data-order type(<number>), 0))`
                        } as React.CSSProperties}
                        aria-hidden={index === activeIndex ? 'false' : 'true'}>{item}</li>
                
                    }
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