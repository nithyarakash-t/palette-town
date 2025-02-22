import './Controls.scss';

type ControlProps = {
    foreground: string,
    setForeground: React.Dispatch<React.SetStateAction<string>>, 
    background:string, 
    setBackground: React.Dispatch<React.SetStateAction<string>>, 
    link:string, 
    setLink: React.Dispatch<React.SetStateAction<string>>, 
    linkActive:string, 
    setLinkActive: React.Dispatch<React.SetStateAction<string>>
}
export function ControlsAndResult({foreground, setForeground, background, setBackground, link, setLink, linkActive, setLinkActive}:ControlProps) {
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
    const evaluateLinkContrast = (link: string, foreground: string, background: string, aa: number = 4.5, aaa: number = 7) => {
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
    )
}