import './Preview.scss';
import { useEffect, useState } from "react"
import { getSongs, Track } from "../main/songs";
import { getRandomQuote } from "../main/quotes";
import { ColorDeficiencyEnum, ColorDeficiencyLabels } from './types';
import { Tooltip } from '../../../uicomponents/tooltip/Tooltip';

export function Player({simulation}:{simulation:ColorDeficiencyEnum}) {
    const [tracklist, setTracklist] = useState<Track[]>(getSongs());

    //Marquee
    useEffect(() => {
        const checkOverflow = () => {
            const elements = document.querySelectorAll('.cxc-main__player-list > li > div > p:first-of-type');

            elements.forEach(element => {
                const isMarquee = element.getAttribute('is-marquee') === 'true'; //if element is already marquee (on window resize) we need to exclude duplicated content in ::after, so halven scrollwidth
                if (element instanceof HTMLElement) { //below, parent offsetwidth is being used as element offsetwidth sometimes matches scrollwidth due to some react issue
                    const isOverflow = (element.parentElement as HTMLElement).offsetWidth < (isMarquee ? element.scrollWidth / 2 : element.scrollWidth);
                    element.setAttribute('is-marquee', isOverflow ? 'true' : 'false');
                }
            });
        };

        checkOverflow();

        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [tracklist]);

    //Handle shuffle on preview
    function handleShuffle() {
        setTracklist(getSongs())
    }

    return (
        <div className="cxc-main__player-wrap" data-simulation={simulation}>
            <div className="cxc-main__player-head">
                <div className="cxc-main__player-logo">
                    <svg aria-hidden='true' xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="none" viewBox="0 0 96 96">
                        <rect width="96" height="96" fill="currentColor" rx="8"></rect>
                        <path fill="currentColor" d="m42.959 61.169-.03.435c-.339 5.16-.693 10.501-.953 15.752 0 .077.08.231.174.393.274-.148.52-.302.635-.45.376-.491.672-1.214.838-2.028l.03-.155c.953-4.724 1.942-9.61 2.758-14.432.347-2.05.578-4.134.817-6.338.115-1.04.23-2.1.36-3.201l.297-2.422 1.61 1.867q1.626 1.885 3.186 3.707c2.413 2.821 4.695 5.482 7.057 8.114 1.9 2.12 4.053 4.317 6.566 6.71 1.474 1.398 1.878 1.25 2.297.9.354-.303.484-.415-.49-1.63a9 9 0 0 1-.362-.47c-2.68-3.657-5.446-7.342-8.126-10.915q-1.765-2.347-3.518-4.696c-.267-.358-.52-.737-.823-1.193-.152-.232-.318-.478-.506-.758l-1.026-1.51 1.857-.119q1.647-.103 3.207-.196c2.427-.148 4.717-.281 6.992-.464 1.459-.119 3.005-.273 4.435-.66.83-.217 1.228-.793 1.148-1.65-.05-.596-.274-1.234-1.524-1.487a12 12 0 0 0-1.776-.197c-2.42-.12-4.847-.224-7.368-.33l-5.974-.26 2.651-1.775c.253-.169.484-.316.708-.464.419-.266.78-.498 1.09-.75q.675-.55 1.359-1.089c1.524-1.221 3.106-2.485 4.543-3.818 1.531-1.425 1.315-1.945.925-2.394-.477-.554-.737-.59-2.21.33-.189.12-.384.239-.571.344l-1.886 1.095a3264 3264 0 0 1-10.755 6.254c-.332.197-.679.246-.975.288a5 5 0 0 0-.376.063l-1.314.281v-1.306c0-.372 0-.723.014-1.06a20 20 0 0 0-.022-1.874l-.137-1.79c-.274-3.523-.556-7.166-.953-10.732-.109-.976-.506-2.03-1.084-2.878-.087-.07-.477-.183-.86-.211-.1.19-.209.47-.216.618-.137 2.548-.195 5.152-.253 7.672l-.036 1.46c-.014.765-.015 1.53-.007 2.443v3.959l-2.709-2.478c-.455-.414-.794-.723-1.12-1.032-.772-.73-1.53-1.467-2.296-2.204-1.936-1.867-3.944-3.805-6.017-5.567-.203-.175-.817-.231-1.359-.273.03.484.08.947.203 1.355.202.66.708 1.333 1.076 1.79 2.528 3.123 5.143 6.268 7.671 9.314l.296.358c.448.54.91 1.06 1.445 1.664.274.309.57.639.888 1.004l1.38 1.565-6.638.52c-3.67.28-7.187.554-10.698.849-1.856.154-3.41.323-4.94.61-.867.162-1.337.457-1.496.681-.05.078-.094.169-.05.373.123.596.924 1.516 1.459 1.67 1.928.562 4.081.723 6.118.842 1.596.092 3.236.07 4.962.05.802-.008 1.633-.022 2.492-.022h2.947l-2.246 1.854c-.426.35-.845.68-1.242.99-.81.631-1.51 1.179-2.102 1.796-1.235 1.292-2.651 2.83-3.778 4.5-.007.154.065.505.13.765.274-.028.542-.07.664-.147 1.777-1.11 3.547-2.296 5.259-3.44q1.259-.842 2.528-1.685c.968-.638 1.943-1.263 3.048-1.965l3.532-2.267-.404 5.37c-.166 2.176-.325 4.183-.455 6.19z"></path>
                    </svg>
                </div>
                <div className="cxc-main__player-title">
                    <h3>Awesome Mix</h3>
                    <p>Playlist by yours truly</p>
                </div>
                <div className='cxc-main__player-buttons'>
                    <button type="button" className="--shuffle" aria-label="Shuffle button" onClick={handleShuffle}></button>
                    <button type="button" className="--control" disabled aria-label="Play button"></button>
                </div>
            </div>
            <div className="cxc-main__player-body">
                <ul className="cxc-main__player-list">
                    {
                        tracklist.map((item) =>
                            <li key={item.name}>
                                <div>
                                    <p data-content={item.name}>{item.name}</p>
                                    <p>{item.artist}</p>
                                </div>

                                <svg aria-hidden='true' xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
                                    <circle cx="7" cy="13.5" r="1.5" fill="currentColor"></circle>
                                    <circle cx="14" cy="13.5" r="1.5" fill="currentColor"></circle>
                                    <circle cx="21" cy="13.5" r="1.5" fill="currentColor"></circle>
                                    {/* <rect width="27" height="27" x="0.5" y="0.5" rx="13.5"></rect> */}
                                </svg>
                                <svg aria-hidden='true' xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4 14h2v6H4zM9 11h2v9H9zM14 7h2v13h-2zM19 4h2v16h-2z"></path>
                                </svg>
                                <p>{item.length}</p>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export function Simulation({simulation, setSimulation}:{simulation:ColorDeficiencyEnum ,setSimulation:React.Dispatch<React.SetStateAction<ColorDeficiencyEnum>>}) {
    return (
        <div className="cxc-simulation__wrap">
            <svg className='sr-only' aria-hidden="true">
                <defs>
                    {/* Protoanomaly - mild red weak */}
                    <filter id="protanomaly">
                        <feColorMatrix type="matrix" values="
                            0.817, 0.183, 0.000, 0, 0
                            0.333, 0.667, 0.000, 0, 0
                            0.000, 0.125, 0.875, 0, 0
                            0, 0, 0, 1, 0"/>
                    </filter>
                    {/* protanopia - no red / severe */}
                    <filter id="protanopia">
                        <feColorMatrix
                        type="matrix"
                        values="0.567, 0.433, 0,     0, 0
                                0.558, 0.442, 0,     0, 0
                                0,     0.242, 0.758, 0, 0
                                0,     0,     0,     1, 0"/>
                    </filter>
                    
                    {/* mild green weak */}
                    <filter id="deuteranomaly">
                        <feColorMatrix type="matrix" values="
                            0.800, 0.200, 0.000, 0, 0
                            0.258, 0.742, 0.000, 0, 0
                            0.000, 0.142, 0.858, 0, 0
                            0, 0, 0, 1, 0"/>
                    </filter>
                    {/* no green / severe */}
                    <filter id="deutranopia">
                        <feColorMatrix
                        type="matrix"
                        values="0.625, 0.375, 0,   0, 0
                                0.7,   0.3,   0,   0, 0
                                0,     0.3,   0.7, 0, 0
                                0,     0,     0,   1, 0"/>
                    </filter>
                    
                    {/* mild blue weak */}
                     <filter id="tritanomaly">
                        <feColorMatrix type="matrix" values="
                            0.967, 0.033, 0.000, 0, 0
                            0.000, 0.733, 0.267, 0, 0
                            0.000, 0.183, 0.817, 0, 0
                            0, 0, 0, 1, 0"/>
                    </filter>
                    {/* no blue / severe */}
                    <filter id="tritanopia">
                        <feColorMatrix
                        type="matrix"
                        values="0.95, 0.05,  0,     0, 0
                                0,    0.433, 0.567, 0, 0
                                0,    0.475, 0.525, 0, 0
                                0,    0,     0,     1, 0"/>
                    </filter>

                    {/* Achromatomaly (Partial Color vision challenges - Desaturated) */}
                    <filter id="achromatomaly">
                        <feColorMatrix type="matrix" values="
                            0.618, 0.320, 0.062, 0, 0
                            0.163, 0.775, 0.062, 0, 0
                            0.163, 0.320, 0.516, 0, 0
                            0, 0, 0, 1, 0"/>
                    </filter>
                    {/* Achromatopsia (Total Color vision challenges - Grayscale) */}
                    <filter id="achromatopsia">
                        <feColorMatrix type="matrix" values="
                            0.299, 0.587, 0.114, 0, 0
                            0.299, 0.587, 0.114, 0, 0
                            0.299, 0.587, 0.114, 0, 0
                            0, 0, 0, 1, 0"/>
                    </filter>
                </defs>
            </svg>
            <label className="cxc-simulation__select">
                <span>Simulation - experimental</span>
                <div>
                    <select name="color-deficiency-simulation" id="color-deficiency-simulation" 
                    value={simulation}
                    onChange={(e) => setSimulation(e.target.value as ColorDeficiencyEnum)}>
                        {Object.values(ColorDeficiencyEnum).map(value => (
                            <option key={value} value={value}>
                                {ColorDeficiencyLabels[value]}
                            </option>
                        ))}
                    </select>
                </div>
            </label>

            <Tooltip content="Color simulations show an approximation of how selected colors might appear to users with different forms of color visual deficiency." position="top" delay={300}> 
                <button type="button"  className='cxc-simulation__info' aria-label="Color simulations show an approximation of how selected colors might appear to users with different forms of color visual deficiency.">
                    <svg aria-hidden='true' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
                    </svg>
                </button>                                                
            </Tooltip>
            
        </div>
    )
}

export function Quote({simulation}:{simulation:ColorDeficiencyEnum}) {
    const [quote, setQuote] = useState(getRandomQuote());

    function handleShuffle() {
        setQuote(getRandomQuote());
    }
    return (
        <div className="cxc-main__pv-quote" data-simulation={simulation}>
            <div>
            <h3>Quote</h3>
            <button type="button" aria-label="Choose a different quote" title='Choose a different quote' onClick={handleShuffle}></button>
            </div>  
            <p>{quote.quote}</p>
            <p>- {quote.by}</p>
            <a href='https://youtube.com/shorts/6gt5E-jWDpg?si=AFliOYtR76uefNXc' target='_blank'>In case you're bored</a>
            {/* <a href="https://www.youtube.com/watch?v=j5a0jTc9S10" target="_blank">Don't believe me ?</a> */}
        </div>
    )
}