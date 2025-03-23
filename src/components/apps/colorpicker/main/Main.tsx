import React, { useReducer } from 'react';
import { Result } from '../components/result/Result';
import { Slider } from '../components/slider/Slider';
import { colorReducer, initialState } from './colorReducer';
import './Main.scss';
import { getColorByHex, isValidCssColor } from '../../css-colors/data/parsedUniqueColorsObject';

export function Main() {
    const [state, dispatch] = useReducer(colorReducer, initialState);

    const cssColor:string[] = [];
    if(state.alpha === 100) {
        if(isValidCssColor(state.color)) {
            const targetColor = getColorByHex(state.color);
            cssColor.push(targetColor.name);

            if(targetColor?.alternativeName) {
                cssColor.push(targetColor.alternativeName);
            }
            
        }
    }
    return (
        <div className='cop-main__wrap' 
             style={{'--_hue': state.hue, '--_saturation': `${state.saturation}%`, 
                    '--_lightness': `${state.lightness}%`, '--_alpha': state.alpha} as React.CSSProperties}
        >
            <div className='cop-main__resultgroup'>
                <div className='cop-main__result' style={{ backgroundColor: state.color }}> </div>
                <Result result={state.color} />

                {
                    cssColor.map((color, index) => {
                        return <Result key={index} result={color} />
                    })
                }
            </div>
            <div className='cop-main__right'>
                <div className='cop-main__inputgroup'>
                    <Slider type='hue' value={state.hue} setValue={(value) => dispatch({ type: 'SET_HUE', payload: value })} name='cop-hue-slider' id='cop-hue-slider' label='Hue' />
                    <Slider type='saturation' value={state.saturation} setValue={(value) => dispatch({ type: 'SET_SATURATION', payload: value })} name='cop-saturation-slider' id='cop-saturation-slider' label='Saturation' />
                    <Slider type='lightness' value={state.lightness} setValue={(value) => dispatch({ type: 'SET_LIGHTNESS', payload: value })} name='cop-lightness-slider' id='cop-lightness-slider' label='Lightness' />
                    <Slider type='alpha' value={state.alpha} setValue={(value) => dispatch({ type: 'SET_ALPHA', payload: value })} name='cop-alpha-slider' id='cop-alpha-slider' label='Alpha' />
                
                    <Result result={`hsla(${state.hue}, ${state.saturation}%, ${state.lightness}%, ${state.alpha / 100})`} />
                </div>

                <div className='cop-main__inputgroup'>
                    <Slider type='red' value={state.red} setValue={(value) => dispatch({ type: 'SET_RED', payload: value })} name='cop-red-slider' id='cop-red-slider' label='Red' />
                    <Slider type='green' value={state.green} setValue={(value) => dispatch({ type: 'SET_GREEN', payload: value })} name='cop-green-slider' id='cop-green-slider' label='Green' />
                    <Slider type='blue' value={state.blue} setValue={(value) => dispatch({ type: 'SET_BLUE', payload: value })} name='cop-blue-slider' id='cop-blue-slider' label='Blue' />
                    <Slider type='alpha' value={state.alpha} setValue={(value) => dispatch({ type: 'SET_ALPHA', payload: value })} name='cop-alpha-slider' id='cop-alpha-slider' label='Alpha' />
                
                    <Result result={`rgba(${state.red}, ${state.green}, ${state.blue}, ${state.alpha / 100})`} />
                </div>
            </div>
        </div>
    )
}