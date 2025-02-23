import { MetaColorSetter } from '../metacolorcontext/MetaColorContext';
import { useMetaColor } from '../metacolorcontext/useMetaColor';
import './MetaColorSlider.scss';

export function MetaColorSlider() {
    const {red, setRed, green, setGreen, blue, setBlue} = useMetaColor();
    return (
        <fieldset className='app-metacolor__fieldset'>
            <legend className='sr-only'>Pick RGB colors</legend>

            <Slider min={0} max={255} valueBound={red} changeHandler={setRed} label={'red'} />
            <Slider min={0} max={255} valueBound={green} changeHandler={setGreen} label={'green'} />
            <Slider min={0} max={255} valueBound={blue} changeHandler={setBlue} label={'blue'} />
        </fieldset>
    )
}

type SliderProps = {
    min:number,
    max:number,
    valueBound:number,
    changeHandler: MetaColorSetter,
    label:string
}

function Slider({min, max, valueBound, changeHandler, label}:SliderProps) {
    return (
        <input className='app-metacolor__slider' type='range' min={min} max={max} step={1} aria-label={label}
        value={valueBound} onChange={(e) => changeHandler(Number(e.target.value))} />
    )
}