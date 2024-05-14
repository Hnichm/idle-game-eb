// Player and Enemy Objects
// -------------------------
// The code defines two objects: `player` and `enemy`, which represent the player and enemy characters in the game.
// The `player` object has properties such as `name`, `attackDamage`, `attackSpeed`, `imagePath`, and `canAttack`, etc.
// The `enemy` object has properties like `name`, `health`, and `imagePath` as we use a timer for defeat.

let player = {
  name: "Player",
  attackDamage: undefined,
  attackSpeed: undefined,
  clickAttackDamage: undefined,
  clickAttackSpeed: undefined,
  class: undefined,
  currency: 0,
  floor: 0,
  imagePath: "",
  canAttack: true,
  canClickAttack: true,
  inCombat: false,
  timer: 30,
  maxTimer: 30,
  timerPaused: false,
  timerRemainingTime: 0,
  clickTimer: undefined,
  clickTimerMax: undefined,
  upgradeLevels: {
    clickDamage: 1,
    clickSpeed: 1,
    autoDamage: 1,
    autoSpeed: 1,
    timer: 1,
    timerReduction: 1,
    abilityOne: 1,
    abilityTwo: 1,
    abilityThree: 1,
  },
  upgradeCosts: {},
};

// Upgrade Functions for Player upgrades
// --------------------------------------

// Auto attack upgrades
// ---------------------
// Upgrade costs
function setPlayerAutoAttackUpgradeCosts() {
  let cost = 0;
  if (player.class === "Warrior") {
    cost = 12 * player.upgradeLevels.autoDamage;
  } else if (player.class === "Magician") {
    cost = 16 * player.upgradeLevels.autoDamage;
  } else if (player.class === "Rogue") {
    cost = 4 * player.upgradeLevels.autoDamage;
  } else if (player.class === "Cleric") {
    cost = 8 * player.upgradeLevels.autoDamage;
  }
  player.upgradeCosts.autoDamage = cost;
  return cost;
}

function setPlayerAutoAttackSpeedUpgradeCosts() {
  let cost = 0;
  if (player.class === "Warrior") {
    cost = 20 * player.upgradeLevels.autoSpeed;
  } else if (player.class === "Magician") {
    cost = 32 * player.upgradeLevels.autoSpeed;
  } else if (player.class === "Rogue") {
    cost = 8 * player.upgradeLevels.autoSpeed;
  } else if (player.class === "Cleric") {
    cost = 16 * player.upgradeLevels.autoSpeed;
  }

  return cost;
}

// Upgrade values
function setPlayerAutoAttackUpgradeValue() {
  if (player.class === "Warrior") {
    player.attackDamage += 3 * player.upgradeLevels.autoDamage;
  } else if (player.class === "Magician") {
    player.attackDamage += 2 * player.upgradeLevels.autoDamage;
  } else if (player.class === "Rogue") {
    player.attackDamage += 0.5 * player.upgradeLevels.autoDamage;
  } else if (player.class === "Cleric") {
    player.attackDamage += 1 * player.upgradeLevels.autoDamage;
  }
}

function setPlayerAutoAttackSpeedUpgradeValue() {
  if (player.class === "Warrior") {
    player.attackSpeed -= 0.005 * player.upgradeLevels.autoSpeed;
  } else if (player.class === "Magician") {
    player.attackSpeed -= 0.0035 * player.upgradeLevels.autoSpeed;
  } else if (player.class === "Rogue") {
    player.attackSpeed -= 0.0095 * player.upgradeLevels.autoSpeed;
  } else if (player.class === "Cleric") {
    player.attackSpeed -= 0.0055 * player.upgradeLevels.autoSpeed;
  }
}

// Click attack upgrades
// ----------------------
// Upgrade costs
function setPlayerAttackUpgradeCosts() {
  let cost = 0;
  if (player.class === "Warrior") {
    cost = 12 * player.upgradeLevels.clickDamage;
  } else if (player.class === "Magician") {
    cost = 16 * player.upgradeLevels.clickDamage;
  } else if (player.class === "Rogue") {
    cost = 4 * player.upgradeLevels.clickDamage;
  } else if (player.class === "Cleric") {
    cost = 8 * player.upgradeLevels.clickDamage;
  }
  player.upgradeCosts.clickDamage = cost;
  return cost;
}

function setPlayerAttackSpeedUpgradeCosts() {
  let cost = 0;
  if (player.class === "Warrior") {
    cost = 20 * player.upgradeLevels.clickSpeed;
  } else if (player.class === "Magician") {
    cost = 32 * player.upgradeLevels.clickSpeed;
  } else if (player.class === "Rogue") {
    cost = 8 * player.upgradeLevels.clickSpeed;
  } else if (player.class === "Cleric") {
    cost = 16 * player.upgradeLevels.clickSpeed;
  }
  player.upgradeCosts.clickSpeed = cost;
  return cost;
}

// Upgrade values
function setPlayerAttackUpgradeValue() {
  if (player.class === "Warrior") {
    player.clickAttackDamage += 5 * player.upgradeLevels.clickDamage;
  } else if (player.class === "Magician") {
    player.clickAttackDamage += 7 * player.upgradeLevels.clickDamage;
  } else if (player.class === "Rogue") {
    player.clickAttackDamage += 2 * player.upgradeLevels.clickDamage;
  } else if (player.class === "Cleric") {
    player.clickAttackDamage += 3 * player.upgradeLevels.clickDamage;
  }
}

function getPlayerAttackUpgradeValue(upgradeLevels) {
  let value = 0;
  if (player.class === "Warrior") {
    value = 5 * upgradeLevels;
  } else if (player.class === "Magician") {
    value = 7 * upgradeLevels;
  } else if (player.class === "Rogue") {
    value = 2 * upgradeLevels;
  } else if (player.class === "Cleric") {
    value = 3 * upgradeLevels;
  }
  return value;
}

function setPlayerAttackSpeedUpgradeValue() {
  let value = 0;
  if (player.class === "Warrior") {
    value = player.clickAttackSpeed -= 0.01 * player.upgradeLevels.clickSpeed;
  } else if (player.class === "Magician") {
    value = player.clickAttackSpeed -= 0.02 * player.upgradeLevels.clickSpeed;
  } else if (player.class === "Rogue") {
    value = player.clickAttackSpeed -= 0.025 * player.upgradeLevels.clickSpeed;
  } else if (player.class === "Cleric") {
    value = player.clickAttackSpeed -= 0.01 * player.upgradeLevels.clickSpeed;
  }
  return value;
}

function getPlayerAttackSpeedUpgradeValue(upgradeLevels) {
  let value = 0;
  if (player.class === "Warrior") {
    value = 0.01 * upgradeLevels;
  } else if (player.class === "Magician") {
    value = 0.02 * upgradeLevels;
  } else if (player.class === "Rogue") {
    value = 0.025 * upgradeLevels;
  } else if (player.class === "Cleric") {
    value = 0.01 * upgradeLevels;
  }
  return value;
}

