// script.js

// Player and Enemy Objects
// -------------------------
// The code defines two objects: `player` and `enemy`, which represent the player and enemy characters in the game.
// The `player` object has properties such as `name`, `attackDamage`, `attackSpeed`, `imagePath`, and `canAttack`.
// The `enemy` object has properties like `name`, `health`, and `imagePath`.
let player = {
  name: "Player",
  attackDamage: undefined,
  attackSpeed: undefined,
  currency: 0,
  floor: 0,
  imagePath: "",
  canAttack: true,
  inCombat: false,
};

let enemy = {
  name: "",
  health: undefined,
  imagePath: "",
};

function Monster(name, health, imagePath) {
  this.name = name;
  this.health = health;
  this.imagePath = imagePath;
}

const floorMonsters = [
  [
    new Monster("Skin-flayer", 100, "./assets/demon-skin-flayer.png"),
    new Monster("Bone-Crusher", 200, "./assets/character-lancer.png"),
  ],
];

function getRandomMonster(floor) {
  if (!player.inCombat) {
    const monsters = floorMonsters[floor];
    if (monsters) {
      const randomIndex = Math.floor(Math.random() * monsters.length);
      console.log(`Random index: ${randomIndex}`);
      const selectedMonster = monsters[randomIndex];
      return new Monster(
        selectedMonster.name,
        selectedMonster.health,
        selectedMonster.imagePath
      );
    } else {
      console.error(`No monsters defined for floor ${floor}`);
      return null;
    }
  }
  return null;
}

// DOM Elements
// ------------
// The code selects various DOM elements using `querySelector` and assigns them to variables for later use.
// These elements include:
// - `gameStart`: the game start screen element
// - `descendButton`: the "descend" button element
// - `characterSelectContainer`: the character select container element
const gameStart = document.querySelector(".game-start");
const descendButton = document.querySelector(".descend-button");
const characterSelectContainer = document.querySelector(
  ".character-select-container"
);

// - `wombImage`: the character select womb image element
const wombImage = document.querySelector(".character-select-womb");

// - `startGameButton`: the "start game" button element
const startGameButton = document.querySelector(".start-game-button");
let gameStarted = false;

// - `classSelect`: the class select dropdown element
const classSelect = document.querySelector(".class-select");

// Class Properties
// ----------------
// The code defines an object `classProperties` that contains properties for different character classes.
// Each class has properties such as `name`, `imagePath`, `description`, `attackDamage`, and `attackSpeed`.
const classProperties = {
  Warrior: {
    name: "Jehu",
    imagePath: "./assets/character-warrior.png",
    description: `Each scar on his body maps a battle survived, a desperate gamble made in the face of overwhelming odds. His victories are forged not just from tactics learned, but from the ghosts of fallen allies whispering in his ear. He fights not out of hope, but a cold determination that there must always be one left standing to meet hell and fear.`,
    attackDamage: 10,
    attackSpeed: 1.5,
  },
  Magician: {
    name: "Balaam",
    imagePath: "./assets/character-magician.png",
    description: `His studies began with a noble goal - to understand the elements, bolstering the bastion's defenses with nature's might. But with each spell, each delve into forgotten lore, desperation bled into obsession.`,
    attackDamage: 15,
    attackSpeed: 1.0,
  },
  Rogue: {
    name: "Doeg",
    imagePath: "./assets/character-rogue.png",
    description: `Found as a newborn cradled in his mother's corpse, a dark omen hanging over him, he learned to survive in the bastion's underbelly. He mastered not knightly combat, but the dirty tactics of ambush and assassination with his scavenged daggers. His strikes are honed from a life spent exploiting any weakness. Each battle is not for glory, but a brutal bid to ensure there's always one more survivor - himself`,
    attackDamage: 7,
    attackSpeed: 2.0,
  },
  Cleric: {
    name: "Urijah",
    imagePath: "./assets/character-cleric.png",
    description: `The hymns that once sustained him now feel like a mockery. His prayers go unanswered as the bastion crumbles. Yet, with each horrific sight, each plea ignored by the heavens, his will hardens. He wields his faith not as a shield, but as a battered weapon. Perhaps the gods are gone, perhaps they turned their backs... but even if so, the darkness will find him unbroken.`,
    attackDamage: 8,
    attackSpeed: 1.0,
  },
};

// - `description`: the class description element
const description = document.querySelector(".class-description");

// - `characterSelectImage`: the character select image element
const characterSelectImage = document.querySelector(".character-select-image");

// - `playerImage`: the player image element
// - `enemyImage`: the enemy image element
const playerImage = document.querySelector(".player-image");
const enemyImage = document.querySelector(".enemy-image");

