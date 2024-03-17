// script.js

// Player and Enemy Objects
// -------------------------
// The code defines two objects: `player` and `enemy`, which represent the player and enemy characters in the game.
// The `player` object has properties such as `name`, `attackDamage`, `attackSpeed`, `imagePath`, and `canAttack`, etc.
// The `enemy` object has properties like `name`, `health`, and `imagePath` as we use a timer for defeat.

let player = {
  name: "Player",
  attackDamage: undefined,
  attackSpeed: undefined,
  currency: 0,
  floor: 0,
  imagePath: "",
  canAttack: true,
  inCombat: false,
  timer: 30,
  maxTimer: 30,
};

let enemy = {
  name: "",
  health: undefined,
  imagePath: "",
  currency: 0,
};

// This is used for the updateEnemyName function later, this needs to be reworked eventually
let enemyNamePopulated = false;

function Monster(name, health, imagePath, currency) {
  this.name = name;
  this.health = health;
  this.imagePath = imagePath;
  this.currency = currency;
}

const floorMonsters = [
  [
    new Monster("Skin-flayer", 100, "./assets/demon-skin-flayer.png", 5),
    new Monster("Bone-Crusher", 200, "./assets/character-lancer.png", 10),
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
        selectedMonster.imagePath,
        selectedMonster.currency
      );
    } else {
      console.error(`No monsters defined for floor ${floor}`);
      return null;
    }
  }
  return null;
}

function spawnEnemy() {
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
      enemyImage.removeAttribute("hidden");
      // Set the player's inCombat status to true
      player.inCombat = true;
    }
  }
}

// This function is used to simulate an attack from one entity to another.
function attackEnemy(attacker, target) {
  // Check if the attacker can attack and has defined attack damage and speed
  if (
    attacker.canAttack &&
    attacker.attackDamage !== undefined &&
    attacker.attackSpeed !== undefined
  ) {
    // Reduce the target's health by the attacker's damage
    target.health -= attacker.attackDamage;
    // Log the target's remaining health
    console.log(`${target.name} health: ${target.health}`);
    // Set the attacker's ability to attack to false
    attacker.canAttack = false;
    // After a delay based on the attacker's attack speed, allow the attacker to attack again
    setTimeout(() => {
      attacker.canAttack = true;
    }, attacker.attackSpeed * 1000);
  }
}

function checkEnemyHealth() {
  if (enemy.health) {
    if (enemy.health <= 0) {
      enemyImage.setAttribute("hidden", true);
      player.currency += enemy.currency;
      enemy = null;
      player.inCombat = false;
      // TODO: Interlinked with updateEnemyName, need to find a better solution
      enemyNamePopulated = false; // Reset enemyNamePopulated when the enemy is defeated
      setTimeout(spawnEnemy, 3000);
    }
  }
}

function updateTimer() {
  if (player.inCombat && enemy) {
    player.timer -= 0.01;
  }
  if (player.timer <= 0) {
    //Player has run out of time
    playerDeath();
  }
}

function resetPlayerTimer() {
  player.timer = player.maxTimer;
}

// ! Future upgrade?
function extendPlayerTimer(seconds) {
  player.maxTimer += seconds;
  player.timer += seconds;
}

function playerDeath() {
  // Handle player death logic
  console.log("Player died!");
  // Reset the player's timer to its maximum value
  player.timer = player.maxTimer;
  // Decrease the player's floor by 1 (or handle game over if on the first floor)
  if (player.floor > 0) {
    player.floor--;
  } else {
    // Game over logic
    console.log("Game Over!");
    // Reset player stats, show game over screen, etc.
  }
  // Reset the enemy
  enemy = null;
  player.inCombat = false;
  // Spawn a new enemy after a delay
  setTimeout(spawnEnemy, 3000);
}

// TODO: Handle this function better, need to find a more elegant solution as opposed to this global variable being passed around..
function updateEnemyName() {
  const respawnNameList = [
    "The womb pulsates...",
    "The womb quivers...",
    "The womb shudders...",
    "The womb convulses...",
    "The womb spasms violently...",
    "The womb ripples...",
    "The womb throbs...",
    "The womb contracts...",
    "The womb expands...",
    "The womb swells...",
  ];

  if (enemy && enemy.name !== undefined) {
    enemyName.textContent = enemy.name;
    enemyNamePopulated = false;
  }
  if (enemy === null && !enemyNamePopulated) {
    enemyName.textContent = respawnNameList[rngArrayLength(respawnNameList)];
    enemyNamePopulated = true;
  }
}

function updateEnemyHealth() {
  if (enemy && enemy.health !== undefined) {
    enemyHealth.textContent = enemy.health;
    if (enemy.health <= 0) {
      enemyHealth.textContent = 0;
    }
  }
  if (!enemy) {
    enemyHealth.textContent = 0;
  }
}

function updateEnemyCurrency() {
  if (enemy && enemy.currency !== undefined) {
    enemyCurrency.textContent = `Currency: ${enemy.currency}`;
  }
  if (!enemy) {
    enemyCurrency.textContent = `Currency: 0`;
  }
}

function updatePlayerCurrency() {
  playerCurrency.textContent = `Currency: ${player.currency}`;
}

function updatePlayerAttack() {
  playerAttackDamage.textContent = `Attack: ${player.attackDamage}`;
}

function updatePlayerAttackSpeed() {
  playerAttackSpeed.textContent = `Attack Speed: ${player.attackSpeed}`;
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
    attackSpeed: 0.1,
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
    attackSpeed: 0.5,
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

function rngArrayLength(array) {
  return Math.floor(Math.random() * array.length);
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
// TODO: Comment this or refactor it to be more readable.
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
    playerName.textContent = player.name;
    playerAttackSpeed.textContent = player.attackSpeed;
    playerAttackDamage.textContent = player.attackDamage;
    playerCurrency.textContent = player.currency;
    gameStarted = true;
    startGameLoop();
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
const playerAttackDamage = document.querySelector(".player-attack");
const playerAttackSpeed = document.querySelector(".player-attack-speed");
const playerCurrency = document.querySelector(".player-currency");

const enemyName = document.querySelector(".enemy-name");
const enemyHealth = document.querySelector(".enemy-health");
const enemyCurrency = document.querySelector(".enemy-currency");

// TODO: Add more game logic

function gameLoop() {
  if (player.attackDamage !== undefined && player.attackSpeed !== undefined) {
    if (enemy) {
      updatePlayerAttack();
      updatePlayerAttackSpeed();
      updateEnemyCurrency();
      updatePlayerCurrency();
      updateEnemyHealth();
      updateTimer();
      attackEnemy(player, enemy);
      checkEnemyHealth();
      console.log(player.timer);
    }
    if (enemy === null) {
      // TODO: Encapsulate all DOM functions of this into a function
      updatePlayerAttack(); // Update the player's attack damage. DOM
      updatePlayerAttackSpeed(); // Update the player's attack speed. DOM
      updateEnemyCurrency(); // Update the enemy's currency to 0. DOM
      updatePlayerCurrency(); // Update the player's currency. DOM
      resetPlayerTimer(); // Reset the player's timer to its maximum value
      updateEnemyHealth(); // Update the enemy's health 0. DOM
      updateEnemyName(); // Update the enemy's name from the respawnNameList. DOM
    }
  }
}

function startGameLoop() {
  if (gameStarted) {
    console.log("Starting game loop");
    spawnEnemy();
    gameLoopInterval = setInterval(gameLoop, 10);
  }
}