// Defense (Timer) upgrades
// ------------------------
// Upgrade costs
function setPlayerDefenseUpgradeCosts() {
  let cost = 0;
  if (player.class === "Warrior") {
    cost = 20 * player.upgradeLevels.timer;
  } else if (player.class === "Magician") {
    cost = 30 * player.upgradeLevels.timer;
  } else if (player.class === "Rogue") {
    cost = 10 * player.upgradeLevels.timer;
  } else if (player.class === "Cleric") {
    cost = 15 * player.upgradeLevels.timer;
  }
  player.upgradeCosts.timer = cost;
  return cost;
}

function getPlayerDefenseUpgradeCosts(upgradeLevels) {
  let cost = 0;
  if (player.class === "Warrior") {
    cost = 20 * upgradeLevels;
  } else if (player.class === "Magician") {
    cost = 30 * upgradeLevels;
  } else if (player.class === "Rogue") {
    cost = 10 * upgradeLevels;
  } else if (player.class === "Cleric") {
    cost = 15 * upgradeLevels;
  }
  return cost;
}

// Upgrade values
function setPlayerDefenseUpgradeValue() {
  if (player.class === "Warrior") {
    player.maxTimer += 5 * player.upgradeLevels.timer;
  } else if (player.class === "Magician") {
    player.maxTimer += 7 * player.upgradeLevels.timer;
  } else if (player.class === "Rogue") {
    player.maxTimer += 2 * player.upgradeLevels.timer;
  } else if (player.class === "Cleric") {
    player.maxTimer += 3 * player.upgradeLevels.timer;
  }
}

function getPlayerDefenseUpgradeValue(upgradeLevels) {
  let value = 0;
  if (player.class === "Warrior") {
    value = 5 * upgradeLevels;
  } else if (player.class === "Magician") {
    value = 7 * upgradeLevels;
  } else if (player.class === "Rogue") {
    value = 2 * upgradeLevels;
  } else if (player.class === "Cleric") {
    value = 3 * upgradeLevels;
  }
  return value;
}

// DOM Elements for Player
// ------------------------
const playerName = document.querySelector(".player-name");
const playerClass = document.querySelector(".player-class");
const playerAttackDamage = document.querySelector(".player-attack");
const playerAttackReady = document.querySelector(".player-attack-ready");
const playerAttackSpeed = document.querySelector(".player-attack-speed");
const playerCurrency = document.querySelector(".player-currency");
const playerTimer = document.querySelector(".player-timer");
const playerUpgrades = document.querySelector(".player-upgrades");
const playerUpgradesToggle = document.querySelector(".player-upgrades-toggle");
const playerUpgradesContainer = document.querySelector(
  ".player-upgrades-container"
);
const upgradesCategoryButtons = document.querySelector(
  ".upgrade-category-buttons"
);
const upgradeOptionsContainer = document.querySelector(
  ".upgrade-options-container"
);
// DOM Elements for upgrades
// Upgrade currency display
const upgradeCurrencyDisplay = document.querySelectorAll(
  ".upgrade-player-currency"
);

function updatePlayerUpgradeCurrency() {
  upgradeCurrencyDisplay.forEach((element) => {
    element.textContent = `Currency: ${player.currency}`;
  });
}
// Attack upgrades button and container
const attackUpgradeButton = document.querySelector(".attack-upgrade-button");
const attackUpgradeContainer = document.querySelector(
  ".disabled-attack-upgrades"
);

// Attack upgrades
const attackUpgradeClickDamageButton = document.querySelector(
  ".upgrade-click-damage-button"
);
const attackUpgradeSpeedButton = document.querySelector(
  ".upgrade-click-speed-button"
);

// Attack upgrades back button
const attackUpgradeBackButton = document.querySelector(".attack-upgrade-back");

// Auto-attack upgrades button and container
const autoAttackUpgradeButton = document.querySelector(
  ".auto-attack-upgrade-button"
);
const autoAttackUpgradeContainer = document.querySelector(
  ".disabled-auto-attack-upgrades"
);

// Auto-attack upgrades
const autoAttackUpgradeDamageButton = document.querySelector(
  ".upgrade-auto-attack-damage-button"
);
const autoAttackUpgradeSpeedButton = document.querySelector(
  ".upgrade-auto-attack-speed-button"
);

// Auto-attack upgrades back button
const autoAttackUpgradeBackButton = document.querySelector(
  ".auto-attack-upgrade-back"
);

// Defense upgrades button and container
const defenseUpgradeButton = document.querySelector(".defense-upgrade-button");
const defenseUpgradeContainer = document.querySelector(
  ".disabled-defense-upgrades"
);

// Defense upgrades
const defenseUpgradeTimerButton = document.querySelector(
  ".upgrade-timer-button"
);
const defenseUpgradeTimerReductionButton = document.querySelector(
  ".upgrade-timer-reduction-button"
);

// Defense upgrades back button
const defenseUpgradeBackButton = document.querySelector(
  ".defense-upgrade-back"
);

// Abilities upgrades button and container

const abilitiesUpgradeButton = document.querySelector(
  ".abilities-upgrade-button"
);
const abilitiesUpgradeContainer = document.querySelector(
  ".disabled-abilities-upgrades"
);

// Abilities upgrades
const abilitiesUpgradeOneButton = document.querySelector(
  ".upgrade-ability-1-button"
);
const abilitiesUpgradeTwoButton = document.querySelector(
  ".upgrade-ability-2-button"
);
const abilitiesUpgradeThreeButton = document.querySelector(
  ".upgrade-ability-3-button"
);

// Abilities upgrades back button
const abilitiesUpgradeBackButton = document.querySelector(
  ".abilities-upgrade-back"
);

// Save game modal
// Used to display new game and load game buttons
const saveGameModal = document.querySelector(".save-game-modal");

// New game button
const newGameButton = document.querySelector(".new-game-button");

// Load game button
const loadGameButton = document.querySelector(".load-game-button");

const upgradesBackButton = document.querySelector(".upgrades-back-button");
const backButton = document.querySelector(".back-button");

const upgradesChildren = [
  upgradesCategoryButtons,
  upgradeOptionsContainer,
  backButton,
];

// Enemy object
let enemy = {
  name: "",
  health: undefined,
  imagePath: "",
  currency: 0,
};

// DOM Elements for Enemy
const enemyName = document.querySelector(".enemy-name");
const enemyHealth = document.querySelector(".enemy-health");
const enemyCurrency = document.querySelector(".enemy-currency");

// This is used for the updateEnemyName function later, this needs to be reworked eventually
let enemyNamePopulated = false;

