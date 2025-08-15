// Game State
let gameState = {
    player: {
        name: "Kael",
        level: 1,
        hp: 50,
        maxHp: 50,
        attack: 12,
        defense: 5,
        xp: 0,
        xpNeeded: 100,
        weapon: "Rusty Sword",
        armor: "Cloth Shirt",
        inventory: {
            "Health Potion": 3
        }
    },
    currentArea: 0,
    inBattle: false,
    currentEnemy: null,
    gamePhase: "intro" // intro, exploration, battle, victory, game-over
};

// Enemy Templates
const enemies = [
    {
        name: "🐺 Shadow Wolf",
        hp: 30,
        maxHp: 30,
        attack: 8,
        defense: 2,
        xpReward: 25,
        art: `    🐺\n   /||\\\n  / || \\\n /  ||  \\\n    ||`
    },
    {
        name: "🧌 Cave Troll",
        hp: 45,
        maxHp: 45,
        attack: 12,
        defense: 4,
        xpReward: 40,
        art: `   👹\n  /|||\\\n / ||| \\\n/  |||  \\\n   |||`
    },
    {
        name: "👻 Lost Spirit",
        hp: 25,
        maxHp: 25,
        attack: 10,
        defense: 1,
        xpReward: 30,
        art: `   👻\n  /~~~\\\n /~~~~~\\\n/~~~~~~~\\\n   ~~~`
    },
    {
        name: "🐉 Shadow Lord",
        hp: 80,
        maxHp: 80,
        attack: 18,
        defense: 8,
        xpReward: 200,
        art: `    🐉\n   /|||\\\n  / ||| \\\n /  |||  \\\n/   |||   \\\n    |||`
    }
];

// Story Areas
const storyAreas = [
    {
        text: "You venture deeper into the Whispering Woods. Ancient trees tower above you, their branches creaking ominously in the wind.",
        enemyChance: 0.6,
        possibleEnemies: [0] // Shadow Wolf
    },
    {
        text: "You discover a crumbling stone bridge over a misty ravine. Dark caves line the opposite cliff face.",
        enemyChance: 0.7,
        possibleEnemies: [1, 2] // Cave Troll, Lost Spirit
    },
    {
        text: "The path leads to an ancient graveyard. Weathered tombstones jut from the earth like broken teeth.",
        enemyChance: 0.8,
        possibleEnemies: [2] // Lost Spirit
    },
    {
        text: "You stand before the entrance to Shadowmere Keep. Dark energy pulses from within the ruined fortress.",
        enemyChance: 1.0,
        possibleEnemies: [3] // Shadow Lord (Boss)
    }
];

// Equipment Database
const equipment = {
    weapons: {
        "Rusty Sword": { attack: 0, defense: 0 },
        "Iron Sword": { attack: 5, defense: 0 },
        "Silver Blade": { attack: 10, defense: 2 },
        "Dragon Slayer": { attack: 20, defense: 5 }
    },
    armor: {
        "Cloth Shirt": { attack: 0, defense: 0 },
        "Leather Armor": { attack: 0, defense: 3 },
        "Chain Mail": { attack: 0, defense: 7 },
        "Plate Armor": { attack: 0, defense: 12 }
    }
};

// Initialize Game
function startGame() {
    showScreen('main-game');
    gameState.gamePhase = "exploration";
    updateDisplay();
    addMessage("Your adventure begins...", "story");
}

function restartGame() {
    // Reset game state
    gameState = {
        player: {
            name: "Kael",
            level: 1,
            hp: 50,
            maxHp: 50,
            attack: 12,
            defense: 5,
            xp: 0,
            xpNeeded: 100,
            weapon: "Rusty Sword",
            armor: "Cloth Shirt",
            inventory: {
                "Health Potion": 3
            }
        },
        currentArea: 0,
        inBattle: false,
        currentEnemy: null,
        gamePhase: "intro"
    };
    
    showScreen('intro-screen');
    clearMessages();
}

// Screen Management
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Display Updates
function updateDisplay() {
    // Update player stats
    document.getElementById('player-level').textContent = gameState.player.level;
    document.getElementById('player-hp').textContent = gameState.player.hp;
    document.getElementById('player-max-hp').textContent = gameState.player.maxHp;
    document.getElementById('player-xp').textContent = gameState.player.xp;
    document.getElementById('player-xp-needed').textContent = gameState.player.xpNeeded;
    
    // Calculate total attack/defense including equipment
    const totalAttack = gameState.player.attack + 
        (equipment.weapons[gameState.player.weapon]?.attack || 0) + 
        (equipment.armor[gameState.player.armor]?.attack || 0);
    const totalDefense = gameState.player.defense + 
        (equipment.weapons[gameState.player.weapon]?.defense || 0) + 
        (equipment.armor[gameState.player.armor]?.defense || 0);
    
    document.getElementById('player-attack').textContent = totalAttack;
    document.getElementById('player-defense').textContent = totalDefense;
    document.getElementById('player-weapon').textContent = gameState.player.weapon;
    document.getElementById('player-armor').textContent = gameState.player.armor;
    
    // Update story text if not in battle
    if (!gameState.inBattle && gameState.currentArea < storyAreas.length) {
        document.getElementById('story-text').innerHTML = 
            `<p>${storyAreas[gameState.currentArea].text}</p>`;
    }
}

