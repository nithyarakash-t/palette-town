// @ats-nocheck
/**
 * Do not use "@ts-nocheck" because it alters compilation errors.eslint@typescript-eslint/ban-ts-comment
 */
import { colors } from "./data";
import "./Colorwheel.scss";
import { useLayoutEffect } from "react";

declare global {
  interface Window {
    Voronoi: new () => {
      compute: (
        sites: Array<{ x: number; y: number }>,
        bounds: {
          xl: number;
          xr: number;
          yt: number;
          yb: number;
        }
      ) => {
        cells: Array<{
          closeMe: boolean;
          site: { x: number; y: number };
          halfedges: Array<{
            getStartpoint: () => { x: number; y: number };
            getEndpoint: () => { x: number; y: number };
          }>;
        }>;
      };
    };
  }
}

export function Colorwheel() {
  useLayoutEffect(() => {
    setTimeout(() => {
      test();
    }, 1000);
  }, []);
  return (
    <div className="cc-cw__wrap">
      <svg
        id="cc-cw-vector"
        baseProfile="full"
        height="600"
        version="1.1"
        viewBox="0 0 1024 1024"
        width="600"
        xmlns="http://www.w3.org/2000/svg"
      ></svg>

      <p id="cc-cw-preview"></p>
{/* 
      <a id='cc-cw-about-link' href='#cc-cw-about'>❓</a>
      <div id='cc-cw-about'>
        <a className='close' href='#'>❌</a>
        <p>This "color wheel" arrangement is a compact and visual way to represent a whole range of colors.  I was reminded of the named/web colors by <a href="https://news.ycombinator.com/item?id=33647207">a recent Hacker News comment thread</a>, and thought again of arranging them into a color wheel.</p>
        <p>So here it is: a color wheel, with only "web colors" on it.  Each color is placed on the wheel, then grown to a polygon to fill the wheel with a Voronoi diagram.</p>
        <p>Hover colors to see their name (plus extra preview color cc-cw__swatch and hex code).  Click one to "lock" it.  The idea is when picking colors for a design, choose visually here from these few (139 distinct) colors, rather than trying to choose from the millions that are actually available.  And you can refer to them by name in your CSS!</p>
        <p>The arrangement of the wheel has been tweaked from a pure <a href="https://en.wikipedia.org/wiki/HSL_and_HSV">HSV</a> interpretation, to make sure all names have a distinct location.  List of colors from <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/named-color">Mozilla documentation</a>.</p>
      </div> */}

    </div>

    
  );
}


function test() {
    // Based on https://stackoverflow.com/a/54070620/91238 .
    // input: r,g,b in [0,1], out: h in [0,360) and s,v in [0,1]
    function rgb2hsv(r:number, g:number, b:number) {
        const v = Math.max(r, g, b),
        c = v - Math.min(r, g, b);
        const h =
        c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
        return [60 * (h < 0 ? h + 6 : h), v && c / v, v];
    }

  
  // For the whole color wheel, radius and center x/y.
  const radius = 512;
  const cx = radius;
  const cy = radius;

  const svg = document.querySelector("svg#cc-cw-vector") as SVGSVGElement;
  const styleSheet = document.styleSheets[0];

  // TODO: Select-able color categories, re-render wheel.
  function renderWheel() {
    const colorsBySite: { [key: string | number]: string } = {};
    const sites: { x: number; y: number }[] = [];
    Object.entries(colors).forEach(([name, color]) => { //, _
      const [r, g, b] = color;
      const [h, s, v] = rgb2hsv(r / 255, g / 255, b / 255);

      // Based on https://stackoverflow.com/a/54522007/91238 .
      // I've tweaked it to spread out some of the colors (especially they greys)
      // that don't fit well into a true H/S wheel.
      const colorRadius = (s + v / 5) * 0.75 * radius;
      const colorAngle = (h / 360) * 2 * Math.PI;

      const x = Math.cos(colorAngle) * colorRadius + cx;
      const y = Math.sin(colorAngle) * colorRadius + cy;
      sites.push({ x: x, y: y });
      colorsBySite[`${x},${y}`] = name;
    });

    if (typeof window.Voronoi === 'undefined') {
        console.error('Voronoi library not loaded');
        return;
    }
    
    const voronoi = new window.Voronoi().compute(sites, {
      xl: 0,
      xr: 1024,
      yt: 0,
      yb: 1024,
    });
    voronoi.cells.forEach((cell) => {
      if (cell.closeMe) {
        console.warn("cell", cell, "needs closing");
        return;
      }
      const colorName = colorsBySite[`${cell.site.x},${cell.site.y}`];
      const [r, g, b] = colors[colorName];

      const c = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      c.setAttribute("data-color", colorName);
      c.setAttribute("mask", "url(#circle-mask)");

      let points = "";
      cell.halfedges.forEach((edge) => {
        const s = edge.getStartpoint();
        // const e = edge.getEndpoint();
        points += `${s.x} ${s.y}, `;
      });
      points = points.replace(/, $/, "");
      c.setAttribute("points", points);

      svg.appendChild(c);
      const rgb = `rgb(${r}, ${g}, ${b})`;
      styleSheet.insertRule(
        `[data-color='${colorName}'] { fill: ${rgb}; stroke: ${rgb}; }`
      );
    });
  }
  renderWheel();

  function activateColor(el: SVGElement | HTMLElement ) {
    renderPreview(el.getAttribute("data-color"));
    // Move the SVG node to the end, so it(s stroke) will draw above all others.
    el.parentNode?.appendChild(el);
    // Force its stroke to be black.  (Doing this with CSS doesn't work; the
    // hover state is broken by mutating the DOM.)
    el.style.stroke = "black";
    el.style.strokeWidth = "5px";
  }

  // https://stackoverflow.com/a/5624139/91238
  function componentToHex(c:number) {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  function rgbToHex(r: number, g: number, b: number) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  let previewLocked = false;
  function renderPreview(color: string | null) {
    if (!color) {
      document.getElementById("cc-cw-preview")!.innerHTML = "";
      return;
    }
    const [r, g, b] = colors[color] || [0, 0, 0];

    document.getElementById("cc-cw-preview")!.innerHTML = `
      ${color}
       <span class="cc-cw__swatch"
          style="background-color: ${rgbToHex(r, g, b)};">&nbsp;</span>
      ${rgbToHex(r, g, b).toUpperCase()}
      `;
  }

  svg.addEventListener("mouseover", (e) => {
    const el = e.target as SVGElement;
    if (el.tagName != "polygon") return;
    if (!el.nextElementSibling) return;

    if (!previewLocked) {
      activateColor(el);
    }
  });
  svg.addEventListener("mouseout", (e) => {
    const el = e.target as SVGElement;
    if (el.tagName != "polygon") return;
    if (!previewLocked) {
      renderPreview(null);
      // Reset forced stroke from mouseover.
      el.removeAttribute("style");
    }
  });
  document.body.addEventListener("click", (e) => {
    const el = e.target as HTMLElement;

    // Ignore clicks, i.e. to select, in the preview.
    if (document.getElementById("cc-cw-preview")?.contains(el)) return;

    // Remove possible forced stroke from previously-locked color.
    document.querySelectorAll("polygon[style]").forEach((el) => {
      el.removeAttribute("style");
    });

    if (el.tagName != "polygon") {
      previewLocked = false;
      renderPreview(null);
      return;
    }

    previewLocked = true;
    activateColor(el);
  });
}
