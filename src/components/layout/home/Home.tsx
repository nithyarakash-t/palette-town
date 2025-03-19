import { Suspense, lazy } from 'react';
import './Home.scss';
import { Carousel } from './carousel/Carousel';
// import { Stringbulb } from '../themeSwitch/stringbulb/Stringbulb';

const Cube = lazy(() => import('./cube/Cube').then(module => ({ default: module.Cube })));

export function Home() {
    return (
        <>
            <div className='home-landing__wrap app-grid'>
                <div className='home-landing__hero'>
                    <h1 className='home-landing__title'>Palette Town</h1>
                    <div className='home-landing__whirrls' style={{display: 'none'}}>

                    </div>
                </div>
                <section className='home-tool__wrap'>
                    <h2>Tools offered</h2>
                    <ul className='home-tool__list'>
                        <li>
                            <div className='home-tool__listitem -left'>
                                <h3>Contrast Checker</h3>
                                <p>Check if your color combinations meet accessibility standards. Our contrast checker helps you validate color pairs against WCAG guidelines, ensuring your designs are readable and accessible for all users.</p>                            
                            </div>
                            <figure className='home-tool__listitem -right'>
                                <picture>
                                    <img src='home/about/cxc-light.png' alt=''/>
                                </picture>
                            </figure>
                        </li>
                        <li>
                            <div className='home-tool__listitem -left'>
                                <h3>CSS Colours</h3>
                                <p>In a Pinch ? Make use of our tool to get the CSS preset color for your deired hue. CSS is all you need</p>
                            </div>
                            <figure className='home-tool__listitem -right'>
                                <picture>
                                    <img src='home/about/cc-light.png' alt=''/>
                                </picture>
                            </figure>
                        </li>
                        <li>
                            <div className='home-tool__listitem -left'>
                                <h3>Color guesser</h3>
                                <p>How well do you know your CSS colours ? How good is your color perception ? Take a break, and have fun with this mini game</p>
                            </div>
                            <figure className='home-tool__listitem -right'>
                                <picture>
                                    <img src='home/about/cg-light.png' alt=''/>
                                </picture>
                            </figure>
                        </li>
                    </ul>
                </section>
                <section className='home-carousel__wrap app-fullwidth'>
                    <Carousel />
                </section>
                <section className='home-cube__wrap'>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Cube/>
                    </Suspense>
                </section>
                {/* <section style={{padding: '3rem 0', minHeight: '20rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Stringbulb />
                </section> */}
            </div>
        </>
    )
}