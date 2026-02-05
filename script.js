// Configuration
const CONFIG = {
  numberOfCards: 62, // Nombre de cartes
  winningCardIndex: null, // Sera défini aléatoirement
  friendimages: [
    "images/image1.JPEG",
    "images/image2.JPEG",
    "images/image3.JPEG",
    "images/image4.JPEG",
    "images/image5.JPEG",
    "images/image6.JPEG",
    "images/image7.JPEG",
    "images/image8.JPEG",
    "images/image9.JPEG",
    "images/image10.JPEG",
    "images/image11.JPEG",
    "images/image12.JPEG",
    "images/image13.JPEG",
    "images/image14.JPEG",
    "images/image15.JPEG",
    "images/image16.JPEG",
    "images/image17.JPEG",
    "images/image18.JPEG",
    "images/image19.JPEG",
    "images/image20.JPEG",
    "images/image21.JPEG",
    "images/image22.JPEG",
    "images/image23.JPEG",
    "images/image24.JPEG",
    "images/image25.JPEG",
    "images/image26.JPEG",
    "images/image27.JPEG",
    "images/image28.JPEG",
    "images/image29.JPEG",
    "images/image30.JPEG",
    "images/image31.JPEG",
    "images/image32.JPEG",
    "images/image33.JPEG",
    "images/image34.JPEG",
    "images/image35.JPEG",
    "images/image36.JPEG",
    "images/image37.JPEG",
    "images/image38.JPEG",
    "images/image39.JPEG",
    "images/image40.JPEG",
    "images/image41.JPEG",
    "images/image42.JPEG",
    "images/image43.JPEG",
    "images/image44.JPEG",
    "images/image45.JPEG",
    "images/image46.JPEG",
    "images/image47.JPEG",
    "images/image48.JPEG",
    "images/image49.JPEG",
    "images/image50.JPEG",
    "images/image51.JPEG",
    "images/image52.JPEG",
    "images/image53.JPEG",
    "images/image54.JPEG",
    "images/image55.JPEG",
    "images/image56.JPEG",
    "images/image57.JPEG",
    "images/image58.JPEG",
    "images/image59.JPEG",
    "images/image60.JPEG",
    "images/image61.JPEG",
    "images/image62.JPEG",
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

  // Face avant (image)
  const cardFront = document.createElement("div");
  cardFront.className = "card-face card-front";

  const img = document.createElement("img");
  img.src =
    CONFIG.friendimages[index] ||
    `https://picsum.images/200/300?random=${index}`;
  img.alt = "image";
  img.onerror = function () {
    // Si l'image ne charge pas, utiliser une image random parmi les 40 premières
    const randomIndex = Math.floor(Math.random() * 40) + 1;
    this.src = `images/image${randomIndex}.JPEG`;
    // Éviter boucle infinie si même l'image random n'existe pas
    this.onerror = null;
  };

  cardFront.appendChild(img);
  card.appendChild(cardBack);
  card.appendChild(cardFront);

  card.addEventListener("click", () => flipCard(card, index));

  // Marquer la carte gagnante en bleu (temporaire)
  if (index === CONFIG.winningCardIndex) {
    card.classList.add("winning-card");
  }

  return card;
}

// Retourner une carte avec animation d'agrandissement
function flipCard(card, index) {
  if (
    card.classList.contains("flipped") ||
    card.classList.contains("animating")
  )
    return;

  // Debug: afficher le nom de l'image
  const imgSrc = CONFIG.friendimages[index] || "PAS D'IMAGE DÉFINIE";
  console.log(`Carte ${index} - Image: ${imgSrc}`);

  const overlay = document.getElementById("cardOverlay");

  // Récupérer la position actuelle de la carte
  const rect = card.getBoundingClientRect();
  const startX = rect.left;
  const startY = rect.top;
  const startWidth = rect.width;
  const startHeight = rect.height;

  // Calculer la position centrale de l'écran
  const endWidth =
    window.innerWidth < 480 ? 340 : window.innerWidth < 768 ? 416 : 520;
  const endHeight =
    window.innerWidth < 480 ? 455 : window.innerWidth < 768 ? 560 : 700;
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

// Afficher l'animation DUEL puis le modal d'anniversaire
function showBirthdayModal() {
  const duelOverlay = document.getElementById("duelOverlay");
  const modal = document.getElementById("birthdayModal");
  const cardOverlay = document.getElementById("cardOverlay");

  // Cacher la carte agrandie
  const animatingCard = document.querySelector(".card.animating");
  if (animatingCard) {
    animatingCard.style.transition = "none";
    animatingCard.classList.remove("animating");
    animatingCard.style.position = "";
    animatingCard.style.left = "";
    animatingCard.style.top = "";
    animatingCard.style.width = "";
    animatingCard.style.height = "";
    setTimeout(() => {
      animatingCard.style.transition = "";
    }, 50);
  }
  cardOverlay.classList.remove("show");

  // D'abord afficher l'animation DUEL
  duelOverlay.classList.add("show");

  // Flash après l'animation du texte
  setTimeout(() => {
    duelOverlay.classList.add("flash");
  }, 2800);

  // Puis afficher le modal d'anniversaire
  setTimeout(() => {
    duelOverlay.classList.remove("show", "flash");
    modal.classList.add("show");
  }, 3500);
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
