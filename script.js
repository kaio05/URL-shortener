const linkButton = document.querySelector('.shorten-btn');
const input = document.querySelector('.input');
const errorMessage = document.querySelector('.error-message');
const linkArea = document.querySelector('.link-copying-area');
var copyText = document.getElementById('copy-text');

linkButton.onclick = () => {
    input.value == '' ? 
        urlError() :
            input.value == 'clear' ?
                clearHistory() :
                    shortenIt()
}

input.addEventListener('keypress', e => {
    e.key == 'Enter' && input.value == '' ?  urlError() :
        e.key == 'Enter' && input.value == 'clear' ? clearHistory() :
            e.key == 'Enter' ? shortenIt() : console.log();
})

async function shortenIt() {
    //console.log('calling');
    shortenURL(input.value);
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
                urlError();
            }
        }
};



function createContainer(short, original) {
    checkMaxLink();

    const container = document.createElement('div');

    container.classList.add('link-container');
    
    const URLContainer = document.createElement('span');
    URLContainer.classList.add('original-url');
    URLContainer.innerText = original;
    
    const shortContainer = document.createElement('span');
    shortContainer.classList.add('shorten-link');
    shortContainer.innerText = short;
    
    container.append(URLContainer);
    container.append(shortContainer);
    linkArea.prepend(container);

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.innerText = 'Copy';
    copyBtn.id = short;
    container.appendChild(copyBtn);

    copyButtonFunction(copyText);

    localStorage.setItem('key', linkArea.innerHTML);
}

const copyButtonFunction = async () => {

    let buttons = document.querySelectorAll('.copy-btn');
    buttons.forEach(item => {
        item.addEventListener('click', async (e) => {
            let button = e.currentTarget;
            // let copyText = button.id;
            // try {
            //     await navigator.clipboard.writeText(copyText);
            //     console.log(`Content copied to clipboard: ${copyText}`);
            // } catch (err) {
            //     console.error('Failed to copy: ', err);
            // }
            copyText.value = button.id
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(copyText.value);
            var toolTip = document.getElementById('toolTip');
            toolTip.innerHTML = 'Copied:', copyText.value;

            buttons.forEach(btn => btn != button && btn.classList.remove('checked'));
            button.classList.add('checked');
    });
    });
    
    console.log(buttons)
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
    linkArea.innerHTML = localStorage.getItem('key');
    copyButtonFunction(copyText);
    
    console.log(linkArea.innerHTML);
});

function clearHistory() {
    localStorage.clear();
    window.location.reload();
}

function checkMaxLink() {
    let num = linkArea.childElementCount;
    num > 4 ?
        linkArea.removeChild(linkArea.lastChild) : console.log();
}


function copiar() {
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    var toolTip = document.getElementById('toolTip');
    toolTip.innerHTML = 'Copied:', copyText.value;
}