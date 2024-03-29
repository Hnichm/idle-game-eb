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

The `enemy` object represents the enemy character and includes properties like name, health, image path, and currency.

### DOM Elements

The JavaScript code selects various DOM elements using `querySelector` and assigns them to variables for easy access and manipulation. These elements include:

- Player stats: `playerName`, `playerAttackDamage`, `playerAttackSpeed`, `playerCurrency`, `playerTimer`
- Enemy stats: `enemyName`, `enemyHealth`, `enemyCurrency`
- Buttons: `descendButton`, `startGameButton`, `enterWomb`, `ascendFloorButton`, `descendFloorButton`, `playerUpgradeButton`
- Containers: `gameStart`, `characterSelectContainer`, `openingCinematicContainer`, `mainGameContainer`, `playerUpgradesContainer`
- Images: `wombImage`, `characterSelectImage`, `playerImage`, `enemyImage`

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

These functions work together to create the game flow, handle player actions, update game states, and trigger appropriate UI updates.

### DOM Updates

The JavaScript code updates the game's UI elements based on the game state. Functions like `updateEnemyName`, `updateEnemyHealth`, `updateEnemyCurrency`, `updatePlayerStats`, `updatePlayerTimer`, `updatePlayerCurrency`, `updatePlayerAttack`, `updatePlayerAttackSpeed`, and `updateEnemyContainer` are responsible for updating the corresponding UI elements with the latest game data.

### Animation Functions

The code includes animation functions to enhance the visual feedback of the game:

- `playerAutoAttackDash`: Adds the `auto-attack-dash` class to the player image to trigger the auto-attack animation.
- `enemyAutoAttacked`: Adds the `auto-attack-hit` and `enemy-image-take-damage` classes to the enemy image container and enemy image respectively to trigger the enemy hit animation.
- `showFloatingDamageNumber`: Creates a floating damage number element and appends it to the specified container, animating it using CSS animations.

### Game Loop

The `gameLoop` function is the core of the game's update loop. It is responsible for updating the game state, checking enemy health, triggering player attacks, and updating the UI. The `startGameLoop` function initializes the game loop when the game starts.

### Upgrade System

The code includes an upgrade system that allows the player to allocate currency earned from defeating enemies to enhance their stats. The upgrade buttons are categorized into attack, auto-attack, defense, and abilities.

When the player clicks on the `playerUpgradeButton`, the player upgrades container is shown, and the upgrade category buttons are displayed. Clicking on a category button reveals the corresponding upgrade options.

The `backButton` allows the player to return to the main game screen, hiding the upgrades container and showing the player stats elements.

## Interaction and Game Flow

The game starts with the game start screen, where the player can click the "descend" button to proceed to the character select screen. On the character select screen, the player chooses their desired class, which updates the description, image, and player stats accordingly.

After selecting a class, the player clicks the "Forward" button to start the opening cinematic. Once the cinematic is complete, the player can click the "enter womb" (the entrance to the cavernous structure) button to begin the main game.

In the main game, the player battles enemies, uses skills, and upgrades their stats. The game loop continuously updates the UI, checks for enemy health, and handles player attacks and timer updates. The player can ascend or descend floors to face different enemies and progress through the game.

The game also includes an upgrade system, where the player can allocate currency earned from defeating enemies to enhance their attack, auto-attack, defense, and abilities.
