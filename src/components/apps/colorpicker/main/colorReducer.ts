import { convertHSLAtoHex } from "../utils/utils";

interface ColorState {
    hue: number;
    saturation: number;
    lightness: number;

    alpha: number;

    red: number;
    green: number;
    blue: number;

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
    | { type: 'SET_COLOR'; payload: string };

const initialState: ColorState = {
    hue: 0,
    saturation: 100,
    lightness: 50,
    alpha: 100,
    red: 255,
    green: 0,
    blue: 0,
    color: '#ff0000',
};

function colorReducer(state: ColorState, action: ColorAction): ColorState {
    let newState: ColorState;

    switch (action.type) {
        case 'SET_HUE':
            newState = { ...state, hue: action.payload };
            break;
        case 'SET_SATURATION':
            newState = { ...state, saturation: action.payload };
            break;
        case 'SET_LIGHTNESS':
            newState = { ...state, lightness: action.payload };
            break;
        case 'SET_ALPHA':
            newState = { ...state, alpha: action.payload };
            break;
        case 'SET_COLOR':
            return { ...state, color: action.payload };
        default:
            return state;
    }

    const newColor = convertHSLAtoHex(`hsla(${newState.hue}, ${newState.saturation}%, ${newState.lightness}%, ${newState.alpha})`);
    return { ...newState, color: newColor };
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