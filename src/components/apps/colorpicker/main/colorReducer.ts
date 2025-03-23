interface ColorState {
    hue: number;
    saturation: number;
    lightness: number;
    alpha: number;
    color: string;
}

type ColorAction = 
    | { type: 'SET_HUE'; payload: number }
    | { type: 'SET_SATURATION'; payload: number }
    | { type: 'SET_LIGHTNESS'; payload: number }
    | { type: 'SET_ALPHA'; payload: number }
    | { type: 'SET_COLOR'; payload: string };

const initialState: ColorState = {
    hue: 0,
    saturation: 100,
    lightness: 50,
    alpha: 100,
    color: '#ff0000'
};

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

export type { ColorState, ColorAction };
export { colorReducer, initialState };