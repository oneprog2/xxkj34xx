# 🎂 Page d'Anniversaire Interactive

Une page web fun pour souhaiter un joyeux anniversaire avec un jeu de cartes à retourner !

## 🎮 Comment ça marche

1. Le visiteur voit 9 cartes face cachée
2. Quand il clique sur une carte, une photo apparaît avec une belle animation
3. S'il trouve la "bonne" carte, un message "Joyeux Anniversaire" s'affiche avec la photo du cadeau et des feux d'artifice !

## 📸 Personnalisation

### Ajouter les photos

Place les images dans le dossier `images/` :

- `photo1.jpg` à `photo9.jpg` : Les photos de ton ami qui apparaissent sur les cartes
- `cadeau.jpg` : La photo du cadeau qui s'affiche à la fin

### Modifier le nombre de cartes

Dans `script.js`, modifie la variable `numberOfCards` :

```javascript
const CONFIG = {
  numberOfCards: 9, // Change ce nombre (ex: 6, 12, etc.)
  // ...
};
```

### Changer les messages

Dans `index.html`, tu peux modifier :

- Le titre de la page
- Le message d'anniversaire
- Le texte du bouton

## 🚀 Déployer sur GitHub Pages

1. Crée un repo GitHub
2. Push ce code
3. Va dans Settings > Pages
4. Sélectionne la branche `main` et le dossier `/ (root)`
5. Ton site sera disponible sur `https://ton-username.github.io/nom-du-repo/`

## 🎨 Personnaliser les couleurs

Les couleurs sont dans `style.css`. Les principales variables à modifier :

- Gradient de fond : ligne 8-9
- Couleur des cartes : `.card-back` et `.card-front`
- Couleur du titre : `.birthday-title`

## 📁 Structure des fichiers

```
├── index.html      # Structure de la page
├── style.css       # Tous les styles et animations
├── script.js       # Logique du jeu et feux d'artifice
├── images/         # Dossier pour les photos
│   ├── photo1.jpg
│   ├── photo2.jpg
│   ├── ...
│   └── cadeau.jpg
└── README.md
```

## ✨ Fonctionnalités

- Animation de retournement 3D des cartes
- Effet de survol sur les cartes
- Feux d'artifice animés en canvas
- Confettis qui tombent
- Design responsive (mobile-friendly)
- Carte gagnante aléatoire à chaque visite

Amuse-toi bien ! 🎉
