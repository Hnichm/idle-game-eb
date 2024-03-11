// ! Delcaring player and enemy objects

let player = {
  name: "Player",
  attackDamage: undefined,
  attackSpeed: undefined,
  imagePath: "",
  canAttack: true,
};

let enemy = {
  name: "",
  health: undefined,
  imagePath: "",
};

const gameStart = document.querySelector(".game-start");

const descendButton = document.querySelector(".descend-button");

const characterSelectContainer = document.querySelector(
  ".character-select-container"
);

// ? Womb Image

const wombImage = document.querySelector(".character-select-womb");

// ? END Womb Image

// * Delve button
const startGameButton = document.querySelector(".start-game-button");
let gameStarted = false;
// * END Delve button

// ! Class select
const classSelect = document.querySelector(".class-select");

// ! END Class select

// !*! Class Properties
const classProperties = {
  warrior: {
    name: "Jehu",
    imagePath: "./assets/character-warrior.png",
    description: `Each scar on his body maps a battle survived, a desperate gamble made in the face of overwhelming odds. His victories are forged not just from tactics learned, but from the ghosts of fallen allies whispering in his ear. He fights not out of hope, but a cold determination that there must always be one left standing to meet hell and fear.`,
    attackDamage: 10,
    attackSpeed: 1.5,
  },
  magician: {
    name: "Balaam",
    imagePath: "./assets/character-magician.png",
    description: `His studies began with a noble goal - to understand the elements, bolstering the bastion's defenses with nature's might. But with each spell, each delve into forgotten lore, desperation bled into obsession.`,
    attackDamage: 15,
    attackSpeed: 1.0,
  },
  rogue: {
    name: "Doeg",
    imagePath: "./assets/character-rogue.png",
    description: `Found as a newborn cradled in his mother's corpse, a dark omen hanging over him, he learned to survive in the bastion's underbelly. He mastered not knightly combat, but the dirty tactics of ambush and assassination with his scavenged daggers. His strikes are honed from a life spent exploiting any weakness. Each battle is not for glory, but a brutal bid to ensure there's always one more survivor - himself`,
    attackDamage: 7,
    attackSpeed: 2.0,
  },
  cleric: {
    name: "Urijah",
    imagePath: "./assets/character-cleric.png",
    description: `The hymns that once sustained him now feel like a mockery. His prayers go unanswered as the bastion crumbles. Yet, with each horrific sight, each plea ignored by the heavens, his will hardens. He wields his faith not as a shield, but as a battered weapon. Perhaps the gods are gone, perhaps they turned their backs... but even if so, the darkness will find him unbroken.`,
    attackDamage: 8,
    attackSpeed: 1.0,
  },
};

// !*! END Class Properties

// *Description selector

const description = document.querySelector(".class-description");

// * END Description selector

// ? Character select image

const characterSelectImage = document.querySelector(".character-select-image");

// ? END Character select image

// ? Player and enemy images

const playerImage = document.querySelector(".player-image");

const enemyImage = document.querySelector(".enemy-image");

// ? END Player and enemy images

const mainGameContainer = document.querySelector(".main-game-container");

function hideElement(element) {
  element.style.display = "none";
}

function showElement(element) {
  element.removeAttribute("hidden");
}

// Blur womb image for character select

const blurClasses = [
  "blurred-warrior",
  "blurred-cleric",
  "blurred-rogue",
  "blurred-magician",
];

// *UI utility, clearing blur classes

function clearBlurClasses() {
  for (const blurClass of blurClasses) {
    wombImage.classList.remove(blurClass);
  }
}

// *UI utility, changing button image
descendButton.addEventListener("mouseover", () => {
  descendButton.src = "/assets/descend-buttonR.png";
});

// *UI utility, changing button image back to it's original state
descendButton.addEventListener("mouseout", () => {
  descendButton.src = "/assets/descend-button.png";
});

// *UI utility, checking for click on the button and hiding the game start screen
descendButton.addEventListener("click", () => {
  descendButton.src = "/assets/descend-buttonR.png";
  setTimeout(() => {
    hideElement(gameStart);
    showElement(characterSelectContainer);
  }, 1000);
});

// ! Start of character select

description.textContent = "Choose your fate...";
classSelect.value = "";
startGameButton.disabled = true;

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
    // Update the player image
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

startGameButton.addEventListener("click", () => {
  if (!gameStarted) {
    hideElement(characterSelectContainer);
    showElement(mainGameContainer);
    console.log("Game should start");
    console.log(player);
    gameStarted = true;
  } else {
    hideElement(characterSelectContainer);
    showElement(mainGameContainer);
  }
});

// ! END of character select

// ! GAME LOGIC

// ! LOGIC VARIABLES

// *Player ui elements
const playerName = document.querySelector(".player-name");
const playerClass = document.querySelector(".player-class");
const playerAttack = document.querySelector(".player-attack");
const playerCurrency = document.querySelector(".player-currency");

// *Enemy ui elements
const enemyName = document.querySelector(".enemy-name");
const enemyHealth = document.querySelector(".enemy-health");
const enemyCurrency = document.querySelector(".enemy-currency");
