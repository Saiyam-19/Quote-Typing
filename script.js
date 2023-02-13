const quotesAPI = "https://type.fit/api/quotes";
const quote = document.querySelector("#quote-text");
const input = document.querySelector("#input");
const points = document.querySelector("#points");
const time = document.querySelector("#time");
const avgTime = document.querySelector("#avg-time");
const form = document.querySelector("#form");
const errorModal = document.querySelector("#error-modal");
const errorMessage = document.querySelector("#error-message");

let quotes = [];
let currentQuote = "";
let pointsValue = 0;
let startTime = 0;
let endTime = 0;
let totalTime = 0;
let attempts = 0;

fetch(quotesAPI)
  .then(response => response.json())
  .then(data => {
    quotes = data;
    selectQuote();
  });

form.addEventListener("submit", event => {
  event.preventDefault();

  endTime = new Date().getTime();
  time.textContent = `Time: ${(endTime - startTime) / 1000} seconds`;
  totalTime += (endTime - startTime) / 1000;

  if (input.value === currentQuote) {
    pointsValue++;
    points.textContent = `Points: ${pointsValue}`;
    avgTime.textContent = `Avg Time: ${totalTime / ++attempts} seconds`;
  } else {
    errorMessage.textContent = `Incorrect! The correct quote is: "${currentQuote}"`;
    errorModal.style.display = "block";
    pointsValue = 0;
    points.textContent = `Points: ${pointsValue}`;
  }

  input.value = "";
  selectQuote();
});

input.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    form.submit();
  }
});

errorModal.addEventListener("click", event => {
  errorModal.style.display = "none";
});

function selectQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
    currentQuote = quotes[randomIndex].text;
    const words = currentQuote.split(" ");
    const quoteStart = Math.floor(Math.random() * (words.length - 5));
    const quoteEnd = Math.min(quoteStart + 10, words.length - 1);
    quote.textContent = `${words.slice(0, quoteStart).join(" ")} ... ${words.slice(quoteEnd).join(" ")} ...`;
    startTime = new Date().getTime();
}
