// Configuration
const CONFIG = {
  numberOfCards: 62, // Nombre de cartes
  winningCardIndex: null, // Sera défini aléatoirement
  friendPhotos: [
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg",
    "images/photo5.jpg",
    "images/photo6.jpg",
    "images/photo7.jpg",
    "images/photo8.jpg",
    "images/photo9.jpg",
    "images/photo10.jpg",
    "images/photo11.jpg",
    "images/photo12.jpg",
    "images/photo13.jpg",
    "images/photo14.jpg",
    "images/photo15.jpg",
    "images/photo16.jpg",
    "images/photo17.jpg",
    "images/photo18.jpg",
    "images/photo19.jpg",
    "images/photo20.jpg",
    "images/photo21.jpg",
    "images/photo22.jpg",
    "images/photo23.jpg",
    "images/photo24.jpg",
    "images/photo25.jpg",
    "images/photo26.jpg",
    "images/photo27.jpg",
    "images/photo28.jpg",
    "images/photo29.jpg",
    "images/photo30.jpg",
    "images/photo31.jpg",
    "images/photo32.jpg",
    "images/photo33.jpg",
    "images/photo34.jpg",
    "images/photo35.jpg",
    "images/photo36.jpg",
    "images/photo37.jpg",
    "images/photo38.jpg",
    "images/photo39.jpg",
    "images/photo40.jpg",
    "images/photo41.jpg",
    "images/photo42.jpg",
    "images/photo43.jpg",
    "images/photo44.jpg",
    "images/photo45.jpg",
    "images/photo46.jpg",
    "images/photo47.jpg",
    "images/photo48.jpg",
    "images/photo49.jpg",
    "images/photo50.jpg",
    "images/photo51.jpg",
    "images/photo52.jpg",
    "images/photo53.jpg",
    "images/photo54.jpg",
    "images/photo55.jpg",
    "images/photo56.jpg",
    "images/photo57.jpg",
    "images/photo58.jpg",
    "images/photo59.jpg",
    "images/photo60.jpg",
    "images/photo61.jpg",
    "images/photo62.jpg",
  ],
};

// Choisir une carte gagnante au hasard
CONFIG.winningCardIndex = Math.floor(Math.random() * CONFIG.numberOfCards);

// Générer les cartes en pyramide
function createCards() {
  const grid = document.getElementById("cardsGrid");

  // Structure en forme de pénis 🍆 = 62 cartes
  // Format: nombre de cartes par groupe, 0 = espace
  const penisRows = [
    [2], // Pointe gland
    [4], // Gland
    [4], // Gland
    [2], // Bas gland
    [2], // Tige
    [2], // Tige
    [2], // Tige
    [2], // Tige
    [2], // Tige
    [4], // Base
    [4, 0, 4], // Boules haut
    [5, 0, 5], // Boules milieu
    [5, 0, 5], // Boules milieu
    [4, 0, 4], // Boules bas
  ];
  // Total: 2+4+4+2+2+2+2+2+2+4+8+10+10+8 = 62

  let cardIndex = 0;

  penisRows.forEach((rowConfig) => {
    const row = document.createElement("div");
    row.className = "pyramid-row";

    rowConfig.forEach((groupSize, groupIndex) => {
      if (groupSize === 0) {
        // Ajouter un espace entre les boules
        const spacer = document.createElement("div");
        spacer.style.width = "30px";
        row.appendChild(spacer);
      } else {
        for (
          let j = 0;
          j < groupSize && cardIndex < CONFIG.numberOfCards;
          j++
        ) {
          const card = createCard(cardIndex);
          row.appendChild(card);
          cardIndex++;
        }
      }
    });

    grid.appendChild(row);
  });
}

// Créer une carte individuelle
function createCard(index) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.index = index;

  // Face arrière (point d'interrogation)
  const cardBack = document.createElement("div");
  cardBack.className = "card-face card-back";

  // Face avant (photo)
  const cardFront = document.createElement("div");
  cardFront.className = "card-face card-front";

  const img = document.createElement("img");
  img.src =
    CONFIG.friendPhotos[index] ||
    `https://picsum.photos/200/300?random=${index}`;
  img.alt = "Photo";
  img.onerror = function () {
    // Si l'image ne charge pas, utiliser un placeholder
    this.src = `https://picsum.photos/200/300?random=${index}`;
  };

  cardFront.appendChild(img);
  card.appendChild(cardBack);
  card.appendChild(cardFront);

  card.addEventListener("click", () => flipCard(card, index));

  return card;
}

