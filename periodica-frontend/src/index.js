window.addEventListener('DOMContentLoaded', () => {
  createTable();
})

function createElement (element) {
  const div = document.createElement('div')
  const elementDiv = document.createElement('div')
  const atomic_number = document.createElement('div')
  const symbol = document.createElement('div')
  const details = document.createElement('div')

  div.className = 'cell'
  elementDiv.className = 'element'
  atomic_number.className = 'at_num'
  symbol.className = 'symbol'
  details.className = 'at_details'
  
  atomic_number.textContent = `${element}`
  symbol.textContent = `${element}`
  details.textContent = 'Hydrogen<br />1.008'

  elementDiv.append(atomic_number, symbol, details)
  div.append(elementDiv)

  return div;
}

function createRow(first, blank, last) {
  const div = document.createElement('div')
  div.className = "periodic-row"

  for (let i = 0; i < first; i++) {
    div.appendChild(createElement(i));
  }

  for (let i = 0; i < blank; i++) {
    const cellDiv = document.createElement('div')
    cellDiv.className = 'cell'

    div.appendChild(cellDiv);
  }

  for (let i = 0; i < last; i++) {
    div.appendChild(createElement(i));
  }

  return div;
}
function createTable() {
  const container = document.querySelector('.container')
  const div = document.createElement('div')
  div.className = "periodic"
  container.appendChild(div);

  for (let i = 1; i < 11; i++) {
    if (i === 1){
      div.appendChild(createRow(1,16,1));
    } else if (i === 2 || i === 3) {
      div.appendChild(createRow(2,10,6));
    } else if (i === 4 || i === 5) {
      div.appendChild(createRow(18,0,0));
    } else if (i === 6 || i === 7) {
      div.appendChild(createRow(2,1,15));
    } else if (i === 8) {
      div.appendChild(createRow(0,0,0));
    } else if (i === 9 || i === 10) {
      div.appendChild(createRow(0,3,15));
    }
  }
}