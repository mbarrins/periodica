const ELEMENTS_URL = 'http://localhost:3000/elements'
const USER_ID = 1

window.addEventListener('DOMContentLoaded', () => {
  createNavbar();
  getElements().then(elements => createLearnTable(elements));
})

function getElements() {
  return fetch(ELEMENTS_URL).then(resp => resp.json())
}

function createElement (element, clickFunction, type) {
  const cell = document.createElement('div')
  const elementDiv = document.createElement('div')
  const atomic_number = document.createElement('div')
  const symbol = document.createElement('div')
  const details = document.createElement('div')

  if (type === 'select') {
    cell.className = 'cell select'
  } else {
    cell.className = 'cell'
  }

  elementDiv.className = 'element'
  atomic_number.className = 'at_num'
  symbol.className = 'symbol'
  details.className = 'at_details'
  
  atomic_number.textContent = `${element.atomicNumber}`
  symbol.textContent = `${element.symbol}`
  details.innerHTML = `${element.name}<br />${element.atomicWeight}`

  elementDiv.append(atomic_number, symbol, details)
  cell.append(elementDiv)
  
  cell.addEventListener('click', (e) => {
    clickFunction(e, element, cell, USER_ID);
  })

  return cell;
}

function createElementDetails(element) {
  const div = document.createElement('div')
  const h2 = document.createElement('h2')
  const details = document.createElement('p')

  h2.textContent = element.name
  details.textContent = `${element.name} has an atomic number of ${element.atomicNumber}, an atomic mass of ${element.atomicWeight}, and it is a part of the ${element.classification.name} group.`

  div.append(h2, details);

  return div;
}

function showElementDetails(e, element) {
  const body = document.querySelector('body')

  const modal = document.createElement('div')
  modal.className = 'modal'

  const modalContent = document.createElement('div')
  modalContent.className = 'modal-content'

  const span = document.createElement('span')
  span.className = 'close'
  span.innerHTML = '&times;'

  const div = createElementDetails(element);

  modalContent.append(span, div);
  modal.appendChild(modalContent);

  body.appendChild(modal);

  // When the user clicks on <span> (x), remove the modal
  span.onclick = function() {
    body.removeChild(modal);
  }

  // When the user clicks anywhere outside of the modal, remove it
  window.onclick = function(event) {
    if (event.target == modal) {
      body.removeChild(modal);
    }
  }
}

function createRow(elements, first, blank, last, clickFunction, type) {
  const div = document.createElement('div')
  div.className = "periodic-row"

  for (let i = 0; i < first; i++) {
    div.appendChild(createElement(elements[i], clickFunction, type));
  }

  for (let i = 0; i < blank; i++) {
    const cellDiv = document.createElement('div')
    cellDiv.className = 'cell'

    div.appendChild(cellDiv);
  }

  for (let i = first; i < first + last; i++) {
    div.appendChild(createElement(elements[i], clickFunction, type));
  }

  return div;
}
function createLearnTable(elements) {
  const container = document.querySelector('.container')
  const div = document.createElement('div')
  div.className = "periodic"

  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }
  container.appendChild(div);

  periodicTableLayout(elements, div, showElementDetails);
}

function createSelectTable(elements) {
  const container = document.querySelector('.container')
  const div = document.createElement('div')
  div.className = "periodic"

  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }
  container.appendChild(div);

  periodicTableLayout(elements, div, selectUserElement, 'select');
}

function selectUserElement(e, element, cell, user_id) {
  if (cell.classList.contains('selected')) {
    cell.classList.remove('selected');
  } else {
    cell.classList.add('selected');
  }
}

function periodicTableLayout(elements, div, clickFunction, type) {
  let elementNum = 0

  for (let i = 0; i < 11; i++) {
    // if (i === 0){
    //   let firstElements = 0
    //   let gapNoElements = 0
    //   let lastElements = 0

    //   div.appendChild(createRow([],firstElements,gapNoElements,lastElements, clickFunction, type));

    // } else 
    if (i === 1){
      firstElements = 1
      gapNoElements = 16
      lastElements = 1
  
      div.appendChild(createRow(elements.slice(elementNum, elementNum + firstElements + lastElements),firstElements,gapNoElements,lastElements, clickFunction, type));
      elementNum += (firstElements + lastElements)
    
    } else if (i === 2 || i === 3) {
      firstElements = 2
      gapNoElements = 10
      lastElements = 6

      div.appendChild(createRow(elements.slice(elementNum, elementNum + firstElements + lastElements),firstElements,gapNoElements,lastElements, clickFunction, type));
      elementNum += (firstElements + lastElements)

    } else if (i === 4 || i === 5) {
      firstElements = 18
      gapNoElements = 0
      lastElements = 0

      div.appendChild(createRow(elements.slice(elementNum, elementNum + firstElements + lastElements),firstElements,gapNoElements,lastElements, clickFunction, type));
      elementNum += (firstElements + lastElements)

    } else if (i === 6 || i === 7) {
      firstElements = 2
      gapNoElements = 1
      lastElements = 15

      div.appendChild(createRow(elements.slice(elementNum, elementNum + firstElements).concat(elements.slice(elementNum + firstElements + 15, elementNum + firstElements + lastElements + 15)),firstElements,gapNoElements,lastElements, clickFunction, type));
      elementNum += (firstElements + lastElements + 15)

    } else if (i === 8) {
      firstElements = 0
      gapNoElements = 0
      lastElements = 0

      div.appendChild(createRow([],firstElements,gapNoElements,lastElements, clickFunction, type));
      elementNum += (firstElements + lastElements)

    } else if (i === 9 || i === 10) {
      elementNum = ((i === 9) ? 56 : 88)
      firstElements = 0
      gapNoElements = 3
      lastElements = 15

      div.appendChild(createRow(elements.slice(elementNum, elementNum + firstElements + lastElements),firstElements,gapNoElements,lastElements, clickFunction, type));
      elementNum += (firstElements + lastElements)

    }
  }
}

function createNavbar() {
  const body = document.querySelector('body')
  const container = document.querySelector('.container')
  const ul = document.createElement('ul');
  ul.className = 'navbar'

  const li1 = document.createElement('li');
  li1.textContent = 'Home';
  li1.addEventListener('click', (e) => {
    getElements().then(elements => createLearnTable(elements));
  })

  const li2 = document.createElement('li');
  li2.textContent = 'Select Elements for Quiz';
  li2.addEventListener('click', (e) => {
    getElements().then(elements => createSelectTable(elements));
  })

  const li3 = document.createElement('li');
  li3.textContent = 'Link';
  li3.addEventListener('click', (e) => {
    console.log(e.target)
  })

  const li4 = document.createElement('li');
  li4.textContent = 'Link';
  li4.style = 'float:right';
  li4.addEventListener('click', (e) => {
    console.log(e.target)
  })

  ul.append(li1, li2, li3, li4);
  body.insertBefore(ul, container);
}