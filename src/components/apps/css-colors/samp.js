const { abs, floor, random } = Math;
const randomFrom = array => array[floor(random() * array.length)];
const getNumbers = n => [...Array(n).keys()];
const wait = duration => new Promise(resolve => {
  setTimeout(resolve, duration)
});
const query = (selector, parent = document) =>
  parent.querySelector.call(parent, selector);
const queryAll = (selector, parent = document) =>
  Array.from(parent.querySelectorAll.call(parent, selector));
const queryId = document.getElementById.bind(document);

const formatRGB = rgb => `rgb(${rgb.join(', ')})`;
const formatHSL = hsl => `hsl(${hsl.map((_, i) => i === 0 ? _ : `${_}%`).join(', ')})`;
const exampleHues = [13, 25, 36, 47, 105, 150, 178, 210, 240, 297, 336, 350]
const keyCodeGetter = () => {
    const KEYS = {
      27: 'escape'
    }
  
    return event => KEYS[event.which] || KEYS[event.keyCode];
}
const getKeyCode = keyCodeGetter();
const isMonochrome = color => color.hsl[1] === 0;
const isNonMonochrome = color => !isMonochrome(color);

/** */
const parseDataFromTable = (tableID) => {
  const table = queryId(tableID)
  const headers = queryAll('thead th', table)
  const values = queryAll('tbody tr', table)

  const columns = headers.map(header => ({
    id: header.id,
    name: header.innerText
  }))

  const rows = values.map(value => {
    const cells = queryAll('td', value)
    return cells.reduce((row, cell, colIndex) => {
      const columnId = columns[colIndex].id
      return {
        ...row,
        [columnId]: cell.innerText
      }
    }, {
      type: value.getAttribute('class')
    })
  })

  return {
    columns,
    rows
  }
}
const dom = {
    chart: queryId('chart'),
    chartContainer: queryId('chart-container'),
    hueSlider: queryId('hue-slider'),
    hueValueDisplay: queryId('hue-value'),
    toleranceText: queryId('tolerance-text'),
    toleranceValueDisplay: queryId('tolerance-value'),
    monoToggle: queryId('mono-toggle'),
    colorInfo: queryId('color-info'),
    saturationAxis: queryId('saturation-axis')
}
/*
 * For each color in colorList, check if there's an equivalent color
 * with a different name.
 * Eliminate the non-preferred colors that have equivalents.
 * A color can be thought "preferred", if it has `alternativeName` field in it.
 * e.g. Eliminates fuchsia and aqua in favor of magenta and cyan, respectively.
 */
const removeAlternativeColors = colorList => {
  return colorList.map((color, index) => {
    const equivalent = colorList.find(c => c !== color && c.hex === color.hex)
    if (!equivalent || color.alternativeName === equivalent.name) {
      return color
    }
    return null
  }).filter(c => !!c)
}
const parseColorStrings = color => ({
  ...color,
  rgb: color.rgb.match(/rgb\((\d+),(\d+),(\d+)\)/).slice(1).map(Number),
  hsl: color.hsl.match(/hsl\((.*),(.*)%,(.*)%\)/).slice(1).map(Number)
})
const filterColorsByHue = (colorList, hue, tolerance) => {
  const colors = colorList.filter(color =>  abs(hue - color.hsl[0]) < tolerance)
  if (colors.length) {
    return {
      list: colors,
      tolerance
    } 
  }
  return filterColorsByHue(colorList, hue, tolerance + 1)
}
const groupColorsByLightness = (colorList, tolerance) => {
  return getNumbers(100 / tolerance + 1).map(t =>
    colorList.filter(color => {
      const difference = 100 - color.hsl[2] - t * tolerance
      const differenceLimit = tolerance / 2
      if (abs(difference) === differenceLimit) {
        return difference > 0
      }
      return abs(difference) < differenceLimit
    })
  )
}
const groupColors = ({ colorList, hue, tolerance, mono }) => {
  const baseColors = colorList.filter(mono ? isMonochrome : isNonMonochrome)
  const sortedColors = [...baseColors].sort((a, b) => a.hsl[1] - b.hsl[1])
  
  const colorsFilteredByHue = filterColorsByHue(sortedColors, hue, tolerance.min)
  
  const lightnessGroups = groupColorsByLightness(colorsFilteredByHue.list, tolerance.min)

  const finalColorsList = lightnessGroups.filter(group => !!group.length)
  
  return {
    list: finalColorsList,
    tolerance: colorsFilteredByHue.tolerance
  }
}

const colorsData = parseDataFromTable('colorsTable')
const uniqueColors = removeAlternativeColors(colorsData.rows)
const parsedUniqueColors = uniqueColors.map(parseColorStrings)

