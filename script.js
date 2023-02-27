const linkButton = document.querySelector('.shorten-btn');
const input = document.querySelector('.input');

linkButton.addEventListener('click', () => {
    link = input.value;
    validateURL();
})

const validateURL = () => {
    alert('hello world!')
}