// Exploration Actions
function exploreForward() {
    if (gameState.inBattle) return;
    
    const area = storyAreas[gameState.currentArea];
    const encounterRoll = Math.random();
    
    if (encounterRoll < area.enemyChance) {
        // Encounter an enemy
        const enemyIndex = area.possibleEnemies[Math.floor(Math.random() * area.possibleEnemies.length)];
        startBattle(enemyIndex);
    } else {
        // Safe exploration
        gameState.currentArea++;
        if (gameState.currentArea >= storyAreas.length) {
            // Game completed!
            showScreen('victory-screen');
            return;
        }
        updateDisplay();
        addMessage("You continue forward safely...", "story");
    }
}

function searchArea() {
    if (gameState.inBattle) return;
    
    const findChance = Math.random();
    if (findChance < 0.3) {
        // Find equipment
        const equipmentTypes = ['weapons', 'armor'];
        const type = equipmentTypes[Math.floor(Math.random() * equipmentTypes.length)];
        const items = Object.keys(equipment[type]);
        const foundItem = items[Math.floor(Math.random() * items.length)];
        
        if (type === 'weapons') {
            gameState.player.weapon = foundItem;
            addMessage(`🗡️ You found a ${foundItem}!`, "story");
        } else {
            gameState.player.armor = foundItem;
            addMessage(`🛡️ You found ${foundItem}!`, "story");
        }
        updateDisplay();
    } else if (findChance < 0.6) {
        // Find health potion
        gameState.player.inventory["Health Potion"] = (gameState.player.inventory["Health Potion"] || 0) + 1;
        addMessage("🧪 You found a Health Potion!", "story");
    } else {
        addMessage("You search the area but find nothing of value.", "story");
    }
}

function rest() {
    if (gameState.inBattle) return;
    
    const healAmount = Math.floor(gameState.player.maxHp * 0.3);
    gameState.player.hp = Math.min(gameState.player.maxHp, gameState.player.hp + healAmount);
    addMessage(`💤 You rest and recover ${healAmount} HP.`, "heal");
    updateDisplay();
}

function checkInventory() {
    showScreen('inventory-screen');
    updateInventoryDisplay();
}

function closeInventory() {
    showScreen('main-game');
}

function updateInventoryDisplay() {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = '';
    
    for (const [item, quantity] of Object.entries(gameState.player.inventory)) {
        if (quantity > 0) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.innerHTML = `🧪 ${item} x${quantity}`;
            itemDiv.onclick = () => useInventoryItem(item);
            inventoryList.appendChild(itemDiv);
        }
    }
    
    if (Object.keys(gameState.player.inventory).length === 0) {
        inventoryList.innerHTML = '<p>Your inventory is empty.</p>';
    }
}

function useInventoryItem(item) {
    if (item === "Health Potion" && gameState.player.inventory[item] > 0) {
        const healAmount = 25;
        gameState.player.hp = Math.min(gameState.player.maxHp, gameState.player.hp + healAmount);
        gameState.player.inventory[item]--;
        addMessage(`🧪 You used a Health Potion and recovered ${healAmount} HP!`, "heal");
        updateDisplay();
        updateInventoryDisplay();
    }
}

// Battle System
function startBattle(enemyIndex) {
    gameState.inBattle = true;
    gameState.currentEnemy = JSON.parse(JSON.stringify(enemies[enemyIndex])); // Deep copy
    
    document.getElementById('battle-screen').classList.remove('hidden');
    document.getElementById('exploration-actions').style.display = 'none';
    
    updateBattleDisplay();
    addMessage(`💀 A ${gameState.currentEnemy.name} appears!`, "story");
}

function updateBattleDisplay() {
    document.getElementById('enemy-name').textContent = gameState.currentEnemy.name;
    document.getElementById('enemy-hp').textContent = gameState.currentEnemy.hp;
    document.getElementById('enemy-max-hp').textContent = gameState.currentEnemy.maxHp;
    document.getElementById('enemy-art').textContent = gameState.currentEnemy.art;
}