const createState = (initialState, onChange) => {
  return {
    state: initialState,
    setState(newState) {
      this.state = Object.assign({}, this.state, newState)
      onChange(this.state)
    }
  }
}
const render = (state) => {
  const { hue, mono } = state

  const colorList = groupColors({
    colorList: parsedUniqueColors,
    tolerance: {
      min: 5
    },
    hue,
    mono
  })

  const html = colorList.list.map(lightnessGroup => `
    <div class="row">
      ${lightnessGroup.map(({ name, type}) => {
        const CSSProperties = [
          `--background: ${name}`,
          `--color: ${type === 'light' ? 'black' : 'white'}`
        ]

        return `
          <button
            type="button"
            class="color-button"
            id="${name}"
            style="${CSSProperties.join(';')}"
          >
            ${name}
          </button>
        `
      }).join('')}
    </div>
  `).join('')

  const sliderPos = hue / 360

  dom.hueSlider.classList.toggle('mono', !!mono)
  dom.toleranceText.classList.toggle('hidden', !!mono)
  dom.saturationAxis.classList.toggle('hidden', !!mono)
  if (mono) {
    dom.hueValueDisplay.innerText = 0
  } else {
    dom.hueValueDisplay.innerText = hue
  }

  dom.hueSlider.style.setProperty('--pos', sliderPos)
  dom.hueSlider.value = hue
  dom.toleranceValueDisplay.innerHTML = colorList.tolerance
  dom.chart.innerHTML = html
}
const renderColorInfo = color => {
  const { type, name, alternativeName, rgb, hsl, hex } = color

  const CSSProperties = [
    `--background: ${name}`,
    `--color: ${type === 'light' ? 'black' : 'white'}`
  ]

  dom.colorInfo.innerHTML = `
    <div class="color-info-container" style="${CSSProperties.join(';')}">
      <h1 class="selectable color-info-name" tabindex="0">
        <span class="marquee">${name}</span>
      </h1>

      ${color.alternativeName ? `
        <p class="color-info-row color-info-row--alter" tabindex="0">
          or <span class="selectable">${color.alternativeName}</span>
        </p>
      `: ''}

      <p class="selectable color-info-row color-info-row--hex" tabindex="0">
        ${color.hex}
      </p>

      <p class="selectable color-info-row color-info-row--rgb" tabindex="0">
        ${formatRGB(color.rgb)}
      </p>

      <p class="selectable color-info-row color-info-row--hsl" tabindex="0">
        ${formatHSL(color.hsl)}
      </p>

      <button
        type="button"
        class="color-info-close-button"
        id="close-color-info"
      >
        <svg class="back-icon" role="img" alt="back icon">
          <use xlink:href="#back-icon"></use>
        </svg>
        back
      </button>
    </div>
  `

  const container = query('.color-info-container', dom.colorInfo)

  const closeButton = query('#close-color-info', container)
  closeButton.addEventListener('click', () => hideColorInfo(true))

  queryAll('.selectable', container).forEach(el => {
    el.addEventListener('click', () => select(el))
    el.addEventListener('focus', () => select(el))
  })

  wait(1000).then(() => {
    const computedStyle = getComputedStyle(container)
    const width = parseFloat(computedStyle.width)
    const paddingLeft = parseFloat(computedStyle.paddingLeft)
    const paddingRight = parseFloat(computedStyle.paddingRight)
    const containerWidth = width - (paddingLeft + paddingRight)
    queryAll('.marquee', dom.colorInfo).forEach(el => {
      const width = el.offsetWidth
      const widthDiff = containerWidth - width
      if (widthDiff >= 0) {
        el.classList.remove('marquee')
        return
      }
      el.style.setProperty('--marquee-amount', `${widthDiff}px`)
    })
  })
}
const showColorInfo = e => {
  if (query('.deactivating', dom.chartContainer)) {
    return
  }

  dom.chart.inert = true
  dom.colorInfo.inert = false
  dom.chart.classList.add('contain')
  e.target.classList.add('active')

  const color = parsedUniqueColors.find(c => c.name === e.target.id)
  renderColorInfo(color)
  dom.colorInfo.classList.add('active')
}
/*
 * Can be triggered by:
 * - Clicking on close button in colorInfo
 * - Pressing ESC
 * - Changing hue while colorInfo is open
 *   This scenario requires checking if activeColorButton exists.
 */
const hideColorInfo = shouldFocusBack => {
  dom.chart.inert = false
  dom.colorInfo.inert = true
  dom.colorInfo.classList.add('deactivating')
  dom.colorInfo.classList.remove('active')
  const activeColorButton = query('.color-button.active', dom.chart)
  if (activeColorButton) {
    activeColorButton.classList.add('deactivating')
    activeColorButton.classList.remove('active')
  }

  wait(600).then(() => {
    dom.colorInfo.classList.remove('deactivating')

    // Last clicked color is still there. e.g. hue didn't change
    if (activeColorButton) {
      dom.chart.classList.remove('contain')

      /*
       * The crazy reason why we need to clone an element
       * with one className lacking, instead of just
       * removing that className from the existing element is:
       * Some mobile browsers and some (I guess) old versions
       * of Safari fucks up the animation. They run
       * "deactivate" keyframes upon className removal ¯\_(ツ)_/¯
       * When we do it this way and do it with some async
       * involved, it works properly.
       */
      const newActiveColorButton = activeColorButton.cloneNode(true)
      newActiveColorButton.classList.remove('deactivating')
      requestAnimationFrame(() => {
        if (activeColorButton) {
          activeColorButton.replaceWith(newActiveColorButton)
          if (shouldFocusBack) {
            newActiveColorButton.focus()
          }
        }
      })
    }
  })
}
const ui = createState({
  hue: randomFrom(exampleHues),
  mono: false
}, render)
render(ui.state)
dom.monoToggle.addEventListener('change', e => {
  ui.setState({
    mono: e.target.checked,
    prevHue: ui.state.hue,
    hue: e.target.checked ? 0 : ui.state.prevHue
  })
  hideColorInfo()
})
dom.hueSlider.addEventListener('input', e => {
  ui.setState({
    hue: Number(e.target.value),
  })
  hideColorInfo()
})
dom.chart.addEventListener('click', showColorInfo)
window.addEventListener('keyup', e => {
  switch (getKeyCode(e)) {
    case 'escape':
      if (dom.colorInfo.classList.contains('active')) {
        hideColorInfo(true)
      }
  }
})