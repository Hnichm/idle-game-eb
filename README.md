# Idle Game

This is an idle game where the player selects a character class, battles enemies, and progresses through different floors. The game is built using HTML, CSS, and JavaScript.

## HTML Structure

The HTML file (`index.html`) defines the structure of the game's user interface. It includes the following main sections:

- Game Start: Displays the start screen with a background image and a "descend" button.
- Character Select: Allows the player to choose their character class and displays a description and image of the selected class.
- Opening Cinematic: Shows an opening cinematic with a background image and an "enter womb" button.
- Main Game: Contains the main game interface, including player stats, game title, enemy stats, player skills, combat area, and upgrade buttons.

## CSS Styling

The CSS file (`style.css`) provides the styling and layout for the game's user interface. It defines the appearance of various elements, such as buttons, containers, images, and text. The CSS also includes animations for effects like the womb pulse, character select blur, auto-attack animations, and floating damage numbers.

The layout of the game is primarily achieved using CSS Grid, which allows for flexible and responsive positioning of elements. The main game container is divided into different grid areas, such as player stats, game title, combat area, enemy stats, and player skills.

## JavaScript Functionality

The JavaScript file (`script.js`) handles the game logic and interactivity. It is responsible for managing the game state, updating the UI, and responding to user actions. Let's dive into the main components of the JavaScript code:

### Player and Enemy Objects

The `player` object represents the player character and contains properties such as name, attack damage, attack speed, currency, floor, image path, and various game states like `inCombat` and `canAttack`. It also includes properties for the game timer, such as `timer`, `maxTimer`, `timerPaused`, and `timerRemainingTime`.

The `player` object also includes properties for upgrade levels (`upgradeLevels`) and upgrade costs (`upgradeCosts`) for various player stats and abilities.

The `enemy` object represents the enemy character and includes properties like name, health, image path, and currency.

### Upgrade Functions

The code includes several functions that handle the logic for player upgrades:

- `setPlayerAutoAttackUpgradeCosts` and `setPlayerAutoAttackSpeedUpgradeCosts`: Calculate the upgrade costs for auto-attack damage and speed based on the player's class and upgrade level.
- `setPlayerAutoAttackUpgradeValue` and `setPlayerAutoAttackSpeedUpgradeValue`: Update the player's auto-attack damage and speed based on the upgrade level.
- `setPlayerAttackUpgradeCosts` and `setPlayerAttackSpeedUpgradeCosts`: Calculate the upgrade costs for click attack damage and speed based on the player's class and upgrade level.
- `setPlayerAttackUpgradeValue` and `setPlayerAttackSpeedUpgradeValue`: Update the player's click attack damage and speed based on the upgrade level.
- `setPlayerDefenseUpgradeCosts`: Calculate the upgrade cost for the player's defense (timer) based on the player's class and upgrade level.
- `setPlayerDefenseUpgradeValue`: Update the player's defense (timer) based on the upgrade level.

### DOM Elements

The code selects various DOM elements using `querySelector` and assigns them to variables for easy access and manipulation. These elements include:

- Player stats: `playerName`, `playerAttackDamage`, `playerAttackSpeed`, `playerCurrency`, `playerTimer`, etc.
- Enemy stats: `enemyName`, `enemyHealth`, `enemyCurrency`, etc.
- Buttons: `descendButton`, `startGameButton`, `enterWomb`, `ascendFloorButton`, `descendFloorButton`, `playerUpgradeButton`, etc.
- Containers: `gameStart`, `characterSelectContainer`, `openingCinematicContainer`, `mainGameContainer`, `playerUpgradesContainer`, etc.
- Images: `wombImage`, `characterSelectImage`, `playerImage`, `enemyImage`, etc.
- Upgrade elements: `upgradeCurrencyDisplay`, `attackUpgradeButton`, `autoAttackUpgradeButton`, `defenseUpgradeButton`, `abilitiesUpgradeButton`, etc.

### Class Properties

The `classProperties` object defines the properties and stats for different character classes. Each class has a name, image path, description, attack damage, attack speed, click attack damage, and click attack speed. The available classes are Warrior, Magician, Rogue, and Cleric.

### Utility Functions

The code includes several utility functions to perform common tasks:

- `hideElement`: Hides the specified element by setting its `hidden` attribute to true.
- `hideDisplay`: Hides the specified element by setting its `display` style to "none".
- `showElement`: Shows the specified element by removing the `hidden` attribute.
- `clearBlurClasses`: Removes the blur classes from the `wombImage` element.
- `rngArrayLength`: Generates a random index within the length of an array.

### Event Listeners

Event listeners are set up to handle user interactions:

- `descendButton`: Changes the image source on mouseover and mouseout, and triggers the transition to the character select screen on click.
- `classSelect`: Updates the character select image, description, and player stats based on the selected class.
- `startGameButton`: Hides the character select container and shows the opening cinematic.
- `enterWomb`: Hides the character select container and opening cinematic, and starts the main game loop.
- `ascendFloorButton` and `descendFloorButton`: Trigger the `changeFloor` function to ascend or descend floors.
- `enemyImage`: Triggers the `clickAttackEnemy` function when clicked, allowing the player to perform a click attack on the enemy.
- `playerUpgradeButton`: Shows the player upgrades container and hides other player stats elements.
- `backButton`: Hides the player upgrades container and shows the player stats elements.
- `Upgrade buttons`: Event listeners are set up for various upgrade buttons (`attackUpgradeClickDamageButton`, `attackUpgradeSpeedButton`, `autoAttackUpgradeDamageButton`, `autoAttackUpgradeSpeedButton`, `defenseUpgradeTimerButton`, etc.) to handle the upgrade functionality and update the corresponding player stats and UI elements.

