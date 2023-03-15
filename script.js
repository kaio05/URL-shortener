const linkButton = document.querySelector('.shorten-btn');
const input = document.querySelector('.input');
const errorMessage = document.querySelector('.error-message');
const linkArea = document.querySelector('.link-copying-area');
let key = 'elementos';

linkButton.onclick = () => {
    if (input.value != '') {
        shortenIt();
    } else {
        urlError();
        alert('typing error');
    }
}

input.addEventListener('keypress', e => {
    if (e.key == 'Enter' && input.value != '') {
        shortenIt();
    } else if (e.key == 'Enter') {
        urlError();
        alert('typing error');
    }
})

async function shortenIt() {
    //console.log('calling');
    shortenURL('https://www.facebook.com/');
};

async function shortenURL(url) {  
    let link = url
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(link)}`);
    xhr.send();
    xhr.responseType = 'json';
    xhr.onload = await function f() {
            if (xhr.readyState == 4 && xhr.status == 201 || xhr.readyState == 4 && xhr.status == 200) {
                const data = xhr.response.result;
                const fullShortLink = data.full_short_link;
                createContainer(fullShortLink, link);
                urlSuccess();
                //console.log(xhr.status);
            } else {
                //console.log(`Error: ${xhr.status}`);
                urlError()
                alert('request error')
            }
        }
};



function createContainer(short, original) {

    const container = document.createElement('div');

    container.classList.add('link-container');
    const containers = document.querySelectorAll('.container');
    const URLContainer = document.createElement('span');
    URLContainer.classList.add('original-url');
    URLContainer.innerHTML = original;
    
    const shortContainer = document.createElement('span');
    shortContainer.classList.add('shorten-link');
    shortContainer.innerHTML = short;
    
    container.appendChild(URLContainer);
    container.appendChild(shortContainer);

    linkArea.prepend(container);

    copyButtonFunction(shortContainer, container);

    localStorage.setItem(key, linkArea.innerHTML);
}

function copyButtonFunction(shortContainer, container) {
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.innerHTML = 'Copy';
    container.appendChild(copyBtn);
    let buttons = document.querySelectorAll('.copy-btn');
    
    buttons.forEach(pbuttons => {
        pbuttons.addEventListener('click', e => {
            let copyText = shortContainer;
            let textArea = document.createElement('textarea');
            textArea.value = copyText.innerHTML;
            document.body.appendChild(textArea);
            textArea.select();
            navigator.clipboard.writeText(textArea.value);
            textArea.remove();

            let button = e.currentTarget;
            buttons.forEach(btn => btn != button && btn.classList.remove('checked'));
            button.classList.add('checked');
            console.log(button);

            // credits: https://stackoverflow.com/questions/73754798/how-can-i-deselect-one-button-when-i-select-another
    });
    });
}

function urlSuccess() {
    input.classList.remove('error');
    errorMessage.classList.remove('show');
}

function urlError() {
    input.classList.add('error');
    errorMessage.classList.add('show');
}

const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu')

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('hide');
}); 

window.addEventListener('load', () => {
    linkArea.innerHTML = localStorage.getItem(key);
    
    console.log(history);
});


clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    window.location.reload();
})

