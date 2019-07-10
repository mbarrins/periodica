const ELEMENTS_URL = 'http://localhost:3000/elements'
const USER_QUIZ_ELEMENTS_URL = 'http://localhost:3000/user_quiz_elements'
const QUIZZES_URL = 'http://localhost:3000/quizzes'
const QUIZ_QUESTIONS_URL = 'http://localhost:3000/quiz_questions'
const USER_ID = 1

window.addEventListener('DOMContentLoaded', () => {
  createNavbar();
  getElements(USER_ID).then(elements => createLearnTable(elements));
})

function clearContainer() {
  const container = document.querySelector('.container')
  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }
  return container
}

function getElements(user_id) {
  if (user_id) {
    return fetch(`${ELEMENTS_URL}?user_id=${user_id}`).then(resp => resp.json())
  } else {
    return fetch(`${ELEMENTS_URL}`).then(resp => resp.json())
  } 
}

function getElement(element_id, user_id) {
  if (user_id){
    return fetch(`${ELEMENTS_URL}/${element_id}?user_id=${user_id}`).then(resp => resp.json())
  } else {
    return fetch(`${ELEMENTS_URL}/${element_id}`).then(resp => resp.json())
  }
}

function postUserElement(body) {
  return fetch(USER_QUIZ_ELEMENTS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(body)
  }).then(resp => resp.json())
}

function deleteUserElement(user_quiz_element_id) {
  return fetch(`${USER_QUIZ_ELEMENTS_URL}/${user_quiz_element_id}`, {
    method: 'DELETE'
  }).then(resp => resp.json());
}

function getQuizzes(user_id) {
  if (user_id) {
    return fetch(`${QUIZZES_URL}?user_id=${user_id}`).then(resp => resp.json())
  } else {
    return fetch(QUIZZES_URL).then(resp => resp.json())
  }
}

function getQuiz(quiz_id) {
  return fetch(`${QUIZZES_URL}/${quiz_id}?incl_ques=true`).then(resp => resp.json())
}

function postQuiz(body) {
  return fetch(`${QUIZZES_URL}?incl_ques=true`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(body)
  }).then(resp => resp.json())
}

function submitQuiz(quiz) {
  return fetch(`${QUIZZES_URL}/${quiz.id}?submit_quiz=true&incl_ques=true`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(quiz)
  }).then(resp => resp.json())
}

