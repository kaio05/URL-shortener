let shortLink = shortenURL('https://kinsta.com/blog/http-status-codes/#:~:text=200%20Status%20Codes&text=200%3A%20%E2%80%9CEverything%20is%20OK.,has%20created%20a%20new%20resource.');

console.log(shortLink);

async function shortenURL(url) {  

    let link = url

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(link)}`);

    xhr.send();

    xhr.responseType = 'json';

    xhr.onload = () => {

        if (xhr.readyState == 4 && xhr.status == 201 || xhr.readyState == 4 && xhr.status == 200) {

            const data = xhr.response.result;

            const fullShortLink = data.full_short_link;

            //console.log(fullShortLink);

            return fullShortLink;

        } else {
            //console.log(`Error: ${xhr.status}`);
            return(`Error: ${xhr.status}`);
        }
    }
};