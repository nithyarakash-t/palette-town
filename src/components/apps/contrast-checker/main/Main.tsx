import { useState } from "react"
import './Main.scss';

export function Main() {
    const [foreground, setForeground] = useState("#000000");
    const [background, setBackground] = useState("#ffffff");
    const [link, setLink] = useState("#0000ee");
    const [linkActive, setLinkActive] = useState("#ff0000");

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
    const evaluateContrast = (ratio: number, aa: number, aaa: number) => {
        return {
        ratio: ratio.toFixed(2),
        AA: ratio >= aa ? "Pass" : "Fail",
        AAA: ratio >= aaa ? "Pass" : "Fail",
        };
    };

    // Compute contrast results for various elements
    const results = {
        text: evaluateContrast(getContrastRatio(foreground, background), 4.5, 7),
        largeText: evaluateContrast(getContrastRatio(foreground, background), 3, 4.5),
        icons: evaluateContrast(getContrastRatio(foreground, background), 3, 3),
        link: evaluateContrast(getContrastRatio(link, background), 4.5, 7),
        linkActive: evaluateContrast(getContrastRatio(linkActive, background), 4.5, 7),
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
                <div className="cxc-main__preview" style={{ background: "var(--_background)", padding: "10px", color: "var(--_foreground)" }}>
                    <p>Sample text with foreground color.</p>
                    <p>
                        <a href="#" style={{ color: "var(--_link)" }}>Link</a> | <a href="#" style={{ color: "var(--_link-active)" }}>Active Link</a>
                    </p>
                </div>
                {/* Control Section: Inputs for user to select colors */}
                <div className="cxc-main__setup">
                    <label>Foreground: <input type="color" value={foreground} onChange={(e) => setForeground(e.target.value)} /></label>
                    <label>Background: <input type="color" value={background} onChange={(e) => setBackground(e.target.value)} /></label>
                    <label>Link: <input type="color" value={link} onChange={(e) => setLink(e.target.value)} /></label>
                    <label>Link Active: <input type="color" value={linkActive} onChange={(e) => setLinkActive(e.target.value)} /></label>
                </div>
            </div>

            {/* Results Table: Displays contrast ratios and pass/fail results */}
            <table>
                <thead>
                <tr>
                    <th>Element</th>
                    <th>Contrast Ratio</th>
                    <th>AA</th>
                    <th>AAA</th>
                </tr>
                </thead>
                <tbody>
                    <tr><td>Normal Text</td><td>{results.text.ratio}</td><td>{results.text.AA}</td><td>{results.text.AAA}</td></tr>
                    <tr><td>Large Text</td><td>{results.largeText.ratio}</td><td>{results.largeText.AA}</td><td>{results.largeText.AAA}</td></tr>
                    <tr><td>Icons/Graphics</td><td>{results.icons.ratio}</td><td>{results.icons.AA}</td><td>{results.icons.AAA}</td></tr>
                    <tr><td>Link</td><td>{results.link.ratio}</td><td>{results.link.AA}</td><td>{results.link.AAA}</td></tr>
                    <tr><td>Active Link</td><td>{results.linkActive.ratio}</td><td>{results.linkActive.AA}</td><td>{results.linkActive.AAA}</td></tr>
                </tbody>
            </table>
        </section>
    )
}