function playerAttack() {
    if (!gameState.inBattle) return;
    
    const playerDamage = calculateDamage(getPlayerAttack(), gameState.currentEnemy.defense);
    gameState.currentEnemy.hp -= playerDamage;
    
    addMessage(`⚔️ You attack for ${playerDamage} damage!`, "damage");
    
    if (gameState.currentEnemy.hp <= 0) {
        // Enemy defeated
        addMessage(`🏆 You defeated the ${gameState.currentEnemy.name}!`, "story");
        gainXP(gameState.currentEnemy.xpReward);
        endBattle();
        
        // Check if this was the boss
        if (gameState.currentEnemy.name.includes("Shadow Lord")) {
            showScreen('victory-screen');
            return;
        }
        
        gameState.currentArea++;
        if (gameState.currentArea >= storyAreas.length) {
            showScreen('victory-screen');
            return;
        }
    } else {
        // Enemy attacks back
        setTimeout(() => {
            enemyAttack();
        }, 1000);
    }
    
    updateBattleDisplay();
}

function playerDefend() {
    if (!gameState.inBattle) return;
    
    addMessage("🛡️ You raise your guard, reducing incoming damage!", "story");
    
    // Enemy attacks with reduced damage
    setTimeout(() => {
        enemyAttack(0.5); // 50% damage reduction
    }, 1000);
}

function useItem() {
    if (!gameState.inBattle) return;
    
    if (gameState.player.inventory["Health Potion"] > 0) {
        useInventoryItem("Health Potion");
        // Enemy attacks after item use
        setTimeout(() => {
            enemyAttack();
        }, 1000);
    } else {
        addMessage("🚫 You have no items to use!", "story");
    }
}

function enemyAttack(damageReduction = 1.0) {
    if (!gameState.inBattle) return;
    
    const enemyDamage = Math.floor(calculateDamage(gameState.currentEnemy.attack, getPlayerDefense()) * damageReduction);
    gameState.player.hp -= enemyDamage;
    
    addMessage(`💥 The ${gameState.currentEnemy.name} attacks you for ${enemyDamage} damage!`, "damage");
    
    if (gameState.player.hp <= 0) {
        gameState.player.hp = 0;
        addMessage("💀 You have been defeated!", "damage");
        showScreen('game-over-screen');
        return;
    }
    
    updateDisplay();
    updateBattleDisplay();
}

function endBattle() {
    gameState.inBattle = false;
    gameState.currentEnemy = null;
    
    document.getElementById('battle-screen').classList.add('hidden');
    document.getElementById('exploration-actions').style.display = 'flex';
    document.getElementById('battle-log').innerHTML = '';
    
    updateDisplay();
}

// Helper Functions
function getPlayerAttack() {
    return gameState.player.attack + 
        (equipment.weapons[gameState.player.weapon]?.attack || 0) + 
        (equipment.armor[gameState.player.armor]?.attack || 0);
}

function getPlayerDefense() {
    return gameState.player.defense + 
        (equipment.weapons[gameState.player.weapon]?.defense || 0) + 
        (equipment.armor[gameState.player.armor]?.defense || 0);
}

function calculateDamage(attack, defense) {
    const baseDamage = attack - defense;
    const randomFactor = 0.8 + (Math.random() * 0.4); // 80% - 120% damage
    return Math.max(1, Math.floor(baseDamage * randomFactor));
}

function gainXP(amount) {
    gameState.player.xp += amount;
    addMessage(`✨ You gained ${amount} XP!`, "level-up");
    
    // Check for level up
    while (gameState.player.xp >= gameState.player.xpNeeded && gameState.player.level < 10) {
        levelUp();
    }
    
    updateDisplay();
}

function levelUp() {
    gameState.player.level++;
    gameState.player.xp -= gameState.player.xpNeeded;
    gameState.player.xpNeeded = Math.floor(gameState.player.xpNeeded * 1.5);
    
    // Stat increases
    const hpIncrease = 10 + Math.floor(Math.random() * 5);
    const attackIncrease = 2 + Math.floor(Math.random() * 3);
    const defenseIncrease = 1 + Math.floor(Math.random() * 2);
    
    gameState.player.maxHp += hpIncrease;
    gameState.player.hp = gameState.player.maxHp; // Full heal on level up
    gameState.player.attack += attackIncrease;
    gameState.player.defense += defenseIncrease;
    
    addMessage(`🎉 LEVEL UP! You are now level ${gameState.player.level}!`, "level-up");
    addMessage(`📈 HP +${hpIncrease}, Attack +${attackIncrease}, Defense +${defenseIncrease}`, "level-up");
}

// Message System
function addMessage(text, type = "story") {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    
    // Also add to battle log if in battle
    if (gameState.inBattle) {
        const battleLog = document.getElementById('battle-log');
        const battleMessageDiv = document.createElement('div');
        battleMessageDiv.className = `message ${type}`;
        battleMessageDiv.textContent = text;
        battleLog.appendChild(battleMessageDiv);
        battleLog.scrollTop = battleLog.scrollHeight;
    }
}

function clearMessages() {
    document.getElementById('messages').innerHTML = '';
    document.getElementById('battle-log').innerHTML = '';
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
});
