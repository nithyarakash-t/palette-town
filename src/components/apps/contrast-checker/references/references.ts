import { Reference } from "../../css-colors/references/references-list";

export const references:Reference[] = [
    {
        name: 'WCAG AA',
        link: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html'
    },
    {
        name: 'WCAG AAA',
        link: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html'
    },
    {
        name: 'WCAG non-text',
        link: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html'
    },
    {
        name: "WebAIM",
        link: "https://webaim.org/resources/contrastchecker/", //https://webaim.org/resources/linkcontrastchecker/
    },
    {
        name: 'Coolors.co',
        link: 'https://coolors.co/contrast-checker/'
    },
    {
        name: 'Figma',
        link: 'https://www.figma.com/color-contrast-checker/'
    },
    {
        name: 'Colorcontast (dot) cc',
        link: 'https://colourcontrast.cc/'
    },
    {
        name: 'Accessible web',
        link: 'https://accessibleweb.com/color-contrast-checker/'
    },
    {
        name: 'Polypane',
        link: 'https://colorcontrast.app'
    }
]

/**
 * Params
 * AA, AAA - normal text, small text, icons, links
 * 
 * Todos
 * Inputs - add hsl, rgb and maybe oklch as well
 * Click to enhance ?!
 * Simulations for diff visibility disorders like Protanopia, Deutranopia, Tritanopia, Achromatopsia
 */