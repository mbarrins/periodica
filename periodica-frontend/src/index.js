const ELEMENTS_URL = 'http://localhost:3000/elements'

window.addEventListener('DOMContentLoaded', () => {
  getElements().then(elements => createTable(elements));
})

function getElements() {
  return fetch(ELEMENTS_URL).then(resp => resp.json())
}

function createElement (element) {
  const cell = document.createElement('div')
  const elementDiv = document.createElement('div')
  const atomic_number = document.createElement('div')
  const symbol = document.createElement('div')
  const details = document.createElement('div')

  cell.className = 'cell'
  elementDiv.className = 'element'
  atomic_number.className = 'at_num'
  symbol.className = 'symbol'
  details.className = 'at_details'
  
  atomic_number.textContent = `${element.atomicNumber}`
  symbol.textContent = `${element.symbol}`
  details.textContent = `${element.name}<br />${element.atomicMass}`

  elementDiv.append(atomic_number, symbol, details)
  cell.append(elementDiv)
  
  cell.addEventListener('click', (e) => {
    console.log(e.target)
  })

  return cell;
}

function createRow(elements, first, blank, last) {
  const div = document.createElement('div')
  div.className = "periodic-row"

  for (let i = 0; i < first; i++) {
    div.appendChild(createElement(elements[i]));
  }

  for (let i = 0; i < blank; i++) {
    const cellDiv = document.createElement('div')
    cellDiv.className = 'cell'

    div.appendChild(cellDiv);
  }

  for (let i = first; i < first + last; i++) {
    div.appendChild(createElement(elements[i]));
  }

  return div;
}
function createTable(elements) {
  const container = document.querySelector('.container')
  const div = document.createElement('div')
  div.className = "periodic"
  container.appendChild(div);

  let elementNum = 0

  for (let i = 1; i < 11; i++) {
    if (i === 1){
      let firstElements = 1
      let gapNoElements = 16
      let lastElements = 1
  
      div.appendChild(createRow(elements.slice(elementNum, elementNum + firstElements + lastElements),firstElements,gapNoElements,lastElements));
      elementNum += (firstElements + lastElements)
    
    } else if (i === 2 || i === 3) {
      firstElements = 2
      gapNoElements = 10
      lastElements = 6

      div.appendChild(createRow(elements.slice(elementNum, elementNum + firstElements + lastElements),firstElements,gapNoElements,lastElements));
      elementNum += (firstElements + lastElements)

    } else if (i === 4 || i === 5) {
      firstElements = 18
      gapNoElements = 0
      lastElements = 0

      div.appendChild(createRow(elements.slice(elementNum, elementNum + firstElements + lastElements),firstElements,gapNoElements,lastElements));
      elementNum += (firstElements + lastElements)

    } else if (i === 6 || i === 7) {
      firstElements = 2
      gapNoElements = 1
      lastElements = 15

      div.appendChild(createRow(elements.slice(elementNum, elementNum + firstElements + lastElements),firstElements,gapNoElements,lastElements));
      elementNum += (firstElements + lastElements)

    } else if (i === 8) {
      firstElements = 0
      gapNoElements = 0
      lastElements = 0

      div.appendChild(createRow(elements.slice(elementNum, elementNum + firstElements + lastElements),firstElements,gapNoElements,lastElements));
      elementNum += (firstElements + lastElements)

    } else if (i === 9 || i === 10) {
      firstElements = 0
      gapNoElements = 3
      lastElements = 15

      div.appendChild(createRow(elements.slice(elementNum, elementNum + firstElements + lastElements),firstElements,gapNoElements,lastElements));
      elementNum += (firstElements + lastElements)

    }
  }
}