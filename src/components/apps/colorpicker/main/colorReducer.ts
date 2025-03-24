import { ColorHEX, ColorHWB, convertHexToHSLA, convertHexToHWB, convertHexToRGBA, convertHSLAtoHex, convertHWBToHex } from "../utils/utils";

interface ColorState {
    hue: number;
    saturation: number;
    lightness: number;

    alpha: number;

    red: number;
    green: number;
    blue: number;

    white:number;
    black:number;

    color: string;
}

type ColorAction = 
    | { type: 'SET_HUE'; payload: number }
    | { type: 'SET_SATURATION'; payload: number }
    | { type: 'SET_LIGHTNESS'; payload: number }
    | { type: 'SET_ALPHA'; payload: number }
    | { type: 'SET_RED'; payload: number }
    | { type: 'SET_GREEN'; payload: number }
    | { type: 'SET_BLUE'; payload: number }
    | { type: 'SET_WHITE'; payload: number } 
    | { type: 'SET_BLACK'; payload: number }
    | { type: 'SET_COLOR'; payload: string };

const initialState: ColorState = {
    hue: 0,
    saturation: 100,
    lightness: 50,
    alpha: 100,
    red: 255,
    green: 0,
    blue: 0,
    white: 0,
    black: 0,
    color: '#ff0000',
};

function colorReducer(state: ColorState, action: ColorAction): ColorState {
    let newState: ColorState;
    let computedHex: ColorHEX;

    switch (action.type) {
        case 'SET_HUE':
        case 'SET_SATURATION':
        case 'SET_LIGHTNESS':
        case 'SET_ALPHA': {
            // Handle HSLA changes
            newState = { ...state, [action.type.slice(4).toLowerCase()]: action.payload };
            computedHex = convertHSLAtoHex(
                `hsla(${newState.hue}, ${newState.saturation}%, ${newState.lightness}%, ${newState.alpha})`
            );
            const rgbaValues = convertHexToRGBA(computedHex);
            const hwbValues = convertHexToHWB(computedHex);
            return {
                ...newState,
                color: computedHex,
                red: rgbaValues.r,
                green: rgbaValues.g,
                blue: rgbaValues.b,
                white: hwbValues.w,
                black: hwbValues.b
            };
        }

        case 'SET_RED':
        case 'SET_GREEN':
        case 'SET_BLUE': {
            // Handle RGBA changes
            newState = { ...state, [action.type.slice(4).toLowerCase()]: action.payload };
            computedHex = `#${newState.red.toString(16).padStart(2, '0')}${newState.green.toString(16).padStart(2, '0')}${newState.blue.toString(16).padStart(2, '0')}`;
            const hslaValues = convertHexToHSLA(computedHex);
            const hwbValues = convertHexToHWB(computedHex);
            return {
                ...newState,
                color: computedHex,
                hue: hslaValues.h,
                saturation: hslaValues.s,
                lightness: hslaValues.l,
                white: hwbValues.w,
                black: hwbValues.b
            };
        }

        case 'SET_WHITE':
        case 'SET_BLACK': {
            // Handle HWBA changes
            newState = { ...state, [action.type.slice(4).toLowerCase()]: action.payload };
            const hwbaString:ColorHWB = `hwb(${state.hue} ${newState.white} ${newState.black} / ${state.alpha / 100})`;
            computedHex = convertHWBToHex(hwbaString);
            const rgbaValues = convertHexToRGBA(computedHex);
            const hslaValues = convertHexToHSLA(computedHex);
            return {
                ...newState,
                color: computedHex,
                red: rgbaValues.r,
                green: rgbaValues.g,
                blue: rgbaValues.b,
                hue: hslaValues.h,
                saturation: hslaValues.s,
                lightness: hslaValues.l
            };
        }

        // currently not used, implement input type color / custom color picker
        case 'SET_COLOR': {
            if (!/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(action.payload)) {
                throw new Error('Invalid color format. Please provide a hex color of 6-8 characters excluding #.');
            }

            // Handle direct color changes (stricly hex of 6-8 chars excluding #)
            newState = { ...state, color: action.payload };
            const rgbaValues = convertHexToRGBA(action.payload as ColorHEX);
            const hslaValues = convertHexToHSLA(action.payload as ColorHEX);
            return {
                ...newState,
                red: rgbaValues.r,
                green: rgbaValues.g,
                blue: rgbaValues.b,
                hue: hslaValues.h,
                saturation: hslaValues.s,
                lightness: hslaValues.l
            };
        }

        default:
            return state;
    }
}

export type { ColorState, ColorAction };
export { colorReducer, initialState };




/**old reducer
 * 
 * 
function colorReducer(state: ColorState, action: ColorAction): ColorState {
    switch (action.type) {
        case 'SET_HUE':
            return { ...state, hue: action.payload };
        case 'SET_SATURATION':
            return { ...state, saturation: action.payload };
        case 'SET_LIGHTNESS':
            return { ...state, lightness: action.payload };
        case 'SET_ALPHA':
            return { ...state, alpha: action.payload };
        case 'SET_COLOR':
            return { ...state, color: action.payload };
        default:
            return state;
    }
}
 */