const monsterNames = [
  "Abaddon",
  "Abimelech",
  "Achan",
  "Amalek",
  "Ananias",
  "Asmodeus",
  "Baal",
  "Beelzebub",
  "Belial",
  "Cain",
  "Dagon",
  "Goliath",
  "Herod",
  "Jezebel",
  "Judas",
  "Lucifer",
  "Mammon",
  "Moloch",
  "Nebuchadnezzar",
  "Nimrod",
  "Pharaoh",
  "Samael",
  "Solomon",
  "Zedekiah",
  "Abner",
  "Adonijah",
  "Amos",
  "Anak",
  "Apollyon",
  "Asher",
  "Azazel",
  "Balaam",
  "Barabbas",
  "Bartholomew",
  "Caleb",
  "Cephas",
  "Dathan",
  "Eliphaz",
  "Ephraim",
  "Esau",
  "Gideon",
  "Hiram",
  "Ishmael",
  "Japheth",
  "Jehu",
  "Joab",
  "Jonah",
  "Keturah",
  "Laban",
  "Lazarus",
  "Malachi",
  "Melchizedek",
  "Micah",
  "Nahum",
  "Nehemiah",
  "Obed",
  "Onan",
  "Phinehas",
  "Reuben",
  "Saul",
  "Seth",
  "Shadrach",
  "Tobias",
  "Uzziah",
  "Zebulun",
  "Zephaniah",
  "Zerubbabel",
  "Zimri",
  "Abijah",
  "Adriel",
  "Amaziah",
  "Antipas",
  "Azariah",
  "Barnabas",
  "Boaz",
  "Cornelius",
  "Cyrus",
  "Delilah",
  "Eleazar",
  "Eliab",
  "Elihu",
  "Elisha",
  "Emmanuel",
  "Ephraim",
  "Ethan",
  "Ezekiel",
  "Habakkuk",
  "Haggai",
  "Hezekiah",
  "Hosea",
  "Ithamar",
  "Jairus",
  "Jeroboam",
  "Job",
  "Josiah",
  "Malchus",
  "Mordecai",
  "Nahor",
  "Nathan",
  "Obadiah",
  "Omri",
  "Phinehas",
  "Silas",
  "Simon",
  "Tamar",
  "Terah",
  "Thaddeus",
  "Uriah",
  "Zadok",
  "Zebulun",
  "Zedekiah",
  "Zephaniah",
  "Zerah",
  "Zerubbabel",
  "Zechariah",
  "Zohar",
  "Zuar",
  "Zur",
  "Zuriel",
  "Abihu",
  "Azariah",
  "Beriah",
  "Eleazar",
  "Elihu",
  "Gideon",
  "Jabez",
  "Japheth",
  "Josiah",
  "Levi",
  "Merari",
  "Moses",
  "Nahshon",
  "Nahum",
  "Nehemiah",
  "Reuben",
  "Simeon",
  "Talmai",
  "Tubal-Cain",
  "Uri",
  "Uzziel",
  "Zebadiah",
  "Zebul",
  "Zelophehad",
  "Zephon",
  "Zerahiah",
  "Zeresh",
  "Zichri",
  "Zimri",
  "Zoheth",
  "Abijam",
  "Adoniram",
  "Amnon",
  "Ananiah",
  "Aner",
  "Azaziah",
  "Barnabas",
  "Benaiah",
  "Bezalel",
  "Caiaphas",
  "Darius",
  "Elah",
  "Eliakim",
  "Eliashib",
  "Elishama",
  "Enosh",
  "Ezra",
  "Gedaliah",
  "Heman",
  "Hilkiah",
  "Iddo",
  "Ira",
  "Isaiah",
  "Jared",
  "Jehoiachin",
  "Jehoiada",
  "Jethro",
  "Joash",
  "Jotham",
  "Lemuel",
  "Mephibosheth",
  "Meshach",
  "Nahum",
  "Obadiah",
  "Othniel",
  "Pashhur",
  "Pharez",
  "Phinehas",
  "Raamah",
  "Ram",
  "Reuel",
  "Shealtiel",
  "Shelah",
  "Shem",
  "Shemuel",
  "Shiloh",
  "Silas",
  "Tobiah",
  "Uz",
  "Zacchaeus",
  "Abednego",
  "Adonai",
  "Ahaz",
  "Ahijah",
  "Amasa",
  "Asa",
  "Asher",
  "Azor",
  "Barak",
  "Ben-hadad",
  "Caleb",
  "Dan",
  "Ebenezer",
  "Elkanah",
  "Enos",
  "Ephron",
  "Eran",
  "Ethan",
  "Gideon",
  "Hananiah",
  "Hazael",
  "Heber",
  "Ichabod",
  "Ithiel",
  "Jair",
  "Japheth",
  "Jehoram",
  "Jerah",
  "Joab",
  "Jonathan",
  "Kenan",
  "Kohath",
  "Lemuel",
  "Manasseh",
  "Matthan",
  "Micah",
  "Nathan",
  "Obed",
  "Omri",
  "Peleg",
  "Pharez",
  "Phinehas",
  "Raguel",
  "Samson",
  "Shimon",
  "Tahpenes",
  "Thummim",
  "Tirzah",
  "Uzzah",
  "Zebulon",
  "Abijah",
  "Adoniram",
  "Amaziah",
  "Baruch",
  "Benaiah",
  "Berechiah",
  "Boaz",
  "Chilion",
  "Eliam",
  "Elimelech",
  "Elkanah",
  "Elnathan",
  "Ephah",
  "Etham",
  "Ezer",
  "Gedaliah",
  "Gershom",
  "Haggai",
  "Haman",
  "Hezekiah",
  "Hiram",
  "Hodaviah",
  "Ithiel",
  "Japhia",
  "Jotham",
  "Kemuel",
  "Kish",
  "Korah",
  "Lamech",
  "Mahalalel",
  "Melchior",
  "Micaiah",
  "Nahum",
  "Nehemiah",
  "Nethanel",
  "Obadiah",
  "Onan",
  "Phinehas",
  "Rahab",
  "Reuel",
  "Salathiel",
  "Seba",
  "Shecaniah",
  "Shemuel",
  "Silvanus",
  "Tola",
  "Urijah",
  "Uzziel",
  "Zebadiah",
  "Zephaniah",
];

function getMonsterName(names) {
  return names[Math.floor(Math.random() * names.length)];
}

function Monster(name, health, imagePath, currency, isBoss) {
  this.name = name; // Initialize with the provided name
  this.health = health;
  this.imagePath = imagePath;
  this.currency = currency;
  this.isBoss = isBoss;
}

// Floor monsters
// Array containing monsters for each floor
// Leave name empty for random name generation

