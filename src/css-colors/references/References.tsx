import { Link } from 'react-router-dom';
import './References.scss';
import { references } from './references-list';

export function References() {
    return (
        <section className='cc-references__wrap'>
            <div className='cc-references__head'>
                <Link autoFocus to={'/'} className='cc-references__back' aria-label="Back to Css colors home">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 1024 1024"><path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" /><path fill="currentColor" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" /></svg>
                </Link>
                <h2>References</h2>
            </div>
            <ol className='cc-references__list'>
                {references.map((item,index)=>{
                    return <li key={index}>
                        <a href={item.site} target='_blank' aria-label={item.name}>{item.name}</a>
                    </li>
                })}
            </ol>
        </section>
    )
}