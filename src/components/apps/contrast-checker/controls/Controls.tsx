import { FormEvent, useEffect, useState } from 'react';
import { Tooltip } from '../../../uicomponents/tooltip/Tooltip';
import { ColorAction, ColorState } from '../main/Main';
import './Controls.scss';

type Results = {
    [key:string]: Result
}
type Result = {
    ratio:string,
    ratio2?:string,
    AA:boolean,
    AAA:boolean
}
type ControlProps = {
    colorState: ColorState;
    dispatch: React.Dispatch<ColorAction>;
}

export function ControlsAndResult({colorState, dispatch}:ControlProps) {
    const { foreground, background, link, linkActive } = colorState;
    
    //Handle swap b/w foreground and background
    function handleSwap() {
        dispatch({ type: 'SWAP_COLORS' });
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
    const evaluateContrast = (foreground: string, background: string, aa: number = 4.5, aaa: number = 7):Result => {
        const colorToBackground = getContrastRatio(foreground, background);
        return {
            ratio: colorToBackground.toFixed(1),
            AA: colorToBackground >= aa,
            AAA: colorToBackground >= aaa,
        };
    };

    //Function to evaluate link contrasts
    const evaluateLinkContrast = (link: string, foreground: string, background: string, aa: number = 4.5, aaa: number = 7):Result => {
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
    const results:Results = {
        text: evaluateContrast(foreground, background),
        largeText: evaluateContrast(foreground, background, 3, 4.5),
        link: evaluateLinkContrast(link, foreground, background),
        linkActive: evaluateLinkContrast(linkActive, foreground, background),
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
                <ColorInput 
                    label="Foreground"
                    value={foreground}
                    setColor={(value) => dispatch({ type: 'SET_FOREGROUND', payload: value })}
                />
                <ColorInput 
                    label="Background"
                    value={background}
                    setColor={(value) => dispatch({ type: 'SET_BACKGROUND', payload: value })}
                />
                <ColorInput 
                    label="Link"
                    value={link}
                    setColor={(value) => dispatch({ type: 'SET_LINK', payload: value })}
                />
                <ColorInput 
                    label="Link Alternative"
                    value={linkActive}
                    setColor={(value) => dispatch({ type: 'SET_LINK_ACTIVE', payload: value })}
                />
            </div>
            <ResultTable results={results} />
        </div>
    )
}

type ColorInputProps = {
    value: string;
    setColor: (value: string) => void;
    label: string;
}
function ColorInput({ value, setColor, label }: ColorInputProps) {
    const [inputValue, setInputValue] = useState(value);

    // sync inputval state everytime prop changes - as its only initialized once
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    // Validate hex color
    const validateHexColor = (value: string): boolean => {
        return /^#([A-Fa-f0-9]{3}){1,2}$/.test(value);
    };

    // Handle text input changes
    const handleInputChange = (value: string) => {
        setInputValue(value);
        // Allow empty, #, and partial hex values while typing
        if (value === '' || value === '#' || value.match(/^#[A-Fa-f0-9]{0,6}$/)) {
            setColor(value);
        }
    };

    // Convert shorthand hex to full hex
    const expandHexColor = (hex: string): string => {
        // Remove # if present
        hex = hex.replace('#', '');
        
        // If it's already full format, just return with #
        if (hex.length === 6) return `#${hex}`;
        
        // If it's shorthand, expand it
        if (hex.length === 3) {
            return `#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
        }
        
        return value; // Return current value instead of default black
    };

    // Handle blur
    function handleBlur(e:FormEvent) {
        if (!validateHexColor((e.target as HTMLInputElement).value)) {
            setInputValue(value); // Reset to passed value
            setColor(value);
        }
    }

    // copy color to clipboard
    const handleCopyToClipboard = () => {
        const colorToCopy = expandHexColor(value);
        navigator.clipboard.writeText(colorToCopy)
            .then(() => {})
            .catch(err => {
                console.error('Failed to copy color to clipboard:', err);
            });
    };

    return (
        <fieldset className="cxc-main__setup-field">
            <legend>{label}</legend>
            <button 
                type='button' 
                aria-label={`Copy ${label} color to clipboard`}
                onClick={handleCopyToClipboard}
            ></button>
            <label>
                <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onBlur={handleBlur}
                    placeholder="#000000"
                    maxLength={7}
                />
            </label>
            <input 
                type="color" 
                value={expandHexColor(value)} 
                onChange={(e) => setColor(e.target.value)} 
            />
        </fieldset>
    );
}

function ResultTable({results}:{results:Results}) {
    return (
        <div className="cxc-main__tablewrap">
                <div className="cxc-main__tableresponsive">
                    <table className="cxc-main__table">
                        <caption className="sr-only">Results</caption>
                        <thead>
                            <tr>
                                <th>Category</th>
                                {/* <th>Benchmark</th> */}
                                <th>Contrast Ratio</th>
                                <th>AA</th>
                                <th>AAA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope='row'> 
                                    <Tooltip content="Normal text is defined as non-bold font less than 14 point (typically 18.66 pixels). Benchmark - 4.5:1 (AA) and 7:1 (AAA)" position="top" delay={300}> 
                                        <button type='button' className='cxc-main__table-tltipcont'>Normal Text</button>
                                    </Tooltip>
                                </th>
                                {/* <td>4.5</td> */}<td>{results.text.ratio}:1</td>
                                <td data-pass={results.text.AA}>{results.text.AA ? 'Pass' : 'Fail'}</td><td data-pass={results.text.AAA}>{results.text.AAA ? 'Pass' : 'Fail'}</td>
                            </tr>
                            <tr>
                                <th scope='row'> 
                                    <Tooltip content="Large text is defined as at least 18 point (typically 24 pixels) or 14 point (typically 18.66 pixels) bold font. Benchmark - 3:1 (AA) and 4.5:1 (AAA)." position="top" delay={300}> 
                                        <button type='button' className='cxc-main__table-tltipcont'>Large Text</button>
                                    </Tooltip>
                                </th>
                                {/* <td>3</td> */}<td>{results.largeText.ratio}:1</td>
                                <td data-pass={results.largeText.AA}>{results.largeText.AA ? 'Pass' : 'Fail'}</td><td data-pass={results.largeText.AAA}>{results.largeText.AAA ? 'Pass' : 'Fail'}</td>
                            </tr>
                            <tr>
                                <th scope='row'> 
                                    <Tooltip content="UI elements include user interface components and graphics such as buttons, links, and icons. Benchmark - 3:1 to background." position="top" delay={300}> 
                                        <button type='button' className='cxc-main__table-tltipcont'>Icons/Graphics</button>
                                    </Tooltip>
                                </th>
                                {/* <td>3</td> */}<td>{results.icons.ratio}:1</td>
                                <td data-pass={results.icons.AA}>{results.icons.AA ? 'Pass' : 'Fail'}</td><td data-pass={results.icons.AAA}>{results.icons.AAA ? 'Pass' : 'Fail'}</td>
                            </tr>
                            <tr>
                                <th scope='row'> 
                                    <Tooltip content="Links that can only be differentiated by color from foreground, have multiple passing criterias. Both links and foreground should have sufficient contrast compared to Background (4.5 for AA and 7 for AAA). Links should also have 3:1 contrast to foreground." position="top" delay={300}> 
                                        <button type='button' className='cxc-main__table-tltipcont'>Link</button>
                                    </Tooltip>
                                </th>
                                <td>{results.link.ratio}:1, {results.link.ratio2}:1</td>
                                <td data-pass={results.link.AA}>{results.link.AA ? 'Pass' : 'Fail'}</td><td data-pass={results.link.AAA}>{results.link.AAA ? 'Pass' : 'Fail'}</td>
                            </tr>
                            <tr>
                                <th scope='row'> 
                                    <Tooltip content="Links that can only be differentiated by color from foreground, have multiple passing criterias. Both links and foreground should have sufficient contrast compared to Background (4.5 for AA and 7 for AAA). Links should also have 3:1 contrast to foreground." position="top" delay={300}> 
                                        <button type='button' className='cxc-main__table-tltipcont'>Link Alternative</button>
                                    </Tooltip>
                                </th>
                                {/* <td>3</td> */}<td>{results.linkActive.ratio}:1, {results.link.ratio2}:1</td>
                                <td data-pass={results.linkActive.AA}>{results.linkActive.AA ? 'Pass' : 'Fail'}</td><td data-pass={results.linkActive.AAA}>{results.linkActive.AAA ? 'Pass' : 'Fail'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    )
}