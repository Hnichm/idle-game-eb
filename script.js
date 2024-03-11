let player = {
  name: "Player",
  damage: 2,
  attackDamage: 5,
  attackSpeed: 1,
  canAttack: true,
};

let enemy = {
  name: "Enemy",
  health: 40,
};

const gameStart = document.querySelector(".game-start");

const descendButton = document.querySelector(".descend-button");

const characterSelectContainer = document.querySelector(
  ".character-select-container"
);

const wombImage = document.querySelector(".character-select-womb");

const startGameButton = document.querySelector(".start-game-button");
let gameStarted = false;

const classSelect = document.querySelector(".class-select");

const classImagePaths = {
  warrior: "./assets/character-warrior.png",
  magician: "/assets/character-magician.png",
  rogue: "/assets/character-rogue.png",
  cleric: "/assets/character-cleric.png",
};

const description = document.querySelector(".class-description");

const classDescription = {
  warrior:
    "Each scar on his body maps a battle survived, a desperate gamble made in the face of overwhelming odds. His victories are forged not just from tactics learned, but from the ghosts of fallen allies whispering in his ear. He fights not out of hope, but a cold determination that there must always be one left standing to meet hell and fear.",
  magician:
    "His studies began with a noble goal - to understand the elements, bolstering the bastion's defenses with nature's might. But with each spell, each delve into forgotten lore, desperation bled into obsession.",
  rogue:
    "Found as a newborn cradled in his mother's corpse, a dark omen hanging over him, he learned to survive in the bastion's underbelly. He mastered not knightly combat, but the dirty tactics of ambush and assassination with his scavenged daggers. His strikes are honed from a life spent exploiting any weakness. Each battle is not for glory, but a brutal bid to ensure there's always one more survivor - himself",
  cleric:
    "The hymns that once sustained him now feel like a mockery. His prayers go unanswered as the bastion crumbles. Yet, with each horrific sight, each plea ignored by the heavens, his will hardens. He wields his faith not as a shield, but as a battered weapon. Perhaps the gods are gone, perhaps they turned their backs... but even if so, the darkness will find him unbroken.",
};

const characterSelectImage = document.querySelector(".character-select-image");

const mainGameContainer = document.querySelector(".main-game-container");

function hideElement(element) {
  element.style.display = "none";
}

function showElement(element) {
  element.removeAttribute("hidden");
}

const blurClasses = [
  "blurred-warrior",
  "blurred-cleric",
  "blurred-rogue",
  "blurred-magician",
];

function clearBlurClasses() {
  for (const blurClass of blurClasses) {
    wombImage.classList.remove(blurClass);
  }
}

startGameButton.addEventListener("click", () => {
  if (!gameStarted) {
    hideElement(characterSelectContainer);
    showElement(mainGameContainer);
    console.log("Game should start");
    gameStarted = true;
  } else {
    hideElement(characterSelectContainer);
    showElement(mainGameContainer);
  }
});

descendButton.addEventListener("mouseover", () => {
  descendButton.src = "/assets/descend-buttonR.png";
});

descendButton.addEventListener("mouseout", () => {
  descendButton.src = "/assets/descend-button.png";
  setTimeout(() => {});
});

descendButton.addEventListener("click", () => {
  descendButton.src = "/assets/descend-buttonR.png";
  setTimeout(() => {
    hideElement(gameStart);
    showElement(characterSelectContainer);
  }, 1000);
});

classSelect.addEventListener("change", () => {
  let selectedClass = classSelect.value;
  let previousClass;
  characterSelectImage.src = classImagePaths[selectedClass];
  description.textContent = classDescription[selectedClass];
  switch (selectedClass) {
    case "warrior":
      clearBlurClasses(); // Clear all blurs
      wombImage.classList.add(blurClasses[0]);
      previousClass = "warrior";
      break;
    case "cleric":
      clearBlurClasses();
      wombImage.classList.add(blurClasses[1]);
      previousClass = "cleric";
      break;
    case "rogue":
      clearBlurClasses();
      wombImage.classList.add(blurClasses[2]);
      previousClass = "lancer";
      break;
    case "magician":
      clearBlurClasses();
      wombImage.classList.add(blurClasses[3]);
      previousClass = "magician";
      break;
    case "":
      clearBlurClasses();
      break;
  }
});

// setInterval(function () {
//   enemyHealthDisplay.textContent = enemy.health;
// }, 100);
