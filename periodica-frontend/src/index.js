const ELEMENTS_URL = 'http://localhost:3000/elements'
const USER_ID = 1
// const tableContainer = document.getElementById('main-container')

window.addEventListener('DOMContentLoaded', () => {
  createNavbar();
  getElements().then(elements => createLearnTable(elements));
})

function getElements() {
  return fetch(ELEMENTS_URL)
    .then(resp => resp.json())
}


function createElement (element, clickFunction, type) {
  const cell = document.createElement('div')
  cell.setAttribute('data-toggle', 'modal');
  const elementDiv = document.createElement('div')
  const atomic_number = document.createElement('div')
  const symbol = document.createElement('div')
  const details = document.createElement('div')

  if (type === 'select') {
    cell.classList.add('cell', 'select')
  } else {
    cell.classList.add('cell')
  }

  elementDiv.className = 'element'
  atomic_number.className = 'at_num'
  symbol.className = 'symbol'
  details.className = 'at_details'
  
  atomic_number.textContent = `${element.atomicNumber}`
  symbol.textContent = `${element.symbol}`
  details.innerHTML = `${element.atomicWeight}`

  elementDiv.append(atomic_number, symbol, details)
  cell.append(elementDiv)
  
  cell.addEventListener('click', (e) => {
    clickFunction(e, element, cell, USER_ID);
    // showElementDetails(e, element)
  })

  return cell;
}

function createElementDetails(element) {
  const div = document.createElement('div')
  const details = document.createElement('p');
  details.classList.add('about-section');
  details.textContent = `${element.about}`;
  const properties = document.createElement('ul');
  properties.classList.add('list-group');

  const aboutSection = document.createElement('p');
  aboutSection.classList.add('about-header');
  aboutSection.innerText = 'About: '

  const anum = document.createElement('li');
  anum.classList.add('list-group-item');
  anum.innerText = `Atomic Number: ${element.atomicNumber}`;

  const aweight = document.createElement('li');
  aweight.classList.add('list-group-item');
  aweight.innerText = `Atomic Weight: ${element.atomicWeight}`

  properties.append(anum, aweight)
  div.append(properties, aboutSection, details);

  return div;
}

function showElementDetails(e, element) {
  console.log(element.name);
  
  const body = document.querySelector('body')

  const modal = document.createElement('div')
  modal.classList.add('modal');

  const card = document.createElement('div');
  card.classList.add('modal-card');

  const header = document.createElement('header');
  header.classList.add('modal-card-head');

  const elementName = document.createElement('p');
  elementName.classList.add('modal-card-title');
  elementName.innerText = element.name;

  const image = document.createElement('img');
  image.classList.add('modal-card-image');
  image.src = element.imgurl;

  const close = document.createElement('button');
  close.classList.add('delete');

  const cardBody = document.createElement('section');
  cardBody.className = 'modal-card-body';

  const div = createElementDetails(element);

  cardBody.append(div);
  header.append(elementName, close);
  card.append(header, image, cardBody);
  modal.appendChild(card);

  body.appendChild(modal);

  // // When the user clicks on <span> (x), remove the modal
  close.onclick = function () {
    body.removeChild(modal);
  }

  // When the user clicks anywhere outside of the modal, remove it
  window.onclick = function (event) {
    if (event.target == modal) {
      body.removeChild(modal);
    }
  }

  return element;
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

  const nav = document.createElement('nav');
  nav.classList.add('navbar', 'navbar-expand-lg', 'bg-dark');

  const brand = document.createElement('a');
  brand.href = '#'
  brand.classList.add('navbar-brand');
  brand.innerText = 'Periodica';

  const navDiv = document.createElement('div');
  navDiv.classList.add('collapse', 'navbar-collapse');


  const ul = document.createElement('ul');
  ul.classList.add('navbar-nav', 'ml-auto')

  const li1 = document.createElement('li');
  li1.classList.add('nav-item', 'active')
  const a1 = document.createElement('a');
  a1.href = '#'
  a1.classList.add('nav-link');
  a1.innerText = 'Home';
  a1.addEventListener('click', (e) => {
    getElements().then(elements => createLearnTable(elements));
  })

  const span1 = document.createElement('span');
  span1.classList.add('sr-only');
  span1.innerHTML = '(current)';


  const item2 = document.createElement('li');
  item2.classList.add('nav-item')

  const a2 = document.createElement('a');
  a2.href = '#'
  a2.classList.add('nav-link');
  a2.innerText = 'Test Elements';
  a2.addEventListener('click', (e) => {
    getElements().then(elements => createSelectTable(elements));
  })

  // const li3 = document.createElement('li');
  // // li3.classList.add('')
  // li3.textContent = 'Learn Mode';
  // li3.addEventListener('click', (e) => {
  //   console.log(e.target)
  // })

  // const li4 = document.createElement('li');
  // li4.textContent = 'Link';
  // li4.style = 'float:right';
  // li4.addEventListener('click', (e) => {
  //   console.log(e.target)
  // })

  a1.append(span1)
  li1.append(a1);
  item2.append(a2);
  ul.append(li1, item2)//, li2, li3, li4);
  navDiv.append(ul)
  nav.append(brand, navDiv)
  body.insertBefore(nav, container);
}