import { useEffect, useRef } from 'react';
import gsap from 'gsap';
// import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { Draggable } from 'gsap/Draggable';
import './Stringbulb.scss';
import { useTheme } from '../Themecontext';

export function Stringbulb() {
  const {theme, setTheme} = useTheme();
  const svgRef = useRef<SVGSVGElement>(null);

  function toggleTheme() {
    if (theme === 'light') {
      console.log('setting dark', theme)
      setTheme('dark');
    } else {
      console.log('setting light', theme)
      setTheme('light');
    }
  }

  useEffect(() => {
    gsap.registerPlugin(Draggable);

    if (!svgRef.current) return;

    const cords = svgRef.current.querySelectorAll<SVGPathElement>('.toggle-scene__cord');
    const hit = svgRef.current.querySelector<SVGCircleElement>('.toggle-scene__hit-spot');
    const dummy = svgRef.current.querySelector<SVGGElement>('.toggle-scene__dummy-cord');
    const dummyCord = svgRef.current.querySelector<SVGLineElement>('.toggle-scene__dummy-cord line');

    if (!cords || !hit || !dummy || !dummyCord) return;

    const proxy = document.createElement('div');
    const ENDX = dummyCord.getAttribute('x2') || "0";
    const ENDY = dummyCord.getAttribute('y2') || "0";

    const resetProxy = () => {
      gsap.set(proxy, { x: ENDX, y: ENDY });
    };

    resetProxy();

    let stateOn = false;
    const CORD_DURATION = 0.1;

    const cordTL = gsap.timeline({
      paused: true,
      onStart: () => {
        stateOn = !stateOn;
        gsap.set(document.documentElement, { '--on': stateOn ? 1 : 0 });
        gsap.set([dummy, hit], { display: 'none' });
        gsap.set(cords[0], { display: 'block' });
      },
      onComplete: () => {
        gsap.set([dummy, hit], { display: 'block' });
        gsap.set(cords[0], { display: 'none' });
        resetProxy();
      }
    });

    for (let i = 1; i < cords.length; i++) {
      cordTL.add(
        gsap.to(cords[0], {
          morphSVG: cords[i],
          duration: CORD_DURATION,
          repeat: 1,
          yoyo: true
        })
      );
    }

    let startX = 0;
    let startY = 0;

    const draggableInstances = Draggable.create(proxy, {
      trigger: hit,
      type: 'x,y',
      onPress: (e) => {
        startX = e.x;
        startY = e.y;
      },
      onDrag: function () {
        gsap.set(dummyCord, {
          attr: {
            x2: this.x,
            y2: this.y
          }
        });
      },
      onRelease: function (e: DragEvent) {
        const distX = Math.abs(e.x - startX);
        const distY = Math.abs(e.y - startY);
        const travelled = Math.sqrt(distX * distX + distY * distY);
        gsap.to(dummyCord, {
          attr: { x2: ENDX, y2: ENDY },
          duration: CORD_DURATION,
          onComplete: () => {
            if (travelled > 50) {
              cordTL.restart();
            } else {
              resetProxy();
            }
          }
        });
      }
    });

    return () => {
      if (draggableInstances && draggableInstances.length) {
        draggableInstances.forEach((instance) => instance.kill());
      }
      cordTL.kill();
    };

  }, [toggleTheme]);

  return (
    <svg
    ref={svgRef}
    className="toggle-scene"
    data-theme={theme}
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMinYMin"
    viewBox="0 0 197.451 481.081"
  >
    <defs>
      <marker id="e" orient="auto" overflow="visible" refX="0" refY="0">
        <path
          className="toggle-scene__cord-end"
          fillRule="evenodd"
          strokeWidth=".2666"
          d="M.98 0a1 1 0 11-2 0 1 1 0 012 0z"
        />
      </marker>
      <marker id="d" orient="auto" overflow="visible" refX="0" refY="0">
        <path
          className="toggle-scene__cord-end"
          fillRule="evenodd"
          strokeWidth=".2666"
          d="M.98 0a1 1 0 11-2 0 1 1 0 012 0z"
        />
      </marker>
      <marker id="c" orient="auto" overflow="visible" refX="0" refY="0">
        <path
          className="toggle-scene__cord-end"
          fillRule="evenodd"
          strokeWidth=".2666"
          d="M.98 0a1 1 0 11-2 0 1 1 0 012 0z"
        />
      </marker>
      <marker id="b" orient="auto" overflow="visible" refX="0" refY="0">
        <path
          className="toggle-scene__cord-end"
          fillRule="evenodd"
          strokeWidth=".2666"
          d="M.98 0a1 1 0 11-2 0 1 1 0 012 0z"
        />
      </marker>
      <marker id="a" orient="auto" overflow="visible" refX="0" refY="0">
        <path
          className="toggle-scene__cord-end"
          fillRule="evenodd"
          strokeWidth=".2666"
          d="M.98 0a1 1 0 11-2 0 1 1 0 012 0z"
        />
      </marker>
      <clipPath id="g" clipPathUnits="userSpaceOnUse">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4.677"
          d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
        />
      </clipPath>
      <clipPath id="f" clipPathUnits="userSpaceOnUse">
        <path
          d="M-868.418 945.051c-4.188 73.011 78.255 53.244 150.216 52.941 82.387-.346 98.921-19.444 98.921-47.058 0-27.615-4.788-42.55-73.823-42.55-69.036 0-171.436-30.937-175.314 36.667z"
        />
      </clipPath>
    </defs>
    <g className="toggle-scene__cords">
      <path
        className="toggle-scene__cord"
        markerEnd="url(#a)"
        fill="none"
        strokeLinecap="square"
        strokeWidth="6"
        d="M123.228-28.56v150.493"
        transform="translate(-24.503 256.106)"
      />
      <path
        className="toggle-scene__cord"
        markerEnd="url(#a)"
        fill="none"
        strokeLinecap="square"
        strokeWidth="6"
        d="M123.228-28.59s28 8.131 28 19.506-18.667 13.005-28 19.507c-9.333 6.502-28 8.131-28 19.506s28 19.507 28 19.507"
        transform="translate(-24.503 256.106)"
      />
      <path
        className="toggle-scene__cord"
        markerEnd="url(#a)"
        fill="none"
        strokeLinecap="square"
        strokeWidth="6"
        d="M123.228-28.575s-20 16.871-20 28.468c0 11.597 13.333 18.978 20 28.468 6.667 9.489 20 16.87 20 28.467 0 11.597-20 28.468-20 28.468"
        transform="translate(-24.503 256.106)"
      />
      <path
        className="toggle-scene__cord"
        markerEnd="url(#a)"
        fill="none"
        strokeLinecap="square"
        strokeWidth="6"
        d="M123.228-28.569s16 20.623 16 32.782c0 12.16-10.667 21.855-16 32.782-5.333 10.928-16 20.623-16 32.782 0 12.16 16 32.782 16 32.782"
        transform="translate(-24.503 256.106)"
      />
      <path
        className="toggle-scene__cord"
        markerEnd="url(#a)"
        fill="none"
        strokeLinecap="square"
        strokeWidth="6"
        d="M123.228-28.563s-10 24.647-10 37.623c0 12.977 6.667 25.082 10 37.623 3.333 12.541 10 24.647 10 37.623 0 12.977-10 37.623-10 37.623"
        transform="translate(-24.503 256.106)"
      />
      <g className="line toggle-scene__dummy-cord">
        <line
          markerEnd="url(#a)"
          x1="98.7255"
          x2="98.7255"
          y1="240.5405"
          y2="380.5405"
        />
      </g>
      <circle
        className="toggle-scene__hit-spot"
        cx="98.7255"
        cy="380.5405"
        r="60"
        fill="transparent"
      />
    </g>
    <g
      className="toggle-scene__bulb bulb"
      transform="translate(844.069 -645.213)"
    >
      <path
        className="bulb__cap"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4.677"
        d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
      />
      <path
        className="bulb__cap-shine"
        d="M-778.379 802.873h25.512v118.409h-25.512z"
        clipPath="url(#g)"
        transform="matrix(.52452 0 0 .90177 -368.282 82.976)"
      />
      <path
        className="bulb__cap"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v0s-8.439 10.115-28.817 10.115c-21.673 0-29.59-10.115-29.59-10.115z"
      />
      <path
        className="bulb__cap-outline"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4.677"
        d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
      />
      <g
        className="bulb__filament"
        fill="none"
        strokeLinecap="round"
        strokeWidth="5"
      >
        <path d="M-752.914 823.875l-8.858-33.06" />
        <path d="M-737.772 823.875l8.858-33.06" />
      </g>
      <path
        className="bulb__bulb"
        strokeLinecap="round"
        strokeWidth="5"
        d="M-783.192 803.855c5.251 8.815 5.295 21.32 13.272 27.774 12.299 8.045 36.46 8.115 49.127 0 7.976-6.454 8.022-18.96 13.273-27.774 3.992-6.7 14.408-19.811 14.408-19.811 8.276-11.539 12.769-24.594 12.769-38.699 0-35.898-29.102-65-65-65-35.899 0-65 29.102-65 65 0 13.667 4.217 26.348 12.405 38.2 0 0 10.754 13.61 14.746 20.31z"
      />
      <circle
        className="bulb__flash"
        cx="-745.343"
        cy="743.939"
        r="83.725"
        fill="none"
        strokeDasharray="10,30"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
      />
      <path
        className="bulb__shine"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="12"
        d="M-789.19 757.501a45.897 45.897 0 013.915-36.189 45.897 45.897 0 0129.031-21.957"
      />
    </g>
  </svg>
  );
}

