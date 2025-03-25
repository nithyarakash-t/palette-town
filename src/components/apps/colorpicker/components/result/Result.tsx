import './Result.scss';

export function Result({ result }: { result: string }) {
    
    //copy to clipboard
    function handleCopy() {
        navigator.clipboard.writeText(result);
    }

    return (
        <div className='cop-result__group' role='group'>
            <p>{result}</p>
            <button type='button' onClick={handleCopy} aria-label='Copy'></button>
        </div>
    )
}