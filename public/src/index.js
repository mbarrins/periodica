const BASE_URL = 'https://periodica-project.herokuapp.com'
const ELEMENTS_URL = `${BASE_URL}/elements`;
const USER_QUIZ_ELEMENTS_URL = `${BASE_URL}/user_quiz_elements`;
const QUIZZES_URL = `${BASE_URL}/quizzes`;
const QUIZ_QUESTIONS_URL = `${BASE_URL}/quiz_questions`;
const CLASSIFICATIONS_URL = `${BASE_URL}/classifications`;
const USERS_URL = `${BASE_URL}/users`;
const SUBJECTS_URL = `${BASE_URL}/subjects`;
const USER_QUESTIONS_URL = `${BASE_URL}/user_questions`;
let currentUser;
const GROUPS = [];
const QUESTION_TYPES = [];

window.addEventListener('DOMContentLoaded', () => {
  createNavbar();
  createLogIn();
  getClassifications();
  getQuestionTypes();
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
    return [];
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
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user_answer: answer})
  }).then(resp => resp.json())
}

function getClassifications() {
  return fetch(`${CLASSIFICATIONS_URL}`)
    .then(resp => resp.json())
    .then(classifications => classifications.forEach((group) => {
      GROUPS.push(group.name);
      GROUPS.sort();
    }))
}

function getUsers(username) {
  return fetch(`${USERS_URL}?username=${username}`)
    .then(resp => resp.json())
}

