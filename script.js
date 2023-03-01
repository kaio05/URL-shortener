const linkButton = document.querySelector('.shorten-btn');
const input = document.querySelector('.input');
const errorMessage = document.querySelector('.error-message');

linkButton.addEventListener('click', async() => {
    shortenURL(input.value);
});

async function shortenURL(url) {  

    let link = url
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(link)}`);
    xhr.send();
    xhr.responseType = 'json';
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 201) {
            const shortenLink = xhr.response.full_shorten_link;
            input.classList.remove('error');
            errorMessage.classList.remove('show');
            return shortenLink;
        } else {
            console.log(`Error: ${xhr.status}`);
            input.classList.add('error');
            errorMessage.classList.add('show');
            return false;
        }
    }
};
 

// const getURL = fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`)
//     .then(response => response.json())
//     .then(result => console.log(result.full_short_link))
// }
    // const getShort = GET/POST (`https://api.shrtco.de/v2/shorten?url=${link}`)
    //     .then(response => response.json())
    //     .then(result => console.log(result.full_short_link))

    // let response = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(link)}`);
    // let shortened = await response.json();
    // return shortened.full_short_link;

    // let request =  await fetch(`https://api.shrtco.de/v2/shorten?url=${link}`);
    // let response = (await request.json());
    // console.log(response.full_short_link);

    // let request = (`https://api.shrtco.de/v2/shorten?url=${link}`)
    // let response = await request.full_short_link



// console.log(shortenURL("https://www.cursoemvideo.com/")); 
/*
function verifyURL() {
    let link = String(input.value);
    if (link.length == 0) {
        input.classList.add('error');
        errorMessage.classList.add('show');
    } else {
        input.classList.remove('error');
        errorMessage.classList.remove('show');
    }
}

function generateLink() {
    alert('hello');
} 
*/