### Game Logic

The core game logic is implemented through various functions:

- `getRandomMonster`: Selects a random monster based on the current floor.
- `spawnEnemy`: Spawns a new enemy when the player is not in combat.
- `changeFloor`: Handles ascending or descending to different floors.
- `attackEnemy`: Simulates an attack from the player to the enemy.
- `clickAttackEnemy`: Performs a click attack on the enemy when the player clicks on the enemy image.
- `checkEnemyHealth`: Checks if the enemy's health is depleted and triggers enemy death and currency rewards.
- `enemyDeath`: Handles the enemy death logic, hiding the enemy image and resetting the combat state.
- `addCurrency`: Adds the enemy's currency to the player's currency upon enemy death.
- `updateTimer`: Updates the game timer and checks for player death.
- `pauseTimer` and `resumeTimer`: Implements the pause and resume functionality for the game timer.
- `playerDeath`: Handles the player death logic, resetting the timer, decreasing the floor, and spawning a new enemy after a delay.
- `savePlayerData`: Saves the player's data to local storage, allowing the game to be resumed later.
- `loadPlayerData`: Loads the player's data from local storage, restoring the game state.
- `hasSavedGame`: Checks if there is a saved game available in local storage.

These functions work together to create the game flow, handle player actions, update game states, and trigger appropriate UI updates.

### Save and Load System

The game includes a save and load system that allows the player to resume their progress. When the player clicks the "descend" button on the game start screen, the game checks if there is a saved game available using the `hasSavedGame` function. If a saved game exists, a modal is displayed with options to start a new game or load the saved game.

- If the player chooses to start a new game, the saved game data is removed from local storage, and the game proceeds to the character select screen.
- If the player chooses to load the saved game, the `loadPlayerData` function is called, which retrieves the saved player data from local storage and assigns it to the `player` object. The game then skips the character select and opening cinematic screens and starts the main game loop.

The `savePlayerData` function is called at various points throughout the game, such as when the player selects a class and when the enemy is defeated, to save the current game state to local storage.

### DOM Updates

The JavaScript code updates the game's UI elements based on the game state. Functions like `updateEnemyName`, `updateEnemyHealth`, `updateEnemyCurrency`, `updatePlayerStats`, `updatePlayerTimer`, `updatePlayerCurrency`, `updatePlayerAttack`, `updatePlayerAttackSpeed`, and `updateEnemyContainer` are responsible for updating the corresponding UI elements with the latest game data.

### Animation Functions

The code includes animation functions to enhance the visual feedback of the game:

- `playerAutoAttackDash`: Adds the `auto-attack-dash` class to the player image to trigger the auto-attack animation.
- `enemyAutoAttacked`: Adds the `auto-attack-hit` and `enemy-image-take-damage` classes to the enemy image container and enemy image respectively to trigger the enemy hit animation.
- `showFloatingDamageNumber`: Creates a floating damage number element and appends it to the specified container, animating it using CSS animations.
- `updateDOM`: This function is a centralized place to call all the individual DOM update functions. It is currently called in the game loop to update the UI with the latest game state. As the game grows, more DOM update functions can be added to this function to keep the UI in sync with the game state.

### Game Loop

The `gameLoop` function is the core of the game's update loop. It is responsible for updating the game state, checking enemy health, triggering player attacks, and updating the UI. The `startGameLoop` function initializes the game loop when the game starts.

### Upgrade System

The code includes an upgrade system that allows the player to allocate currency earned from defeating enemies to enhance their stats. The upgrade buttons are categorized into attack, auto-attack, defense, and abilities.

When the player clicks on the `playerUpgradeButton`, the player upgrades container is shown, and the upgrade category buttons are displayed. Clicking on a category button reveals the corresponding upgrade options.

The `backButton` allows the player to return to the main game screen, hiding the upgrades container and showing the player stats elements.

The upgrade system also includes functions to update the upgrade information displayed to the player, such as the upgrade costs and values. These functions, like `updateAttackUpgradeInformation`, `updateAttackSpeedUpgradeInformation`, `updateAutoAttackUpgradeInformation`, `updateAutoAttackSpeedUpgradeInformation`, and `updateDefenseUpgradeInformation`, are called when the player hovers over the corresponding upgrade buttons to display the relevant information.

## Interaction and Game Flow

The game starts with the game start screen, where the player can click the "descend" button on the game start screen, the game checks for a saved game. If a saved game exists, the player is presented with a modal offering the choice to start a new game or load the saved game. If the player chooses to load the saved game, they will skip the character select and opening cinematic screens and be taken directly to the main game, resuming from where they left off. Else it proceeds to the character select screen. On the character select screen, the player chooses their desired class, which updates the description, image, and player stats accordingly.

After selecting a class, the player clicks the "Forward" button to start the opening cinematic. Once the cinematic is complete, the player can click the "enter womb" (the entrance to the cavernous structure) button to begin the main game.

In the main game, the player battles enemies, uses skills, and upgrades their stats. The game loop continuously updates the UI, checks for enemy health, and handles player attacks and timer updates. The player can ascend or descend floors to face different enemies and progress through the game.

The game also includes an upgrade system, where the player can allocate currency earned from defeating enemies to enhance their attack, auto-attack, defense, and abilities.

## Future Improvements and Features

- More enemy variety: Adding diverse enemies with unique abilities and behaviors, some affecting the player's timer.

- Sound effects: Atmospheric ambience, attack sounds, and audio feedback for ui elements.

- Visual effects: Skill effects, and other visual elements to enhance the 'feel' of the game.

- Skill system: Skills for each class, attempting to offer a differing playstyle.

