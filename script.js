const cardStack = document.getElementById("cardStack");

const users = [
  { name: "Anna", age: 25, location: "Paris", bio: "Studying Arts, loves dogs", matchCode: null, class: "a" },
  { name: "Liam", age: 28, location: "New York", bio: "Tech geek, coffee lover", matchCode: null, class: "b" },
  { name: "Maya", age: 24, location: "Berlin", bio: "Photographer with a passion for nature", matchCode: null, class: "c" },
  { name: "Noah", age: 30, location: "London", bio: "Music producer who loves vinyl", matchCode: null, class: "d" },
  { name: "Sophie", age: 27, location: "Rome", bio: "History buff, gelato expert", matchCode: null, class: "e" },
  { name: "Ethan", age: 26, location: "Tokyo", bio: "Manga reader, sushi devourer", matchCode: "MATCHME", class: "f" },
  { name: "Isla", age: 22, location: "Madrid", bio: "Salsa dancer and language nerd", matchCode: null, class: "a" },
  { name: "James", age: 31, location: "Toronto", bio: "Adventure junkie & cat dad", matchCode: null, class: "b" },
  { name: "Chloe", age: 23, location: "Amsterdam", bio: "Cycling champ, plant mom", matchCode: null, class: "c" },
  { name: "Leo", age: 29, location: "San Francisco", bio: "AI researcher with a soft spot for poetry", matchCode: null, class: "d" },
  { name: "Emma", age: 26, location: "Vienna", bio: "Classical pianist who codes at night", matchCode: null, class: "e" },
  { name: "Jack", age: 27, location: "Sydney", bio: "Surfer, software engineer", matchCode: null, class: "f" },
  { name: "Zara", age: 25, location: "Istanbul", bio: "Architect & amateur astrologer", matchCode: null, class: "a" },
  { name: "Oscar", age: 28, location: "Mexico City", bio: "Food blogger & taco connoisseur", matchCode: null, class: "b" },
  { name: "Luna", age: 24, location: "Barcelona", bio: "Yoga instructor & minimalist", matchCode: null, class: "c" },
  { name: "Theo", age: 30, location: "Prague", bio: "Craft beer snob with a heart of gold", matchCode: null, class: "d" },
  { name: "Ivy", age: 23, location: "Seoul", bio: "Fashion stylist who can code", matchCode: "MATCHME", class: "e" },
  { name: "Miles", age: 32, location: "Cape Town", bio: "Wildlife photographer, off-grid dreamer", matchCode: null, class: "f" },
  { name: "Nina", age: 27, location: "Dublin", bio: "Stand-up comic with a love for tea", matchCode: null, class: "a" },
  { name: "Kai", age: 25, location: "Helsinki", bio: "Gamer and part-time snowboarder", matchCode: null, class: "b" }
];

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(users);

// Track matches
const matchSet = new Set();

// Render cards
function renderCards() {
cardStack.innerHTML = "";
  users.forEach((user, index) => {
    const div = document.createElement("div");
    div.className = `card ${user.class}`;
    div.style.setProperty("--i", users.length - index); // Top card has higher --i
    div.dataset.matchCode = user.matchCode;
    div.innerHTML = `
      <h2>${user.name}, ${user.age} - ${user.location}</h2>
      <p>${user.bio}</p>
    `;
    cardStack.appendChild(div);
  });
}

renderCards();

// Button logic
function swipeCard(accept = false) {
  const topCard = cardStack.firstElementChild;
  if (!topCard) return;

  const direction = accept ? "150%" : "-150%";
  const rotate = accept ? 20 : -20;

  topCard.style.transition = "transform 0.4s ease, opacity 0.4s ease";
  topCard.style.transform = `translateX(${direction}) rotate(${rotate}deg)`;
  topCard.style.opacity = "0";

  setTimeout(() => {
    const matchCode = topCard.dataset.matchCode;
    if (accept && matchCode) {
      matchSet.add(matchCode);
      if (matchSet.size === 2) {
        console.log("BOTH match cards accepted!");
        document.getElementById("chatPopup").style.display = "block";
      }
    }
    topCard.remove();
  }, 400);
}


document.getElementById("reject").addEventListener("click", () => swipeCard(false));
document.getElementById("accept").addEventListener("click", () => swipeCard(true));