// - `mainGameContainer`: the main game container element
const mainGameContainer = document.querySelector(".main-game-container");

// Utility Functions
// -----------------
// - `hideElement(element)`: Hides the specified element by setting its `display` style to `"none"`.
function hideElement(element) {
  element.style.display = "none";
}

// - `showElement(element)`: Shows the specified element by removing the `hidden` attribute.
function showElement(element) {
  element.removeAttribute("hidden");
}

// Blur womb image for character select
const blurClasses = [
  "blurred-Warrior",
  "blurred-Cleric",
  "blurred-Rogue",
  "blurred-Magician",
];

// - `clearBlurClasses()`: Removes the blur classes from the `wombImage` element.
function clearBlurClasses() {
  for (const blurClass of blurClasses) {
    wombImage.classList.remove(blurClass);
  }
}

// Event Listeners
// ---------------
// - `descendButton` mouseover event: Changes the image source of the "descend" button on mouseover.
descendButton.addEventListener("mouseover", () => {
  descendButton.src = "/assets/descend-buttonR.png";
});

// - `descendButton` mouseout event: Changes the image source of the "descend" button back to its original state on mouseout.
descendButton.addEventListener("mouseout", () => {
  descendButton.src = "/assets/descend-button.png";
});

// - `descendButton` click event: Hides the game start screen and shows the character select container after a delay of 1 second.
descendButton.addEventListener("click", () => {
  descendButton.src = "/assets/descend-buttonR.png";
  setTimeout(() => {
    hideElement(gameStart);
    showElement(characterSelectContainer);
  }, 1000);
});

// Start of character select
description.textContent = "Choose your fate...";
classSelect.value = "";
startGameButton.disabled = true;

// - `classSelect` change event: Updates the character select image, description, and player stats based on the selected class.
classSelect.addEventListener("change", () => {
  const selectedClass = classSelect.value;

  if (selectedClass === "") {
    wombImage.classList.remove(`blurred-${previousClass}`);
    characterSelectImage.src = "";
    description.textContent = "Choose your fate...";
    startGameButton.disabled = true;
  }

  if (selectedClass && classProperties[selectedClass]) {
    const { name, imagePath, attackDamage, attackSpeed } =
      classProperties[selectedClass];
    description.textContent = classProperties[selectedClass]["description"];
    // Update the player image (character select and main game container)
    characterSelectImage.src = imagePath;
    playerImage.src = imagePath;

    // Update the player stats
    player.name = name;
    player.attackDamage = attackDamage;
    player.attackSpeed = attackSpeed;
    // Update other properties as needed

    clearBlurClasses();
    wombImage.classList.add(`blurred-${selectedClass}`);
    startGameButton.disabled = false;
    previousClass = selectedClass;
  }
});

// - `startGameButton` click event: Hides the character select container and shows the main game container when clicked.
startGameButton.addEventListener("click", () => {
  if (!gameStarted) {
    hideElement(characterSelectContainer);
    showElement(mainGameContainer);
    console.log("Game should start");
    // Update player stats
    playerName.textContent += player.name;
    playerClass.textContent += classSelect.value;
    playerAttack.textContent += player.attackDamage;
    playerCurrency.textContent += player.currency;
    gameStarted = true;
  } else {
    hideElement(characterSelectContainer);
    showElement(mainGameContainer);
  }
});

// END of character select

// Game Logic
// ----------
// The code sets up variables for player and enemy UI elements, such as `playerName`, `playerClass`, `playerAttack`, `playerCurrency`, `enemyName`, `enemyHealth`, and `enemyCurrency`.
const playerName = document.querySelector(".player-name");
const playerClass = document.querySelector(".player-class");
const playerAttack = document.querySelector(".player-attack");
const playerCurrency = document.querySelector(".player-currency");

const enemyName = document.querySelector(".enemy-name");
const enemyHealth = document.querySelector(".enemy-health");
const enemyCurrency = document.querySelector(".enemy-currency");

// TODO: Add game logic

function gameLoop() {
  // TODO: Separate into a monsterSpawn function, game loop looks messy right now.
  // Check if the player is not in combat
  if (!player.inCombat) {
    // Select a random monster for the current floor
    const randomMonster = getRandomMonster(player.floor);
    if (randomMonster) {
      // Assign the selected monster to the enemy object
      enemy = randomMonster;
      // Update the enemy-related UI elements
      enemyName.textContent = enemy.name;
      enemyHealth.textContent = enemy.health;
      enemyImage.src = enemy.imagePath;
      // Set the player's inCombat status to true
      player.inCombat = true;
    }
  }
}

const gameLoopInterval = setInterval(gameLoop, 100);
