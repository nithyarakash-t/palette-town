import { useEffect, useState } from "react"
import { tracklist } from "./songs";
import './Main.scss';

export function Main() {
    const [foreground, setForeground] = useState("#000000");
    const [background, setBackground] = useState("#ffffff");
    const [link, setLink] = useState("#345acb");
    const [linkActive, setLinkActive] = useState("#a100ff");

    //Marquee
    useEffect(() => {
        const checkOverflow = () => {
            const elements = document.querySelectorAll('.cxc-main__player-list > li > div > p:first-of-type');
            
            elements.forEach(element => {
                if (element instanceof HTMLElement) {
                    const isOverflow = element.offsetWidth < element.scrollWidth;
                    element.setAttribute('is-marquee', isOverflow ? 'true' : 'false');
                }
            });
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        
        return () => window.removeEventListener('resize', checkOverflow);
    }, []); 

    //Handle swap b/w foreground and background
    function handleSwap() {
        setForeground(background);
        setBackground(foreground);
    }

    // Function to calculate relative luminance
    const getLuminance = (color: string) => {
        const rgb = color.match(/[\da-f]{2}/gi)?.map((hex) => parseInt(hex, 16) / 255) || [0, 0, 0];
        return rgb.map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)))
        .reduce((acc, val, i) => acc + val * [0.2126, 0.7152, 0.0722][i], 0);
    };

    // Function to calculate contrast ratio between two colors
    const getContrastRatio = (color1: string, color2: string) => {
        const lum1 = getLuminance(color1);
        const lum2 = getLuminance(color2);
        return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
    };

    // Function to evaluate contrast against WCAG thresholds
    const evaluateContrast = (foreground: string, background: string, aa: number = 4.5, aaa: number = 7) => {
        const colorToBackground = getContrastRatio(foreground, background);
        return {
            ratio: colorToBackground.toFixed(1),
            AA: colorToBackground >= aa,
            AAA: colorToBackground >= aaa,
        };
    };

    //Function to evaluate link contrasts
    const evaluateLinkContrast = (link: string, foreground: string, background : string, aa:number = 4.5, aaa:number = 7 ) => {
        const linkToBackground = getContrastRatio(link, background);
        const linkToForeground = getContrastRatio(link, foreground);
        const colorToBackground = getContrastRatio(foreground, background);
        return {
            ratio: linkToBackground.toFixed(1),
            ratio2: linkToForeground.toFixed(1),
            AA: (linkToBackground > aa) && (colorToBackground > aa) && (linkToForeground > 3),
            AAA: (linkToBackground > aaa) && (colorToBackground > aaa) && (linkToForeground > 3)
        }
    }

    // Compute contrast results for various elements
    const results = {
        text: evaluateContrast(foreground, background),
        largeText: evaluateContrast(foreground, background, 3, 4.5),
        link: evaluateLinkContrast(link, foreground, background),
        linkActive: evaluateLinkContrast(link, foreground, background),
        icons: evaluateContrast(foreground, background, 3, 3),
    };

    return (
        <section className="cxc-main__wrap" style={{
            "--_foreground": foreground,
            "--_background": background,
            "--_link": link,
            "--_link-active": linkActive,
          } as React.CSSProperties}>
            <div className="cxc-main__content">
                {/* Preview Section: Displays text and links with chosen colors */}
                <div className="cxc-main__preview">
                    <div className="cxc-main__preview-head">
                        <h2>Preview</h2>
                        {/* Color simulation + tooltip */}
                    </div>
                    <div className="cxc-main__preview-body">
                        <div className="cxc-main__player-wrap">
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
                                <button type="button" className="--shuffle" aria-label="Shuffle button"></button>
                                <button type="button" className="--control" disabled aria-label="Play button"></button>
                            </div>
                            <div className="cxc-main__player-body">
                                <ul className="cxc-main__player-list">
                                    {
                                        tracklist.map((item)=>
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
                        <div className="cxc-main__pv-cont">
                            <h3>Quote</h3>
                            <p>A Man who sleeps with a machete by his side is a fool on all days but one</p>
                            <a href="https://www.youtube.com/watch?v=j5a0jTc9S10" target="_blank">Don't believe me ?</a>
                        </div>
                    </div>
                </div>
                {/* Control Section: Inputs for user to select colors */}
                <div className="cxc-main__setup">
                    <div className="cxc-main__setup-peak">
                       <div></div>
                       <div></div>
                    </div>
                    <div className="cxc-main__setup-head">
                        <p data-clears={results.text.AAA ? 'aaa' : (results.text.AA) ? 'aa' : ''}>Contrast: <span>{results.text.ratio}</span></p>
                        <button type="button" aria-label="Swap" onClick={handleSwap}>Swap</button>
                    </div>
                    <div className="cxc-main__setup-body">
                        <fieldset className="cxc-main__setup-field">
                            <legend>Foreground</legend>
                            <p>{foreground}</p>
                            <input type="color" value={foreground} onChange={(e) => setForeground(e.target.value)} />
                        </fieldset>
                        <fieldset className="cxc-main__setup-field">
                            <legend>Background</legend>
                            <p>{background}</p>
                            <input type="color" value={background} onChange={(e) => setBackground(e.target.value)} />
                        </fieldset>
                        <fieldset className="cxc-main__setup-field">
                            <legend>Link</legend>
                            <p>{link}</p>
                            <input type="color" value={link} onChange={(e) => setLink(e.target.value)} />
                        </fieldset>
                        <fieldset className="cxc-main__setup-field">
                            <legend>Link Alternate</legend>
                            <p>{linkActive}</p>
                            <input type="color" value={linkActive} onChange={(e) => setLinkActive(e.target.value)} />
                        </fieldset>
                    </div>
                    <div className="cxc-main__tablewrap">
                        <div className="cxc-main__tableresponsive">
                        <table className="cxc-main__table">
                            <caption className="sr-only">Results</caption>
                            <thead>
                            <tr>
                                <th>Element</th>
                                {/* <th>Benchmark</th> */}
                                <th>Contrast Ratio</th>
                                <th>AA</th>
                                <th>AAA</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope='row'>Normal Text</th>{/* <td>4.5</td> */}<td>{results.text.ratio}:1</td>
                                    <td data-pass={results.text.AA}>{results.text.AA ? 'Pass' : 'Fail'}</td><td data-pass={results.text.AAA}>{results.text.AAA ? 'Pass' : 'Fail'}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Large Text</th>{/* <td>3</td> */}<td>{results.largeText.ratio}:1</td>
                                    <td data-pass={results.largeText.AA}>{results.largeText.AA ? 'Pass' : 'Fail'}</td><td data-pass={results.largeText.AAA}>{results.largeText.AAA ? 'Pass' : 'Fail'}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Icons/Graphics</th>{/* <td>3</td> */}<td>{results.icons.ratio}:1</td>
                                    <td data-pass={results.icons.AA}>{results.icons.AA ? 'Pass' : 'Fail'}</td><td data-pass={results.icons.AAA}>{results.icons.AAA ? 'Pass' : 'Fail'}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Link</th>{/* <td>3</td> */}<td>{results.link.ratio}:1, {results.link.ratio2}:1</td>
                                    <td data-pass={results.link.AA}>{results.link.AA ? 'Pass' : 'Fail'}</td><td data-pass={results.link.AAA}>{results.link.AAA ? 'Pass' : 'Fail'}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Link Alternate</th>{/* <td>3</td> */}<td>{results.linkActive.ratio}:1, {results.link.ratio2}:1</td>
                                    <td data-pass={results.linkActive.AA}>{results.linkActive.AA ? 'Pass' : 'Fail'}</td><td data-pass={results.linkActive.AAA}>{results.linkActive.AAA ? 'Pass' : 'Fail'}</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>            
        </section>
    )
}