const floorMonsters = [
  [
    new Monster(``, 50, "./assets/undead-warrior (1).png", 5),
    new Monster(``, 75, "./assets/undead-warrior (2).png", 10),
    new Monster(``, 100, "./assets/undead-warrior (3).png", 15),
  ],
  [
    new Monster("", 150, "./assets/undead-warrior (4).png", 20),
    new Monster("", 300, "./assets/undead-warrior (5).png", 30),
    new Monster("", 450, "./assets/undead-warrior (6).png", 40),
  ],
  [
    new Monster("", 750, "./assets/undead-warrior (7).png", 65),
    new Monster("", 1000, "./assets/undead-warrior (8).png", 80),
    new Monster("", 1500, "./assets/undead-warrior (9).png", 100),
  ],
  [
    new Monster("", 2000, "./assets/undead-warrior (10).png", 150),
    new Monster("", 3000, "./assets/undead-warrior (11).png", 200),
    new Monster("", 4000, "./assets/undead-warrior (12).png", 250),
  ],
  [
    new Monster("", 5000, "./assets/undead-warrior (13).png", 300),
    new Monster("", 6000, "./assets/undead-warrior (14).png", 350),
    new Monster("", 7000, "./assets/undead-warrior (15).png", 400),
  ],
  // double health of monters
  [
    new Monster("", 10000, "./assets/undead-warrior (16).png", 500),
    new Monster("", 12000, "./assets/undead-warrior (17).png", 600),
    new Monster("", 14000, "./assets/undead-warrior (18).png", 700),
  ],
  // 4x health of monsters
  [
    new Monster("", 20000, "./assets/undead-warrior (19).png", 1000),
    new Monster("", 24000, "./assets/undead-warrior (20).png", 1200),
    new Monster("", 28000, "./assets/undead-warrior (21).png", 1400),
  ],
  // 8x health of monsters
  [
    new Monster("", 40000, "./assets/undead-warrior (22).png", 2000),
    new Monster("", 48000, "./assets/undead-warrior (23).png", 2400),
    new Monster("", 56000, "./assets/undead-warrior (24).png", 2800),
  ],

  // 32x health of monsters
  [
    new Monster("", 80000, "./assets/undead-warrior (25).png", 4000),
    new Monster("", 96000, "./assets/undead-warrior (26).png", 4800),
    new Monster("", 112000, "./assets/undead-warrior (27).png", 5600),
  ],

  // 128x health of monsters
  [
    new Monster("", 160000, "./assets/undead-warrior (28).png", 8000),
    new Monster("", 192000, "./assets/undead-warrior (29).png", 9600),
    new Monster("", 224000, "./assets/undead-warrior (30).png", 11200),
  ],

  // 512x health of monsters
  [
    new Monster("", 320000, "./assets/undead-warrior (31).png", 16000),
    new Monster("", 384000, "./assets/undead-warrior (32).png", 19200),
    new Monster("", 448000, "./assets/undead-warrior (33).png", 22400),
  ],
];

// Generate a new monster for the current floor to pass to the spawnEnemy function
function getRandomMonster(floor) {
  if (!player.inCombat) {
    const monsters = floorMonsters[floor];
    if (monsters) {
      const randomIndex = Math.floor(Math.random() * monsters.length);
      console.log(`Random index: ${randomIndex}`);
      const selectedMonster = monsters[randomIndex]; // Select a random monster from the array
      return new Monster(
        selectedMonster.isBoss // Use the provided name if it's a boss
          ? selectedMonster.name // Provided name
          : getMonsterName(monsterNames), // Generate a new name if not a boss
        selectedMonster.health, // Use the provided health
        selectedMonster.imagePath, // Use the provided image path
        selectedMonster.currency, // Use the provided currency
        selectedMonster.isBoss // Use the provided boss status
      );
    } else {
      console.error(`No monsters defined for floor ${floor}`);
      return null;
    }
  }
  return null;
}

// Receives the value from getRandomMonster and assigns it to the enemy object
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

// TODO: Complete function
// This function checks if the player is in combat and if the enemy is not null, if so, they may ascend or descend
function changeFloor(direction) {
  if (player.inCombat) {
    return;
  }

  if (direction === "ascend" && !player.inCombat) {
    player.floor++;
  } else if (direction === "descend" && player.floor > 0 && !player.inCombat) {
    player.floor--;
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
    // Add css class to player image to display auto attack
    playerAutoAttackDash();
    // Add css class to enemy image to display auto attack hit
    enemyAutoAttacked();
    // Show the damage on the target's image
    showFloatingDamageNumber(attacker.attackDamage, enemyImageContainer);
    // Log the target's remaining health
    console.log(`${target.name} health: ${target.health}`);
    // Set the attacker's ability to attack to false
    attacker.canAttack = false;
    // After a delay based on the attacker's attack speed, allow the attacker to attack again
    setTimeout(() => {
      // Set the attacker's ability to attack to true
      attacker.canAttack = true;
    }, attacker.attackSpeed * 1000);
  }
}

// Used to check enemy health and calls enemyDeath function if health is 0 or less
function checkEnemyHealth() {
  if (enemy.health) {
    if (enemy.health <= 0) {
      addCurrency();
      enemyDeath();
      // TODO: Interlinked with updateEnemyName, need to find a better solution
      enemyNamePopulated = false; // Reset enemyNamePopulated when the enemy is defeated
      setTimeout(spawnEnemy, 3000);
    }
  }
}

// Function to handle enemy death
function enemyDeath() {
  if (enemy.health <= 0) {
    enemyImage.setAttribute("hidden", true);
    enemy = null;
    player.inCombat = false;
  }
}

// Function to handle player currency
function addCurrency() {
  player.currency += enemy.currency;
}

function addTotalCurrency() {}

function updateTimer() {
  if (!player.timerPaused && player.inCombat && enemy) {
    player.timer -= 0.01;
  }
  if (player.timer <= 0) {
    //Player has run out of time
    playerDeath();
  }
}

function pauseTimer() {
  player.timerPaused = true;
  player.timerRemainingTime = player.timer;
}

function resumeTimer() {
  player.timerPaused = false;
  player.timer = player.timerRemainingTime;
}

function updatePlayerStats() {
  playerName.textContent = player.name;
  playerAttackSpeed.textContent = player.attackSpeed;
  playerAttackDamage.textContent = player.attackDamage;
  playerCurrency.textContent = player.currency;
}

function resetPlayerTimer() {
  player.timer = player.maxTimer;
}

// ! Future upgrade?
function extendPlayerTimer(seconds) {
  player.maxTimer += seconds;
  player.timer += seconds;
}

// ! SAVE TESTING
function hasSavedGame() {
  return localStorage.getItem("playerData") !== null;
}

function savePlayerData() {
  const playerData = JSON.stringify(player);
  localStorage.setItem("playerData", playerData);
}

function loadPlayerData() {
  const playerData = localStorage.getItem("playerData");
  if (playerData) {
    const parsedPlayerData = JSON.parse(playerData);
    Object.assign(player, parsedPlayerData);
    playerImage.src = player.imagePath;
    console.log("Loaded player image path:", player.imagePath);
  }
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

// DOM functions (?)
// -----------------
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
    enemyHealth.textContent = `Health: ${enemy.health}`;
    if (enemy.health <= 0) {
      enemyHealth.textContent = `Health: 0`;
    }
  }
  if (!enemy) {
    enemyHealth.textContent = `Health: 0`;
  }
}

function showFloatingDamageNumber(damage, container, isClickAttack = false) {
  const floatingDamageNumber = document.createElement("span");
  floatingDamageNumber.textContent = damage;
  floatingDamageNumber.classList.add(
    isClickAttack ? "floating-click-damage-number" : "floating-damage-number"
  );

  const randomX = (Math.random() - 0.5) * 50;
  const randomY = Math.random() * -100 - 50;

  floatingDamageNumber.style.setProperty("--float-x", `${randomX}px`);
  floatingDamageNumber.style.setProperty("--float-y", `${randomY}px`);

  container.appendChild(floatingDamageNumber);
  setTimeout(() => {
    floatingDamageNumber.remove();
  }, 1000);
}

