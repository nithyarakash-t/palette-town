import { useState } from 'react';
import './Faq.scss';

const faq = [
    {
        question: "What is color contrast?",
        answer: "Color contrast refers to the difference in light between foreground and background colors. Contrast ratios can range from 1 to 21 (commonly written 1:1 to 21:1)"
    },
    {
        question: "Why do I need to meet the standards",
        answer: "Proper color contrast makes your designs more inclusive by improving readability for users with visual impairments."
    },
    {
        question: "How does the tool work",
        answer: "Color Contrast Checker makes it easy to confirm that your designs meet accessibility standards. Enter your foreground (text) and background hex codes to see the contrast ratio and compliance with WCAG AA and AAA standards. Use the swap button to reverse the colors. The color simulation dropdown options let you preview how your design appears to users with different types of color vision deficiency."
    },
    {
        question: "What are the passing criteria for normal text",
        answer: "Contrast ratios measure the difference between two colors, ensuring text and UI elements are readable for all users. WCAG guidelines require: - 4.5:1 for normal text (AA compliance), - 3:1 for large text (AA compliance), - 7:1 for normal text (AAA compliance). Higher ratios provide better readability, especially for users with low vision."
    },
    {
        question: "What are the passing criteria for link texts with only color as differentiator",
        answer: "For usability and accessibility, links should have an aspect that differentiates them from normal text by default - for example underline. In a case where color is the only differentiator, link text must have at least 3:1 contrast with surrounding non-link text, and must present a non-color indicator (typically underline) on mouse hover and keyboard focus. In addition, both links and normal text must have at least 4.5:1 (AA) and 7:1 (AAA) contrast with the background (3:1, 4.5:1 for large text)."
    },
    {
        question: "What are the passing criteria for UI elements",
        answer: "Non text UI elements such as icons should have a sufficient contrast of 3:1 compared to the background."
    },
    {
        question: "AA vs AAA",
        answer: "Our Contrast Checker helps you meet both AA and AAA standards for color combinations to confirm readability for users with different visual needs. Level AA is the most common standard, ensuring accessibility for a broad audience, including people with low vision Level AAA is the highest standard, offering the most comprehensive accessibility. It can be difficult to achieve for certain content."
    },
    {
        question: "How is contrast ratio calculated?",
        answer: "Contrast ratio is calculated using relative luminance between two colors."
    }
];

export function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        if(openIndex === index) {
            setOpenIndex(null);
        }
        else {
            setOpenIndex(index)
        }
    };

    return (
        <div className="cxc-faq__container">
            {faq.map((item, index) => (
                <div
                    className='cxc-faq__details'
                    key={index}
                    data-open={openIndex === index}
                >
                    <button type='button' aria-expanded={openIndex === index} onClick={() => handleToggle(index)}>{item.question}</button>
                    <div className='cxc-faq__content'>
                        <div>
                            <p>{item.answer}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}