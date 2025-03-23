import { useReducer } from 'react';
import { Result } from '../components/result/Result';
import { Slider } from '../components/slider/Slider';
import { colorReducer, initialState } from './colorReducer';
import './Main.scss';

export function Main() {
    const [state, dispatch] = useReducer(colorReducer, initialState);

    return (
        <div className='cop-main__wrap'>
            <div className='cop-main__resultgroup'>
                <div className='cop-main__result' style={{ backgroundColor: state.color }}> </div>
                <Result result={state.color} />
            </div>
            <div className='cop-main__right'>
                <div className='cop-main__inputgroup'>
                    <Slider type='hue' value={state.hue} setValue={(value) => dispatch({ type: 'SET_HUE', payload: value })} name='cop-hue-slider' id='cop-hue-slider' label='Hue' />
                    <Slider type='saturation' value={state.saturation} setValue={(value) => dispatch({ type: 'SET_SATURATION', payload: value })} name='cop-saturation-slider' id='cop-saturation-slider' label='Saturation' />
                    <Slider type='lightness' value={state.lightness} setValue={(value) => dispatch({ type: 'SET_LIGHTNESS', payload: value })} name='cop-lightness-slider' id='cop-lightness-slider' label='Lightness' />
                    <Slider type='alpha' value={state.alpha} setValue={(value) => dispatch({ type: 'SET_ALPHA', payload: value })} name='cop-alpha-slider' id='cop-alpha-slider' label='Alpha' />
                
                    <Result result={`hsla(${state.hue}, ${state.saturation}%, ${state.lightness}%, ${state.alpha / 100})`} />
                </div>
            </div>
        </div>
    )
}