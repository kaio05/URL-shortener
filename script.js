// const linkButton = document.querySelector('.shorten-btn');
// const input = document.querySelector('.input');
// const errorMessage = document.querySelector('.error-message');

// linkButton.addEventListener('click', () => {
//     //verifyURL();
    
// });


let url = "https://www.youtube.com/cursoemvideo";    

let request = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`);

let response = await request.json();

let shortened = response.result.full_short_link;

console.log(shortened);

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