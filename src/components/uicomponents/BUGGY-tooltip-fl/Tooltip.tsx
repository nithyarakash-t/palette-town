import { ReactNode, useState, useRef } from 'react';
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    arrow,
    type Placement,
    // type MiddlewareData
} from '@floating-ui/react';
import './Tooltip.scss';

// Fixed typo in interface prop name
interface TooltipProps {
    children: ReactNode;
    content: ReactNode;
    position?: Placement;
    delay?: number;
    customClass?: string; // Fixed typo
    margin?: number;
}

export function Tooltip({ 
    children, 
    content, 
    position = 'top',
    delay = 200,
    customClass = '', // Keep prop name for backward compatibility
    margin = 10
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    // Fixed setTimeout type
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();
    const arrowRef = useRef<HTMLDivElement>(null);

    const {
        x,
        y,
        strategy,
        refs,
        placement,
        middlewareData: { arrow: arrowData },
    } = useFloating({
        placement: position,
        middleware: [
            offset(margin),
            flip({
                crossAxis: false,
                fallbackAxisSideDirection: 'start'
            }),
            shift({ padding: 5 }),
            arrow({ 
                element: arrowRef,
                padding: 5
            }),
        ],
        whileElementsMounted: autoUpdate
    });

    const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right'
    }[placement.split('-')[0]] as string;

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
            ref={refs.setReference}
            className={`c-tooltip__wrapper ${customClass}`}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
        >
            {children}
            {isVisible && (
                <div
                    ref={refs.setFloating}
                    className="c-tooltip__inner"
                    data-position={placement}
                    role="tooltip"
                    style={{
                        position: strategy,
                        top: y ?? 0,
                        left: x ?? 0,
                        width: 'max-content',
                    }}
                >
                    <div
                        ref={arrowRef}
                        className="c-tooltip__arrow"
                        style={{
                            position: 'absolute',
                            left: arrowData?.x != null ? `${arrowData.x}px` : '',
                            top: arrowData?.y != null ? `${arrowData.y}px` : '',
                            [staticSide]: '-4px',
                            transform: 'rotate(45deg)',
                        }}
                    />
                    {content}
                </div>
            )}
        </div>
    );
}