// window.addEventListener('DOMContentLoaded', () => {
//     // console.log('helloworld');
//     createSplit();
// })

// const createSplit = () => {
//     const body = document.querySelector('body')

//     const leftSection = document.createElement('div');
//     leftSection.classList.add('left-section', 'text-center');

//     const leftHeading = document.createElement('h1');
//     leftHeading.classList.add('h1');
//     leftHeading.style.marginTop = '50%';
//     leftHeading.style.marginBottom = 'auto';
//     leftHeading.innerText = 'Learn Mode';

//     const rightSection = document.createElement('div');
//     rightSection.classList.add('right-section', 'text-center');

//     const rightHeading = document.createElement('div');
//     rightHeading.classList.add('h1');
//     rightHeading.style.marginTop = '50%';
//     rightHeading.style.marginBottom = 'auto';
//     rightHeading.innerText = 'Test Mode';

//     rightSection.append(rightHeading);
//     leftSection.append(leftHeading)
//     body.append(leftSection, rightSection);

//     selection(leftSection, rightSection);
// }

// const selection = (left, right) => {
//     left.addEventListener('click', () => {
//         console.log('learn mode initiated.');
        
//     })
// }