function showPlayerAttackReady() {
  let playerClickAttackSpeed = player.clickAttackSpeed;
  let currentClickAttackSpeed = playerClickAttackSpeed.toFixed(2);
  if (player.canClickAttack) {
    playerAttackReady.textContent = "Click Attack Ready!";
  } else {
    setTimeout(() => {
      playerAttackReady.textContent = `Attack in: ${
        player.clickAttackSpeed.toFixed(2) - 0.1
      }`;
    }, 10);
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

function updatePlayerTimer() {
  playerTimer.textContent = `Death: ${player.timer.toFixed(2)}`;
}

function updatePlayerCurrency() {
  playerCurrency.textContent = `Currency: ${player.currency}`;
}

function updatePlayerAttack() {
  playerAttackDamage.textContent = `Attack: ${player.attackDamage}`;
}

function updatePlayerAttackSpeed() {
  playerAttackSpeed.textContent = `Attack Speed: ${parseFloat(
    player.attackSpeed,
    10
  ).toFixed(2)}`;
}

function updateEnemyContainer() {
  if (player.canClickAttack) {
    enemyImageContainer.style.cursor = "pointer";
    enemyImageContainer.classList.add("click-attack-ready");
  }
  if (!player.canClickAttack) {
    enemyImageContainer.style.cursor = "not-allowed";
    enemyImageContainer.classList.remove("click-attack-ready");
  }
}

function hideUpgradesChildren() {
  upgradesChildren.forEach((child) => {
    child.setAttribute("hidden", true);
  });
}

function hideUpgradeSubCategories() {
  hideElement(attackUpgradeButton);
  hideElement(autoAttackUpgradeButton);
  hideElement(defenseUpgradeButton);
  hideElement(abilitiesUpgradeButton);
  hideElement(playerUpgradesContainer);
}

function showUpgradeSubCategories() {
  showElement(attackUpgradeButton);
  showElement(autoAttackUpgradeButton);
  showElement(defenseUpgradeButton);
  showElement(abilitiesUpgradeButton);
  showElement(playerUpgradesContainer);
}

function showUpgradesChildren() {
  upgradesChildren.forEach((child) => {
    child.removeAttribute("hidden");
  });
}

//TODO : DRY these functions up
function updateAttackUpgradeInformation() {
  const currentCost = setPlayerAttackUpgradeCosts();
  const currentUpgradeValue = getPlayerAttackUpgradeValue(
    player.upgradeLevels.clickDamage
  );
  domUpgradeCosts[0].textContent = `Cost: ${currentCost}`;
  domUpgradeValues[0].textContent = `Attack Increase: ${currentUpgradeValue}`;
}

function updateAttackSpeedUpgradeInformation() {
  const currentCost = setPlayerAttackSpeedUpgradeCosts();
  const currentUpgradeValue = getPlayerAttackSpeedUpgradeValue(
    player.upgradeLevels.clickSpeed
  );
  domUpgradeCosts[0].textContent = `Cost: ${currentCost}`;
  domUpgradeValues[0].textContent = `Attack Speed Increase: ${currentUpgradeValue}`;
}

function updateAutoAttackUpgradeInformation() {
  const currentCost = setPlayerAutoAttackUpgradeCosts();
  const currentUpgradeValue = getPlayerAttackUpgradeValue(
    player.upgradeLevels.autoDamage
  );
  domUpgradeCosts[1].textContent = `Cost: ${currentCost}`;
  domUpgradeValues[1].textContent = `Auto Attack Increase: ${currentUpgradeValue}`;
}

function updateAutoAttackSpeedUpgradeInformation() {
  const currentCost = setPlayerAutoAttackSpeedUpgradeCosts();
  const currentUpgradeValue = getPlayerAttackSpeedUpgradeValue(
    player.upgradeLevels.autoSpeed
  );
  domUpgradeCosts[1].textContent = `Cost: ${currentCost}`;
  domUpgradeValues[1].textContent = `Auto Attack Speed Increase: ${currentUpgradeValue}`;
}

function updateDefenseUpgradeInformation() {
  const currentCost = setPlayerDefenseUpgradeCosts();
  const currentUpgradeValue = getPlayerDefenseUpgradeValue(
    player.upgradeLevels.timer
  );
  domUpgradeCosts[2].textContent = `Cost: ${currentCost}`;
  domUpgradeValues[2].textContent = `Timer Increase: ${currentUpgradeValue}`;
}

function updateAbilityUpgradeInformation() {
  domUpgradeCosts[3].textContent = `Cost: ${currentCost}`;
}

// TODO: Add hideSelectedUpgrade function

// TODO: Populate this function with all the DOM updates and call in game loop, for later.
function updateDOM() {
  updateEnemyName();
  updateEnemyHealth();
  updateEnemyCurrency();
  updatePlayerCurrency();
  updatePlayerAttack();
  updatePlayerAttackSpeed();
  updateEnemyContainer();
  updatePlayerTimer();
  updatePlayerUpgradeCurrency();
  showPlayerAttackReady();
}
// DOM animation functions (?)
function playerAutoAttackDash() {
  playerImage.classList.add("auto-attack-dash");
  setTimeout(() => {
    playerImage.classList.remove("auto-attack-dash");
  }, 210);
}

function enemyAutoAttacked() {
  enemyImageContainer.classList.add("auto-attack-hit");
  setTimeout(() => {
    enemyImageContainer.classList.remove("auto-attack-hit");
  }, 210);
  enemyImage.classList.add("enemy-image-take-damage");
  setTimeout(() => {
    enemyImage.classList.remove("enemy-image-take-damage");
  }, 210);
}

// Used for after the opening cinematic, draws transparent div over the womb image for player to truly begin their delve
// TODO: Add an event listener to this function to begin the game loop
const wombIntroTimer = 1000;
function enterWombElement() {
  openingCinematicBackground.classList.add("fade-in");
  // Show the enter womb button after 5 seconds
  setTimeout(function () {
    enterWomb.removeAttribute("hidden");
    enterWomb.classList.add("enter-womb:hover");
  }, wombIntroTimer);
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
const openingCinematicContainer = document.querySelector(
  ".opening-cinematic-container"
);
const openingCinematicContainerDark = document.querySelector(
  ".opening-cinematic-container-dark"
);
const openingCinematicBackground = document.querySelector(
  ".opening-cinematic-background"
);
const enemyImageContainer = document.querySelector(".enemy-image-container");
const playerImageContainer = document.querySelector(".player-image-container");

// - `wombImage`: the character select womb image element
const wombImage = document.querySelector(".character-select-womb");

// - `startGameButton`: the "start game" button element
const startGameButton = document.querySelector(".start-game-button");
// ! Important variable for game loop
let gameStarted = false;

// - `classSelect`: the class select dropdown element
const classSelect = document.querySelector(".class-select");

// `enterWomb`: the enter womb button element
const enterWomb = document.querySelector(".enter-womb");

// `ascendFloorButton`: the "ascend floor" button element
// `descendFloorButton`: the "descend floor" button element
const ascendFloorButton = document.querySelector(".ascend-floor-button");
const descendFloorButton = document.querySelector(".descend-floor-button");
// `playerUpgradeButton`: the player upgrades toggle button element
const playerUpgradeButton = document.querySelector(".player-upgrades-toggle");

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
    clickAttackDamage: 20,
    clickAttackSpeed: 4,
  },
  Magician: {
    name: "Balaam",
    imagePath: "./assets/character-magician.png",
    description: `His studies began with a noble goal - to understand the elements, bolstering the bastion's defenses with nature's might. But with each spell, each delve into forgotten lore, desperation bled into obsession.`,
    attackDamage: 15,
    attackSpeed: 1.0,
    clickAttackDamage: 20,
    clickAttackSpeed: 4,
  },
  Rogue: {
    name: "Doeg",
    imagePath: "./assets/character-rogue.png",
    description: `Found as a newborn cradled in his mother's corpse, a dark omen hanging over him, he learned to survive in the bastion's underbelly. He mastered not knightly combat, but the dirty tactics of ambush and assassination with his scavenged daggers. His strikes are honed from a life spent exploiting any weakness. Each battle is not for glory, but a brutal bid to ensure there's always one more survivor - himself`,
    attackDamage: 7,
    attackSpeed: 0.5,
    clickAttackDamage: 14,
    clickAttackSpeed: 2,
  },
  Cleric: {
    name: "Urijah",
    imagePath: "./assets/character-cleric.png",
    description: `The hymns that once sustained him now feel like a mockery. His prayers go unanswered as the bastion crumbles. Yet, with each horrific sight, each plea ignored by the heavens, his will hardens. He wields his faith not as a shield, but as a battered weapon. Perhaps the gods are gone, perhaps they turned their backs... but even if so, the darkness will find him unbroken.`,
    attackDamage: 8,
    attackSpeed: 1.0,
    clickAttackDamage: 4,
    clickAttackSpeed: 2,
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

// - `hideElement(element)`: Hides the specified element by setting its `hidden` attribute to true.
function hideElement(element) {
  element.setAttribute("hidden", "");
}

// - `hideDisplay(element)`: Hides the specified element by setting its `display` style to "none".
function hideDisplay(element) {
  element.style.display = "none";
}

// - `showElement(element)`: Shows the specified element by removing the `hidden` attribute.
function showElement(element) {
  element.removeAttribute("hidden");
}

// Show any other elements that should be visible when starting the game
function showGameElements() {
  showElement(mainGameContainer);
  showElement(playerImageContainer);
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
  descendButton.src =
    "https://raw.githubusercontent.com/Hnichm/idle-game-eb/main/assets/descend-buttonR.png";
});

// - `descendButton` mouseout event: Changes the image source of the "descend" button back to its original state on mouseout.
descendButton.addEventListener("mouseout", () => {
  descendButton.src =
    "https://raw.githubusercontent.com/Hnichm/idle-game-eb/main/assets/descend-button.png";
});

// - `descendButton` click event: Hides the game start screen and shows the character select container after a delay of 1 second.
descendButton.addEventListener("click", () => {
  descendButton.src =
    "https://raw.githubusercontent.com/Hnichm/idle-game-eb/main/assets/descend-buttonR.png";

  if (hasSavedGame()) {
    // Show a prompt asking the user if they want to start a new game or continue
    showElement(saveGameModal);

    newGameButton.addEventListener("click", function () {
      // User chose to start a new game
      localStorage.removeItem("playerData"); // Remove the saved game data
      setTimeout(() => {
        hideDisplay(gameStart);
        showElement(characterSelectContainer);
      }, 1000);
    });

    loadGameButton.addEventListener("click", function () {
      loadPlayerData();
      hideDisplay(saveGameModal);
      hideDisplay(gameStart);
      hideDisplay(characterSelectContainer);
      hideDisplay(openingCinematicContainer);
      gameStarted = true;
      showGameElements(); // Show the necessary elements
      setTimeout(startGameLoop, 100); // Start the game loop after a short delay
    });
  } else {
    // No saved game exists, start a new game
    setTimeout(() => {
      hideDisplay(gameStart);
      showElement(characterSelectContainer);
    }, 1000);
  }
});

// - `ascendFloorButton` click event: Calls the changeFloor function with "ascend" direction
ascendFloorButton.addEventListener("click", () => {
  changeFloor("ascend");
  spawnEnemy();
});

// - `descendFloorButton` click event: Calls the changeFloor function with "descend" direction
descendFloorButton.addEventListener("click", () => {
  changeFloor("descend");
  spawnEnemy();
});

let remainingTime = 0;
let attackTimerInterval;

function updateAttackTimer() {
  remainingTime -= 0.01;

  if (remainingTime <= 0) {
    playerAttackReady.textContent = "Click Attack Ready!";
    clearInterval(attackTimerInterval);
  } else {
    playerAttackReady.textContent = `Attack in: ${remainingTime.toFixed(2)}`;
  }
}

function startAttackTimer() {
  clearInterval(attackTimerInterval); // Clear any existing interval
  remainingTime = player.clickAttackSpeed; // Reset the remaining time to the player's click attack speed
  attackTimerInterval = setInterval(updateAttackTimer, 10); // Call updateAttackTimer every 10ms
}

function clickAttackEnemy(attacker, target) {
  // Check if the attacker has defined click attack damage and if a click attack is currently allowed
  if (attacker.clickAttackDamage !== undefined && attacker.canClickAttack) {
    // Reduce the target's health by the attacker's click attack damage
    target.health -= attacker.clickAttackDamage;
    // Add css class to player image to display click attack
    showFloatingDamageNumber(
      attacker.clickAttackDamage,
      enemyImageContainer,
      true
    );
    // Show the damage on the target's image
    console.log(
      `Player click attack: ${attacker.clickAttackDamage} for ${player.clickAttackDamage} damage.`
    );
    // Log the target's remaining health
    console.log(`${target.name} health: ${target.health}`);
    // Disable click attacks
    attacker.canClickAttack = false;
    updateEnemyContainer();

    const attackBar = document.querySelector(".player-attack-bar");
    const attackButton = document.querySelector(".player-attack-button");

    if (attackBar && attackButton) {
      attackBar.style.width = "0";
      attackBar.style.display = "block";
      attackButton.setAttribute("hidden", true);

      // Start filling the attack bar immediately after the click attack
      updateAttackBar();
    }

    startAttackTimer();

    setTimeout(() => {
      attacker.canClickAttack = true;
      updateEnemyContainer();
    }, attacker.clickAttackSpeed * 1000);
  }
}

function showPlayerAttackReady() {
  if (player.canClickAttack) {
    playerAttackReady.textContent = "Click Attack Ready!";
  } else {
    playerAttackReady.textContent = `Attack in: ${remainingTime.toFixed(2)}`;
  }
}

function showPlayerAttackReady() {
  if (player.canClickAttack) {
    playerAttackReady.textContent = "Click Attack Ready!";
  } else {
    playerAttackReady.textContent = `Attack in: ${remainingTime.toFixed(2)}`;
  }
}

// Event listener for the enemy image click event (player click attack)
enemyImage.addEventListener("click", () => {
  console.log("Enemy image clicked");
  if (player.canClickAttack) {
    console.log("Player can click attack");
    clickAttackEnemy(player, enemy);
  } else {
    console.log("Player cannot click attack");
  }
});

// Event listener for the player upgrade button click event
playerUpgradeButton.addEventListener("click", () => {
  // Hide player name, attack damage, attack speed, and currency elements
  hideElement(playerName);
  hideElement(playerAttackDamage);
  hideElement(playerAttackSpeed);
  hideElement(playerAttackReady);
  hideElement(playerCurrency);
  hideElement(playerUpgradeButton);
  hideElement(playerUpgrades);

  // Remove the "hidden" attribute from the player upgrades container
  playerUpgradesContainer.removeAttribute("hidden");

  // Show the upgrades children elements
  showUpgradesChildren();
});

// Event listener for upgrade sub options

function hideUpgradeSubCategory(container) {
  switch (container.getAttribute("data-category")) {
    case "attack":
      if (container.classList.contains("disabled-attack-upgrades")) {
        container.classList.remove("disabled-attack-upgrades");
        container.classList.add("attack-upgrades");
      }
      [...container.children].forEach((child) => {
        child.removeAttribute("hidden");
      });
      break;
    case "autoAttack":
      if (container.classList.contains("disabled-auto-attack-upgrades")) {
        container.classList.remove("disabled-auto-attack-upgrades");
        container.classList.add("auto-attack-upgrades");
      }
      [...container.children].forEach((child) => {
        child.removeAttribute("hidden");
      });
      break;
    case "defense":
      if (container.classList.contains("disabled-defense-upgrades")) {
        container.classList.remove("disabled-defense-upgrades");
        container.classList.add("defense-upgrades");
      }
      [...container.children].forEach((child) => {
        child.removeAttribute("hidden");
      });
      break;
    case "abilities":
      if (container.classList.contains("disabled-abilities-upgrades")) {
        container.classList.remove("disabled-abilities-upgrades");
        container.classList.add("abilities-upgrades");
      }
      [...container.children].forEach((child) => {
        child.removeAttribute("hidden");
      });
      break;
    default:
      break;
  }
}

// Upgrade sub options

// Click attack upgrades sub options button

const domUpgradeCosts = [...document.querySelectorAll(".upgrade-cost")];

const domUpgradeValues = [...document.querySelectorAll(".upgrade-value")];

attackUpgradeButton.addEventListener("click", () => {
  upgradesCategoryButtons.style.display = "none";
  hideUpgradeSubCategories();
  hideUpgradeSubCategory(attackUpgradeContainer);
});

attackUpgradeClickDamageButton.addEventListener("click", () => {
  let currentCost = setPlayerAttackUpgradeCosts();
  if (player.currency >= currentCost) {
    player.currency -= currentCost;
    setPlayerAttackUpgradeValue();
    player.upgradeLevels.clickDamage++;
    updatePlayerUpgradeCurrency();
    updateAttackUpgradeInformation();
  }
});

// Hover event for click damage upgrade button, updates cost information
attackUpgradeClickDamageButton.addEventListener("mouseover", () => {
  updateAttackUpgradeInformation();
});

// Mouseout event for click damage upgrade button, removes cost information
attackUpgradeClickDamageButton.addEventListener("mouseout", () => {
  domUpgradeCosts[0].textContent = "";
  domUpgradeValues[0].textContent = "";
});

attackUpgradeSpeedButton.addEventListener("click", () => {
  let currentCost = setPlayerAttackSpeedUpgradeCosts();
  if (player.currency >= currentCost) {
    player.currency -= currentCost;
    setPlayerAttackSpeedUpgradeValue();
    player.upgradeLevels.clickSpeed++;
    updatePlayerUpgradeCurrency();
    updatePlayerAttackSpeed();
    updateAttackSpeedUpgradeInformation();
  }
});

// Hover event for click speed upgrade button, updates cost information
attackUpgradeSpeedButton.addEventListener("mouseover", () => {
  updateAttackSpeedUpgradeInformation();
});

// Mouseout event for click speed upgrade button, removes cost information
attackUpgradeSpeedButton.addEventListener("mouseout", () => {
  domUpgradeCosts[0].textContent = "";
  domUpgradeValues[0].textContent = "";
});

// Auto Attack upgrades sub options button
autoAttackUpgradeButton.addEventListener("click", () => {
  upgradesCategoryButtons.style.display = "none";
  hideUpgradeSubCategories();
  hideUpgradeSubCategory(autoAttackUpgradeContainer);
});

// Auto attack upgrade buttons
autoAttackUpgradeDamageButton.addEventListener("click", () => {
  let currentCost = setPlayerAutoAttackUpgradeCosts();
  if (player.currency >= currentCost) {
    player.currency -= currentCost;
    setPlayerAutoAttackUpgradeValue();
    player.upgradeLevels.autoDamage++;
    updatePlayerUpgradeCurrency();
    updatePlayerAttack();
    updateAutoAttackUpgradeInformation();
  }
});

// Hover event for auto attack damage upgrade button, updates cost information
autoAttackUpgradeDamageButton.addEventListener("mouseover", () => {
  updateAutoAttackUpgradeInformation();
});

// Mouseout event for auto attack damage upgrade button, removes cost information
autoAttackUpgradeDamageButton.addEventListener("mouseout", () => {
  domUpgradeCosts[1].textContent = "";
  domUpgradeValues[1].textContent = "";
});

autoAttackUpgradeSpeedButton.addEventListener("click", () => {
  let currentCost = setPlayerAutoAttackSpeedUpgradeCosts();
  console.log(`Current cost: ${currentCost}`);
  console.log("Event should trigger");
  if (player.currency >= currentCost) {
    player.currency -= currentCost;
    setPlayerAutoAttackSpeedUpgradeValue();
    player.upgradeLevels.autoSpeed++;
    updatePlayerUpgradeCurrency();
    updatePlayerAttackSpeed();
    updateAutoAttackSpeedUpgradeInformation();
  }
});

// Hover event for auto attack speed upgrade button, updates cost information
autoAttackUpgradeSpeedButton.addEventListener("mouseover", () => {
  updateAutoAttackSpeedUpgradeInformation();
});

// Mouseout event for auto attack speed upgrade button, removes cost information
autoAttackUpgradeSpeedButton.addEventListener("mouseout", () => {
  domUpgradeCosts[1].textContent = "";
  domUpgradeValues[1].textContent = "";
});

// Defense upgrades sub options button
defenseUpgradeButton.addEventListener("click", () => {
  upgradesCategoryButtons.style.display = "none";
  hideUpgradeSubCategories();
  hideUpgradeSubCategory(defenseUpgradeContainer);
});

// Defense upgrade buttons
defenseUpgradeTimerButton.addEventListener("click", () => {
  let currentCost = setPlayerDefenseUpgradeCosts();
  if (player.currency >= currentCost) {
    player.currency -= currentCost;
    setPlayerDefenseUpgradeValue();
    player.upgradeLevels.timer++;
    updatePlayerUpgradeCurrency();
    updatePlayerTimer();
    updateDefenseUpgradeInformation();
  }
});

// Hover event for timer upgrade button, updates cost information
defenseUpgradeTimerButton.addEventListener("mouseover", () => {
  updateDefenseUpgradeInformation();
});

// Mouseout event for timer upgrade button, removes cost information
defenseUpgradeTimerButton.addEventListener("mouseout", () => {
  domUpgradeCosts[2].textContent = "";
  domUpgradeValues[2].textContent = "";
});

defenseUpgradeTimerReductionButton.addEventListener("click", () => {
  let currentCost = setPlayerDefenseTimerReductionCosts();
  if (player.currency >= currentCost) {
    player.currency -= currentCost;
    setPlayerDefenseTimerReductionValue();
    player.upgradeLevels.timerReduction++;
    updatePlayerUpgradeCurrency();
    updatePlayerTimer();
    updateDefenseUpgradeInformation();
  }
});

// Hover event for timer reduction upgrade button, updates cost information
defenseUpgradeTimerReductionButton.addEventListener("mouseover", () => {
  updateDefenseUpgradeInformation();
});

// Mouseout event for timer reduction upgrade button, removes cost information
defenseUpgradeTimerReductionButton.addEventListener("mouseout", () => {
  domUpgradeCosts[2].textContent = "";
  domUpgradeValues[2].textContent = "";
});

// Maybe? Stopping self from adding too much.
// // Currency upgrades sub options button
// currencyUpgradeButton.addEventListener("click", () => {
//   upgradesCategoryButtons.style.display = "none";
//   hideUpgradeSubCategories();
//   hideUpgradeSubCategory(currencyUpgradeContainer);
// });

// Sub options back buttons

attackUpgradeBackButton.addEventListener("click", () => {
  document
    .querySelector(".attack-upgrades")
    .classList.add("disabled-attack-upgrades");
  document
    .querySelector(".attack-upgrades")
    .classList.remove("attack-upgrades");
  showUpgradeSubCategories();
  showElement(playerUpgradesContainer);
  upgradesCategoryButtons.style.display = "grid";
});

autoAttackUpgradeBackButton.addEventListener("click", () => {
  document
    .querySelector(".auto-attack-upgrades")
    .classList.add("disabled-auto-attack-upgrades");
  document
    .querySelector(".auto-attack-upgrades")
    .classList.remove("auto-attack-upgrades");
  showUpgradeSubCategories();
  showElement(playerUpgradesContainer);
  upgradesCategoryButtons.style.display = "grid";
});

defenseUpgradeBackButton.addEventListener("click", () => {
  document
    .querySelector(".defense-upgrades")
    .classList.add("disabled-defense-upgrades");
  document
    .querySelector(".defense-upgrades")
    .classList.remove("defense-upgrades");
  showUpgradeSubCategories();
  showElement(playerUpgradesContainer);
  upgradesCategoryButtons.style.display = "grid";
});

abilitiesUpgradeBackButton.addEventListener("click", () => {
  document
    .querySelector(".abilities-upgrades")
    .classList.add("disabled-abilities-upgrades");
  document
    .querySelector(".abilities-upgrades")
    .classList.remove("abilities-upgrades");
  showUpgradeSubCategories();
  showElement(playerUpgradesContainer);
  upgradesCategoryButtons.style.display = "grid";
});

// Event listener for the REGULAR back button click event
backButton.addEventListener("click", () => {
  // Hide the player upgrades container
  playerUpgradesContainer.setAttribute("hidden", true);

  // Show the player name, attack damage, attack speed, and currency elements
  showElement(playerName);
  showElement(playerAttackDamage);
  showElement(playerAttackSpeed);
  showElement(playerCurrency);
  showElement(playerUpgradeButton);
  showElement(playerAttackReady);
  showElement(playerUpgrades);
});

// Start of character select
description.textContent = "Choose your fate...";
wombImage.classList.add("blurred");
classSelect.value = "";
startGameButton.disabled = true;

// - `classSelect` change event: Updates the character select image, description, and player stats based on the selected class.
// TODO: Comment this or refactor it to be more readable.
// Add an event listener to the class selection dropdown
classSelect.addEventListener("change", () => {
  // Get the selected class from the dropdown
  const selectedClass = classSelect.value;

  // If no class is selected
  if (selectedClass === "") {
    // Remove the blur effect from the womb image
    wombImage.classList.remove(`blurred-${previousClass}`);
    wombImage.classList.add(`blurred`);
    // Clear the character select image
    characterSelectImage.src = "";
    // Set the description text
    description.textContent = "Choose your fate...";
    // Disable the start game button
    startGameButton.disabled = true;
  }

  // If a class is selected and it exists in the classProperties object
  if (selectedClass && classProperties[selectedClass]) {
    // Destructure the properties of the selected class
    const {
      name,
      imagePath,
      attackDamage,
      attackSpeed,
      clickAttackDamage,
      clickAttackSpeed,
    } = classProperties[selectedClass];

    // Set the description text to the selected class's description
    description.textContent = classProperties[selectedClass]["description"];
    // Update the character select and player images to the selected class's image
    characterSelectImage.src = imagePath;
    playerImage.src = imagePath;

    // Update the player's stats to the selected class's stats
    player.name = name;
    player.attackDamage = attackDamage;
    player.attackSpeed = attackSpeed;
    player.clickAttackDamage = clickAttackDamage;
    player.clickAttackSpeed = clickAttackSpeed;
    player.class = selectedClass;
    player.imagePath = imagePath;

    // Remove all blur classes from the womb image
    clearBlurClasses();
    // Add a blur class to the womb image based on the selected class
    wombImage.classList.add(`blurred-${selectedClass}`);
    // Enable the start game button
    startGameButton.disabled = false;
    // Store the selected class for future reference
    previousClass = selectedClass;
  }
});

// - `startGameButton` click event: Hides the character select container and shows the opening 'cinematic'
startGameButton.addEventListener("click", () => {
  if (!gameStarted) {
    // begin opening cinematic
    hideDisplay(characterSelectContainer);

    // Update player stats;
    updatePlayerStats();
    savePlayerData(); // Save the player data after selecting a class
    enterWombElement();
  } else {
    hideDisplay(characterSelectContainer);
  }
});

// - `enterWomb` click event: Hides the character select container and shows the main game container when clicked.
// ! THIS IS THE START OF THE GAME
enterWomb.addEventListener("click", () => {
  hideDisplay(characterSelectContainer);
  hideDisplay(openingCinematicContainer);
  gameStarted = true;
  startGameLoop();
});

// END of character select

// Game Logic
// ----------
// TODO: Add more game logic

function gameLoop() {
  if (player.attackDamage !== undefined && player.attackSpeed !== undefined) {
    if (enemy) {
      updateDOM();
      updateTimer();
      attackEnemy(player, enemy);
      showPlayerAttackReady();
      checkEnemyHealth();
    }
    if (enemy === null) {
      savePlayerData();
      showPlayerAttackReady();
      updateDOM();
      resetPlayerTimer();
    }
  }
}

function startGameLoop() {
  if (gameStarted) {
    console.log("Starting game loop");
    hideUpgradesChildren();
    loadPlayerData();
    spawnEnemy();
    showGameElements();
    gameLoopInterval = setInterval(gameLoop, 10);
  }
}
