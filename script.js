//Get quote
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//colors array, 
 const colors = ["#e7604e", "#D95D39", "#F0A202", "#A6FFA1", "#61E8E1", "#016FB9", "#99C1B9", "#613DC1", "#127475","#F2E94E", "#A3D9FF", "#F44708", "#8E7DBE", "#8FB8DE", "#034078", "#BF6900","#FF1053", "#802392", "#F06543", "#E9190F", "#310A31", "#9B5094", "#FAA613","#87255B", "#88B7B5", "#D782BA", "#246EB9", "#1282A2", "#E18AD4", "#87FF65"]

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}
function getRandomColor(){
  return Math.floor(Math.random() * colors.length);
}
function changeColor(){
  let randomColor = getRandomColor();

  document.body.style.backgroundColor = colors[randomColor];
  document.body.style.color = colors[randomColor];
  newQuoteBtn.style.backgroundColor = colors[randomColor];
  twitterBtn.style.backgroundColor = colors[randomColor];
  loader.style.borderTopColor = colors[randomColor];
}
async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = 'https://warm-everglades-01381.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    //If author is blank
    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    //Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    removeLoadingSpinner();
  } catch (error) {
    getQuote();
  }
}
//Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}
//Event Listeners

newQuoteBtn.addEventListener('click', () =>{
  getQuote();
  changeColor();
 
});
twitterBtn.addEventListener('click', tweetQuote);
//on load
getQuote();
