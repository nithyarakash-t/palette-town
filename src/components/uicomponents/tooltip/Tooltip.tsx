import { ReactNode, useState } from 'react';
import './Tooltip.scss';

interface TooltipProps {
    children: ReactNode;
    content: ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
    cusomClass?: string;
}

export function Tooltip({ 
    children, 
    content, 
    position = 'top', 
    delay = 200,
    cusomClass = '' 
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState<number>();

    const showTooltip = () => {
        const timeout = setTimeout(() => setIsVisible(true), delay);
        setTimeoutId(timeout);
    };

    const hideTooltip = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setIsVisible(false);
    };

    return (
        <div 
            className={`c-tooltip__wrapper ${cusomClass}`}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
        >
            {children}
            {isVisible && (
                <div 
                    className="c-tooltip__inner" 
                    data-position={position} 
                    role="tooltip"
                >
                    {content}
                </div>
            )}
        </div>
    );
}