function updateUserAnswer(question, answer) {
  return fetch(`${QUIZ_QUESTIONS_URL}/${question.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({user_answer: answer})
  }).then(resp => resp.json())
}

function createElement (element, clickFunction, type) {
  const cell = document.createElement('div')
  const elementDiv = document.createElement('div')
  const atomic_number = document.createElement('div')
  const symbol = document.createElement('div')
  const details = document.createElement('div')

  if (type === 'select') {
    cell.className = 'cell select'
    if (element.selected) cell.classList.add('selected') 
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
  details.textContent = `${element.name} has an atomic number of ${element.atomicNumber}, an atomic mass of ${element.atomicWeight}, and it is a part of the ${element.classification_name} group.`

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
  const container = clearContainer();
  const div = document.createElement('div')
  div.className = "periodic"

  container.appendChild(div);

  periodicTableLayout(elements, div, showElementDetails);
}

function createSelectTable(elements) {
  const container = clearContainer();
  const div = document.createElement('div')
  div.className = "periodic"

  container.appendChild(div);

  periodicTableLayout(elements, div, selectUserElement, 'select');
}

function selectUserElement(e, element, cell, user_id) {
  if (cell.classList.contains('selected')) {
    deleteUserElement(element.user_quiz_element_id)
      .then(returnedElement => {
        element = returnedElement
        cell.classList.remove('selected')
        return element;
      })
  } else {
    return postUserElement({user_id: user_id, element_id: element.id})
      .then(userElement => {
        element.user_quiz_element_id = userElement.id
        element.selected = true
        cell.classList.add('selected');
        return element;
      })
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
    getElements(USER_ID).then(elements => createLearnTable(elements));
  })

  const li2 = document.createElement('li');
  li2.textContent = 'Select Elements for Quiz';
  li2.addEventListener('click', (e) => {
    getElements(USER_ID).then(elements => createSelectTable(elements));
  })

  const li3 = document.createElement('li');
  li3.textContent = 'Quiz Me!';
  li3.addEventListener('click', () => {
    createQuiz(USER_ID);
  })

  const li4 = document.createElement('li');
  li4.textContent = 'Quiz History';
  li4.addEventListener('click', () => {
    displayQuizzes(USER_ID);
  })

  const li10 = document.createElement('li');
  li10.textContent = 'Link';
  li10.style = 'float:right';
  li10.addEventListener('click', (e) => {
    console.log(e.target)
  })

  ul.append(li1, li2, li3, li4, li10);
  body.insertBefore(ul, container);
}

function createQuiz(user_id) {
  postQuiz({user_id: user_id, ques_no: 10})
    .then(quiz => {
      getQuiz(quiz.id).then(quiz => displayQuiz(quiz))
    })
}

function displayQuiz(quizWithQuestions) {
  const container = clearContainer();
  const div = document.createElement('div')
  div.className = "quiz"

  container.appendChild(div);

  quizWithQuestions.quiz_questions.forEach((question, index) => {
    div.appendChild(createQuizQuestion(question, index, quizWithQuestions));
  })

  if (quizWithQuestions.status !== 'completed') {
    const submit = document.createElement('button')
    submit.textContent = 'Submit'

    submit.addEventListener('click', () => {
      scoreQuiz(quizWithQuestions)
    })

    div.appendChild(submit);
  }
  
  return div;
}

function scoreQuiz(quiz) {
  console.log(quiz)
  submitQuiz(quiz).then(returnedQuiz => {
    console.log(returnedQuiz)
    quiz = returnedQuiz
    displayQuiz(quiz)
  });
}

function createQuizQuestion(question, index, quiz) {
  const div = document.createElement('div')
  const h3 = document.createElement('h3')
  const p = document.createElement('p')
  const hr = document.createElement('hr')
  const answer = document.createElement('input')

  if (question.user_answer) answer.value = question.user_answer
  answer.addEventListener('change', e => {
    updateUserAnswer(question, answer.value)
      .then(returnedQuestion => {
        quiz.quiz_questions[index] = returnedQuestion
      });
  })

  h3.textContent = `Question ${index+1}`
  p.textContent = question.question_string

  div.append(h3, p, answer);

  if (typeof(question.result) !== "undefined") {
    answer.readOnly = true;

    if (question.result === true) {
      answer.classList.add('success')
    } else {
      answer.classList.add('error')
      const correct = document.createElement('label')
      correct.textContent = `  The correct answer is ${question.correct_answer}.`
      div.appendChild(correct);
    }    
  }
  
  div.appendChild(hr);
  
  return div;
  
}

function displayQuizzes() {
  const container = clearContainer();
  const div = document.createElement('div')
  div.className = "quiz-list"

  container.appendChild(div);

  getQuizzes(USER_ID)
    .then(quizzes => {
      quizzes.forEach((quiz, index) => {
        div.appendChild(createQuizInfo(quiz, index));
      })
    })
}

function createQuizInfo(quiz, index) {
  const score = Math.round(quiz.correct/quiz.questions * 100**2) / 100
  const quiz_updated = new Date(quiz.updated_at)

  const div = document.createElement('div')
  const quiz_info = document.createElement('p')
  
  div.appendChild(quiz_info)

  quiz_info.textContent = `Quiz ${index+1}: ${quiz.questions} Questions, ${quiz.status} on ${quiz_updated.toLocaleDateString()}`

  if (quiz.status === 'completed') {
    const quiz_result = document.createElement('p')
    quiz_result.textContent = `Score ${score}%`
    div.appendChild(quiz_result)
  }

  const button = document.createElement('button')
  button.textContent = (quiz.status === 'completed') ? 'Review' : 'Resume'
  button.addEventListener('click', () => {
    getQuiz(quiz.id).then(quizWithQuestions => displayQuiz(quizWithQuestions));
  })
  div.appendChild(button)
  
  return div
}