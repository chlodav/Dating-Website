const cardStack = document.getElementById("cardStack");

const sampleUsers = Array.from({ length: 20 }, (_, i) => ({
  name: `User${i + 1}`,
  age: 20 + (i % 10),
  location: "Paris",
  bio: "I love dogs & art!",
  matchCode: i === 5 || i === 12 ? "MATCHME" : null, // Match when both shown
  class: ["a", "b", "c", "d", "e", "f"][i % 6]
}));

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

shuffle(sampleUsers);

sampleUsers.forEach((user, index) => {
  const div = document.createElement("div");
  div.className = `card ${user.class}`;
  div.style.setProperty("--i", index);
  div.dataset.matchCode = user.matchCode;
  div.innerHTML = `
    <h2>${user.name}, ${user.age} ${user.location}</h2>
    <p>${user.bio}</p>
  `;
  cardStack.appendChild(div);
});

const rejectBtn = document.getElementById("reject");
const acceptBtn = document.getElementById("accept");
let matchSet = new Set();

function swipeCard(accept = false) {
  const topCard = cardStack.lastElementChild;
  if (!topCard) return;

  if (accept && topCard.dataset.matchCode) {
    matchSet.add(topCard.dataset.matchCode);
    if (matchSet.size === 2) {
      document.getElementById("chatPopup").style.display = "block";
    }
  }

  topCard.remove();
}

rejectBtn.addEventListener("click", () => swipeCard(false));
acceptBtn.addEventListener("click", () => swipeCard(true));