// Retourner une carte avec animation d'agrandissement
function flipCard(card, index) {
  if (
    card.classList.contains("flipped") ||
    card.classList.contains("animating")
  )
    return;

  const overlay = document.getElementById("cardOverlay");

  // Récupérer la position actuelle de la carte
  const rect = card.getBoundingClientRect();
  const startX = rect.left;
  const startY = rect.top;
  const startWidth = rect.width;
  const startHeight = rect.height;

  // Calculer la position centrale de l'écran
  const endWidth =
    window.innerWidth < 480 ? 200 : window.innerWidth < 768 ? 250 : 280;
  const endHeight =
    window.innerWidth < 480 ? 270 : window.innerWidth < 768 ? 340 : 380;
  const endX = (window.innerWidth - endWidth) / 2;
  const endY = (window.innerHeight - endHeight) / 2;

  // Fixer la position de départ
  card.style.position = "fixed";
  card.style.left = startX + "px";
  card.style.top = startY + "px";
  card.style.width = startWidth + "px";
  card.style.height = startHeight + "px";

  // Afficher l'overlay
  overlay.classList.add("show");

  // Déclencher l'animation vers le centre
  requestAnimationFrame(() => {
    card.classList.add("animating");
    card.style.left = endX + "px";
    card.style.top = endY + "px";
    card.style.width = endWidth + "px";
    card.style.height = endHeight + "px";

    // Retourner la carte après l'agrandissement
    setTimeout(() => {
      card.classList.add("flipped");

      // Vérifier si c'est la carte gagnante
      if (index === CONFIG.winningCardIndex) {
        setTimeout(() => {
          card.classList.add("winner");
          showBirthdayModal();
          startFireworks();
          createConfetti();
        }, 800);
      }
      // La carte reste affichée - cliquer sur l'overlay pour fermer
    }, 600);
  });
}

// Fermer une carte (instantané, sans animation)
function closeCard(card) {
  const overlay = document.getElementById("cardOverlay");

  // Désactiver les transitions pour fermeture instantanée
  card.style.transition = "none";

  card.classList.remove("animating");
  card.style.position = "";
  card.style.left = "";
  card.style.top = "";
  card.style.width = "";
  card.style.height = "";

  overlay.classList.remove("show");

  // Réactiver les transitions après un court délai
  setTimeout(() => {
    card.style.transition = "";
  }, 50);
}

// Permettre de fermer en cliquant sur l'overlay ou la carte
document.addEventListener("DOMContentLoaded", () => {
  createCards();

  document.getElementById("cardOverlay").addEventListener("click", () => {
    const animatingCard = document.querySelector(".card.animating");
    if (animatingCard && !animatingCard.classList.contains("winner")) {
      closeCard(animatingCard);
    }
  });

  // Fermer en cliquant sur la carte agrandie
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".card.animating.flipped");
    if (card && !card.classList.contains("winner")) {
      closeCard(card);
    }
  });
});

// Afficher le modal d'anniversaire
function showBirthdayModal() {
  const modal = document.getElementById("birthdayModal");
  modal.classList.add("show");
}

// Fermer le modal
function closeModal() {
  const modal = document.getElementById("birthdayModal");
  modal.classList.remove("show");
  stopFireworks();
}

// === FEUX D'ARTIFICE ===
let fireworksAnimation = null;
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = {
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 10,
    };
    this.alpha = 1;
    this.decay = Math.random() * 0.015 + 0.005;
    this.size = Math.random() * 3 + 1;
  }

  update() {
    this.velocity.y += 0.1; // Gravité
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= this.decay;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

function createFirework(x, y) {
  const colors = [
    "#ff0000",
    "#ffd700",
    "#00ff00",
    "#00ffff",
    "#ff00ff",
    "#ff6b6b",
    "#4ecdc4",
    "#a29bfe",
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];

  for (let i = 0; i < 80; i++) {
    particles.push(new Particle(x, y, color));
  }
}

function animateFireworks() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter((p) => p.alpha > 0);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  // Créer de nouveaux feux d'artifice aléatoirement
  if (Math.random() < 0.05) {
    createFirework(
      Math.random() * canvas.width,
      Math.random() * canvas.height * 0.5,
    );
  }

  fireworksAnimation = requestAnimationFrame(animateFireworks);
}

function startFireworks() {
  // Lancer plusieurs feux d'artifice initiaux
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      createFirework(
        Math.random() * canvas.width,
        Math.random() * canvas.height * 0.5,
      );
    }, i * 200);
  }
  animateFireworks();
}

function stopFireworks() {
  if (fireworksAnimation) {
    cancelAnimationFrame(fireworksAnimation);
    fireworksAnimation = null;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = [];
}

// === CONFETTIS ===
function createConfetti() {
  const colors = [
    "#ffd700",
    "#ff6b6b",
    "#4ecdc4",
    "#a29bfe",
    "#fd79a8",
    "#00b894",
  ];

  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.top = "-10px";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      confetti.style.animationDuration = Math.random() * 2 + 2 + "s";

      if (Math.random() > 0.5) {
        confetti.style.borderRadius = "50%";
      }

      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 4000);
    }, i * 30);
  }
}