function postUser(body) {
  return fetch(USERS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(resp => resp.json())
}

function patchUser(user_id, body) {
  return fetch(`${USERS_URL}/${user_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(resp => resp.json())
}

function getQuestionTypes(user_id){
  if (user_id) {
    return fetch(`${SUBJECTS_URL}?user_id=${user_id}`).then(resp => resp.json())
  } else {
    return fetch(`${SUBJECTS_URL}`)
      .then(resp => resp.json())
      .then(questionTypes => questionTypes.forEach((type) => {
        QUESTION_TYPES.push(type);
        QUESTION_TYPES.sort();
      }))
  }
}

function postUserQuestion(body) {
  return fetch(USER_QUESTIONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(body)
  }).then(resp => resp.json())
}

function deleteUserQuestion(user_question_id) {
  return fetch(`${USER_QUESTIONS_URL}/${user_question_id}`, {
    method: 'DELETE'
  }).then(resp => resp.json());
}

function signInUser(username) {
  getUsers(username)
    .then(returnedUser => {
      if (returnedUser) {
        logInUser(returnedUser);
      } else {
        displayErrorMessage('That username does not exist. Please check your details or click to Sign Up below.');
      }
    })
}

function displayErrorMessage(errorMessage){
  const h1 = document.querySelector('h1')
  const div = h1.parentNode

  if (div.querySelector('.error')) {
    const p = div.querySelector('.error')
    p.textContent = errorMessage
  } else {
    const p = document.createElement('p')
    p.className = 'error has-text-danger has-text-weight-bold'
    p.textContent = errorMessage
    h1.parentNode.insertBefore(p,h1)
  }
}

function logInUser(returnedUser) {
  currentUser = returnedUser
  displayErrorMessage('Please wait. Page loading...');
  getElements().then(elements => createLearnTable(elements))
  addUserNav();

  return currentUser;
}

function signUpUser(body) {
  postUser(body).then(returnedUser => {
    if (returnedUser.error) {
      displayErrorMessage(returnedUser.error.join('\r\n'));
    } else {
      logInUser(returnedUser);
    }
  })
}


function createElement (element, clickFunction, type) {
  const cell = document.createElement('div')
  cell.setAttribute('data-toggle', 'modal');
  const elementDiv = document.createElement('div')
  const atomic_number = document.createElement('div')
  const symbol = document.createElement('div')
  const details = document.createElement('div')

  if (type === 'select') {
    cell.className = 'cell select'
    if (element.selected) cell.classList.add('selected') 
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
    clickFunction(e, element, cell, currentUser.id);
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
  aweight.innerText = `Atomic Weight: ${element.atomicWeight} AMU`

    const meltpoint = document.createElement('li');
    meltpoint.classList.add('list-group-item');
    meltpoint.innerText = `Melting Point: ${element.meltingPoint} Kelvin`

    const boilpoint = document.createElement('li');
    boilpoint.classList.add('list-group-item');
    boilpoint.innerText = `Boiling Point: ${element.boilingPoint} Kelvin`

    const electronegativity = document.createElement('li');
    electronegativity.classList.add('list-group-item');
    electronegativity.innerText = `Electronegativity: ${element.electronegativity}`

  properties.append(anum, aweight, meltpoint, boilpoint, electronegativity);
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

  const imageCard = document.createElement('div');
  imageCard.classList.add('card', 'image-card');

  const image = document.createElement('img');
  image.classList.add('card-image-top', 'element-image');
  image.src = element.imgurl;

  const close = document.createElement('button');
  close.classList.add('delete');

  const cardBody = document.createElement('section');
  cardBody.className = 'modal-card-body';

  const div = createElementDetails(element);

  cardBody.append(div);
  imageCard.append(image);
  header.append(elementName, close);
  card.append(header, imageCard, cardBody);
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

  const nav = document.createElement('nav');
  nav.classList.add('navbar', 'is-dark');
  nav.style = 'min-height: 100px'

  const brandDiv = document.createElement('div')
  brandDiv.className = 'navbar-brand'

  const brand = document.createElement('a');
  brand.classList.add('navbar-item','is-size-2');
  brand.innerText = 'Periodica';

  brandDiv.appendChild(brand);

  const navDiv = document.createElement('div');
  navDiv.classList.add('navbar-menu', 'is-size-5');

  nav.append(brandDiv, navDiv)
  body.insertBefore(nav, container);
}

function removeUserNav() {
  const navDiv = document.querySelector('.navbar-menu')

  while (navDiv.lastChild) {
    navDiv.removeChild(navDiv.lastChild)
  }
}

function addUserNav() {
  const navDiv = document.querySelector('.navbar-menu')

  const navEnd = document.createElement('div')
  navEnd.className = 'navbar-end'

  const home = document.createElement('a');
  home.classList.add('navbar-item');
  home.innerText = 'Home';
  home.addEventListener('click', (e) => {
    getElements().then(elements => createLearnTable(elements));
  })
  
  const quiz = document.createElement('div');
  quiz.classList.add('navbar-item', 'has-dropdown', 'is-hoverable')

  const quizTop = document.createElement('a')
  quizTop.classList.add('navbar-link')
  quizTop.innerText = 'Quizzes';

  const quizDiv = document.createElement('div')
  quizDiv.className = 'navbar-dropdown'

  const quizMenu1 = document.createElement('a')
  quizMenu1.classList.add('navbar-item', 'has-text-black')
  quizMenu1.textContent = 'Create New Quiz'

  quizMenu1.addEventListener('click', (e) => {
    createQuiz(currentUser);
  })

  const quizMenu2 = document.createElement('a')
  quizMenu2.classList.add('navbar-item', 'has-text-black')
  quizMenu2.textContent = 'View Quiz History'

  quizMenu2.addEventListener('click', (e) => {
    displayQuizzes();
  })

  const divider = document.createElement('div')
  divider.className = 'navbar-divider'

  const quizMenu3 = document.createElement('a')
  quizMenu3.classList.add('navbar-item', 'has-text-black')
  quizMenu3.textContent = 'Select Elements for Quiz'

  quizMenu3.addEventListener('click', (e) => {
    getElements(currentUser.id)
      .then(elements => createSelectTable(elements));
  })

  // const quizMenu4 = document.createElement('a')
  // quizMenu4.classList.add('navbar-item', 'has-text-black')
  // quizMenu4.textContent = 'Other Quiz Settings'

  // quizMenu4.addEventListener('click', (e) => {
  //   console.log('OTHER QUIZ SETTINGS')
  // })

  quizDiv.append(quizMenu1, quizMenu2, divider, quizMenu3)
  // quizDiv.append(quizMenu1, quizMenu2, divider, quizMenu3, quizMenu4)
  quiz.append(quizTop, quizDiv)

  const userMenu = document.createElement('div');
  userMenu.classList.add('navbar-item', 'has-dropdown', 'is-hoverable')

  const userTop = document.createElement('a')
  userTop.classList.add('navbar-link')
  userTop.innerText = 'User';

  const userDiv = document.createElement('div')
  userDiv.className = 'navbar-dropdown'

  const userMenu1 = document.createElement('a')
  userMenu1.classList.add('navbar-item', 'has-text-black')
  userMenu1.textContent = 'User Settings'

  userMenu1.addEventListener('click', (e) => {
    createUpdateUserDetails();
  })

  // const userMenu2 = document.createElement('a')
  // userMenu2.classList.add('navbar-item', 'has-text-black')
  // userMenu2.textContent = 'View Quiz History'

  // userMenu2.addEventListener('click', (e) => {
  //   displayQuizzes();
  // })

  // const userMenu3 = document.createElement('a')
  // userMenu3.classList.add('navbar-item', 'has-text-black')
  // userMenu3.textContent = 'Select Elements for Quiz'

  // userMenu3.addEventListener('click', (e) => {
  //   getElements(user.id).then(elements => createSelectTable(elements));
  // })

  // const userMenu4 = document.createElement('a')
  // userMenu4.classList.add('navbar-item', 'has-text-black')
  // userMenu4.textContent = 'Other Quiz Settings'

  // userMenu4.addEventListener('click', (e) => {
  //   console.log('OTHER QUIZ SETTINGS')
  // })

  // userDiv.append(userMenu1, userMenu2, userMenu3, userMenu4)
  userDiv.append(userMenu1)
  userMenu.append(userTop, userDiv)

  const signOut = document.createElement('a');
  signOut.classList.add('navbar-item');
  signOut.innerText = 'Sign out';
  signOut.addEventListener('click', () => {
    currentUser = undefined;
    removeUserNav();
    createLogIn();
  })

  navEnd.append(home, quiz, userMenu, signOut)
  navDiv.append(navEnd)
}

function createQuiz(user) {
  postQuiz({user_id: user.id, ques_no: user.no_of_ques})
    .then(quiz => {
      getQuiz(quiz.id).then(quiz => displayQuiz(quiz))
    })
}

function displayQuiz(quizWithQuestions) {
  const container = clearContainer();
  const form = document.createElement('form')
  form.className = "quiz"

  container.appendChild(form);

  quizWithQuestions.quiz_questions.forEach((question, index) => {
    form.appendChild(createQuizQuestion(question, index, quizWithQuestions));
  })

  if (quizWithQuestions.status !== 'completed') {
    const submit = document.createElement('button')
    submit.textContent = 'Submit'

    form.addEventListener('submit', () => {
      event.preventDefault();
      scoreQuiz(quizWithQuestions);
    })

    form.appendChild(submit);
  }
  
  return form;
}

function scoreQuiz(quiz) {
  submitQuiz(quiz).then(returnedQuiz => {
    quiz = returnedQuiz
    displayQuiz(quiz)
  });
}

function createQuizQuestion(question, index, quiz) {
  const div = document.createElement('div')
  const h3 = document.createElement('h3')
  const p = document.createElement('p')
  const hr = document.createElement('hr')
  let answer

  
  h3.textContent = `Question ${index+1}`
  p.textContent = question.question_string

  div.append(h3, p);
  
  if (typeof(question.result) !== "undefined") {
    answer = document.createElement('input')
    answer.readOnly = true;
    div.appendChild(answer);

    if (question.result === true) {
      answer.classList.add('success')
    } else {
      answer.classList.add('error')
      const correct = document.createElement('label')
      correct.textContent = `  The correct answer is ${question.correct_answer}.`
      div.appendChild(correct);
    }    

  } else {
    switch (question.question_on) {
      case 'atomicNumber':
        answer = document.createElement('input')
        if (isNaN(question.correct_answer)) {
          answer.type = 'text'
        } else {
          answer.type = 'number'
          answer.min = 1
          answer.max = 118
        }
        break;

      case 'symbol':
        answer = document.createElement('input')
        answer.type = 'text'
        break;

      case 'classification':
        answer = document.createElement('select')
        const option = document.createElement('option')
        option.disabled = true
        option.selected = true
        option.value = ''
        option.textContent = ' -- select an option -- '
        answer.appendChild(option);
        
        GROUPS.forEach((group) => {
          const option = document.createElement('option');
          option.textContent = group;
          option.value = group;
          answer.appendChild(option);
        })
        break;
    }
    answer.required = true
    div.appendChild(answer);

    answer.addEventListener('change', e => {
      updateUserAnswer(question, answer.value)
        .then(returnedQuestion => {
          quiz.quiz_questions[index] = returnedQuestion
        });
    })    
  }

  if (question.user_answer) answer.value = question.user_answer

  div.appendChild(hr);
  
  return div;
  
}

function displayQuizzes() {
  const container = clearContainer();
  const div = document.createElement('div')
  div.className = "quiz-list"

  container.appendChild(div);

  getQuizzes(currentUser.id)
    .then(quizzes => {
      if (quizzes.length === 0) {
        const p = document.createElement('p')
        p.classList.add('has-text-weight-bold')
        p.textContent = 'You do not have any quizzes.'
        div.appendChild(p)
      } else {
        quizzes.forEach((quiz, index) => {
          div.appendChild(createQuizInfo(quiz, index));
        })
      }
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

function createLogIn() {
  const container = clearContainer();
  const columns = document.createElement('div')
  const form = document.createElement('form');
  const column = document.createElement('column')
  const h1 = document.createElement('h1');
  const username = createInput('username', 'text', 'Enter your username', 'Username');
  const div = document.createElement('div')

  div.appendChild(createButton('submit', 'Sign In'))

  h1.textContent = 'Sign In';

  form.addEventListener('submit', () => {
    event.preventDefault();
    signInUser(event.target[0].value);
  })

  const signUp = document.createElement('p')
  const br = document.createElement('br')

  signUp.textContent = 'Not registered? Sign up here.'
  signUp.className = 'clickable'

  signUp.addEventListener('click', () => {
    event.preventDefault();
    createSignUp();
  })


  column.append(username, div);
  form.append(column, br, signUp);
  columns.append(h1, form)
  container.appendChild(columns);
}

function createInput(name, type, placeholder, label_name, user_obj) {
  const field = document.createElement('div')
  const fieldLabel = document.createElement('div')
  const label = document.createElement('label')
  const fieldBody = document.createElement('div')
  const control = document.createElement('div')
  const input = document.createElement('input')

  field.className = 'field is-horizontal'
  fieldLabel.className = 'field-label'
  fieldBody.className = 'field-body'

  label.className = 'label'
  label.textContent = label_name
  label.for = name
  fieldLabel.appendChild(label)

  control.className = 'control'

  input.className = 'input'
  input.placeholder = placeholder
  input.type = type
  input.id = name
  input.name = name
  input.required = true

  if (user_obj) {
    input.value = user_obj[name]
  }

  control.appendChild(input)
  fieldBody.appendChild(control)

  field.append(fieldLabel, fieldBody)

  return field;

}

function createButton(type, text) {
  const field = document.createElement('div')
  const fieldLabel = document.createElement('div')
  const fieldBody = document.createElement('div')
  const fieldButton = document.createElement('div')
  const control = document.createElement('control')
  const button = document.createElement('button');

  field.className = 'field'
  fieldLabel.className = 'field-label'
  fieldBody.className = 'field-body'
  fieldButton.className = 'field'
  control.className = 'control'

  button.className = 'button is-link'
  button.type = type
  button.textContent = text

  control.appendChild(button);
  fieldButton.appendChild(control);
  fieldBody.appendChild(fieldButton)

  field.append(fieldLabel, fieldBody);

  return field
}

function createSubmitCancelGroup(cancelFunction) {
  const field = document.createElement('div')
  field.className = 'field is-grouped'

  const submitControl = document.createElement('p')
  submitControl.className = 'control'

  const submitButton = document.createElement('button');
  submitButton.className = 'button is-primary'
  submitButton.textContent = 'Submit'

  const cancelControl = document.createElement('p')
  cancelControl.className = 'control'

  const cancelButton = document.createElement('a');
  cancelButton.className = 'button is-light'
  cancelButton.textContent = 'Cancel'

  submitControl.appendChild(submitButton);
  cancelControl.appendChild(cancelButton);
  field.append(submitControl, cancelControl)

  cancelButton.addEventListener('click', () => {
    cancelFunction();
  });

  return field;
}

function createSignUp() {
  const container = clearContainer();

  const columns = document.createElement('div')
  const form = document.createElement('form');
  const column = document.createElement('column')
  const h1 = document.createElement('h1');
  const username = createInput('username', 'text', 'Enter your username', 'Username');
  const firstName = createInput('first_name', 'text', 'Enter your first name', 'First Name');
  const lastName = createInput('last_name', 'text', 'Enter your last name', 'Last Name');

  const buttons = document.createElement('div')
  buttons.appendChild(createSubmitCancelGroup(createLogIn));

  h1.textContent = 'Sign Up';

  form.addEventListener('submit', () => {
    event.preventDefault();
    const body = {
      username: event.target[0].value,
      first_name: event.target[1].value,
      last_name: event.target[2].value
    }
    signUpUser(body);
  })

  column.append(username, firstName, lastName, buttons);
  form.append(column);
  columns.append(h1, form)
  container.appendChild(columns);
}

function createUpdateUserDetails() {
  const container = clearContainer();

  const div = document.createElement('div')
  const h1 = document.createElement('h1');
  h1.textContent = 'User Settings';
  const p = document.createElement('p')
  p.textContent = 'To update your details, enter the changes below and click Submit.'

  const columns = document.createElement('div')
  columns.className = 'columns'

  div.append(h1, p, columns)

  const userColumn = document.createElement('div')
  userColumn.className = 'column'
  userColumn.append(createUserDetailsForm());

  const quesColumn = document.createElement('div')
  quesColumn.classList.add('column', 'is-two-fifths')
  quesColumn.append(createQuesTypeForm());

  columns.append(userColumn, quesColumn)
  container.appendChild(div);
}

function createUserDetailsForm() {
  const userDiv = document.createElement('div');
  userDiv.className = 'box'
  userDiv.id = 'user-details'

  const userForm = document.createElement('form');

  const userh3 = document.createElement('h3')
  userh3.textContent = 'User Details'

  const username = createInput('username', 'text', 'Enter your username', 'Username', currentUser);
  const firstName = createInput('first_name', 'text', 'Enter your first name', 'First Name', currentUser);
  const lastName = createInput('last_name', 'text', 'Enter your last name', 'Last Name', currentUser);
  const noQues = createInput('no_of_ques', 'text', 'Enter the number of questions to create for each quiz', 'Number of questions', currentUser);

  const userButtons = document.createElement('div')
  userButtons.appendChild(createSubmitCancelGroup(createUpdateUserDetails));

  userForm.addEventListener('submit', () => {
    event.preventDefault();
    const body = {
      username: event.target[0].value,
      first_name: event.target[1].value,
      last_name: event.target[2].value,
      no_of_ques: event.target[3].value
    }
    
    patchUser(currentUser.id, body)
      .then(returnedUser => {
        currentUser = returnedUser
        createUpdateUserDetails();
      })
  })

  userForm.append(userh3, username, firstName, lastName, noQues, userButtons);
  userDiv.append(userForm);

  return userDiv;
}

function createQuesTypeForm() {
  let quesDiv = document.querySelector('#ques-types')
  if (quesDiv) {
    while (quesDiv.lastChild) {
      quesDiv.removeChild(quesDiv.lastChild)
    }
  } else {
    quesDiv = document.createElement('div');
    quesDiv.className = 'box'
    quesDiv.id = 'ques-types'
  }

  const quesForm = document.createElement('form');

  const quesh3 = document.createElement('h3')
  quesh3.textContent = 'Tick the types of quiz questions to include'
  quesForm.append(quesh3);

  getQuestionTypes(currentUser.id)
    .then(types => {
      types.forEach((type) => {
        const div = document.createElement('div')
        div.className = 'field'
        const label = document.createElement('label')
        label.className = 'checkbox'
        const input = document.createElement('input')
        input.type = 'checkbox'
        input.name = type.name
        input.value = type.id
        input.checked = type.selected
        input.addEventListener('change', () => {
          selectUserQuestion(input, type, currentUser)
            .then(response => {
              createQuesTypeForm();
            })
        })

        text = document.createTextNode(`  ${type.name}`)
        label.append(input, text);
        div.appendChild(label)
        quesForm.appendChild(div, document.createElement('br'));
    })
  })

  quesDiv.append(quesForm);

  return quesDiv;
}

function selectUserQuestion(input, type, user) {
  if (type.selected) {
    return deleteUserQuestion(type.user_question_id)
      .then(response => {
        if (!response.message) {
          displayErrorMessage(response.error.join('\r\n'));
        }
      })
  } else {
    return postUserQuestion({user_id: user.id, subject_id: type.id})
  }
} 