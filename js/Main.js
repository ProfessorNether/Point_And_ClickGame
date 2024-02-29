// alert('Deze pagina heeft toegang tot uw huidige locatie & zoekgeschiedenis');
document.getElementById("MainTitle").innerText = "Point & Click Game";
//Game window ref
const GameWindow = document.getElementById("container");

//inventory
const inventoryList = document.getElementById("InventoryList");

const MainCharacterSpeech = document.getElementById("MainCharacterSpeech");
const OtherCharacterSpeech = document.getElementById("OtherCharacterSpeech");
const otherAvatar = document.getElementById("counterAvatarImg");
const MainAvatar = document.getElementById("MainCharacterIMG");

const sec = 1000;

//game state
let gameState = {
    "door1locked": true,
    "inventory": [
    ],
    "KeyPickedUp": false
}

//allows te remove save file
// localStorage.removeItem("gameState")

if (typeof (Storage) !== "undefined") {

    if (localStorage.gameState) {
        gameState = JSON.parse(localStorage.gameState);
    } else {
        localStorage.setItem("gameState", JSON.stringify(gameState));
    }
} else {
    alert("Web storage not supported");
}

updateInventory(gameState.inventory, inventoryList);

if (gameState.KeyPickedUp) {
    document.getElementById("Key1").remove();
}

//main moveable char ref
const MainCharacter = document.getElementById("MainCharacter");
const OffssetCharacter = 40;

//what to do if user clicks
GameWindow.onclick = function (e) {
    var rect = GameWindow.getBoundingClientRect();
    var X = e.clientX - rect.left;
    var Y = e.clientY - rect.top;

    console.log(e.target.id); {
        MainCharacter.style.left = X - OffssetCharacter + "px";
        MainCharacter.style.top = Y - OffssetCharacter + "px";
    }

    switch (e.target.id) {

        case "Door1":
            if (gameState.door1locked == true) {
                console.log("Open Door;");
                Door1.style.opacity = 0.2;
                Sign.style.opacity = 1;
                //check for key
                if (document.getElementById("inventory_Key") !== null) {
                    gameState.door1locked = false;
                    alert("Door unlocked");
                } else {
                    alert("Door is locked!");
                }
                //no = message saying needs key 
            } else {
                console.log("entering building")
                alert("Entering Building");
            }
            SaveToBrowser(gameState);
            break;

        case "Key1":
            if (document.getElementById("Key1") !== null) {
                console.log('Found key!');
                document.getElementById("Key1").remove();
                changeInventory('key', 'add');
                gameState.KeyPickedUp = true;
                SaveToBrowser(gameState);
            }
            break;

        case "Sign":
            console.log("Read Sign;");
            Sign.style.opacity = 0.2;
            Door1.style.opacity = 1;
            break;

        case "Statue":
            console.log("Talk to Statue;");
            setTimeout(function () { otherAvatar.style.opacity = 1; });
            setTimeout(function () { MainAvatar.style.opacity = 1; });
            ShowMessage(MainCharacterSpeech, "Wow cool statue...");
            setTimeout(ShowMessage, 4 * sec, OtherCharacterSpeech, "I can can speak dummy");
            setTimeout(ShowMessage, 8 * sec, MainCharacterSpeech, "No need to be so mean");
            setTimeout(ShowMessage, 12 * sec, OtherCharacterSpeech, "You should check the north house");
            setTimeout(ShowMessage, 17 * sec, OtherCharacterSpeech, "There might be something usefull there");
            setTimeout(function () { otherAvatar.style.opacity = 0; }, 21 * sec);
            setTimeout(function () { MainAvatar.style.opacity = 0; }, 21 * sec);
            break;

        default:
            MainCharacter.style.background.opacity = 0;
            Door1.style.opacity = 1;
            Sign.style.opacity = 1;
            //do something
            break;
    }
}

/**
* function to change inventory
* @param {string} itemName 
* @param {string} action "add", "delete"
* @returns 
*/
function changeInventory(itemName, action) {
    if (itemName == null || action == null) {
        console.log('wrong parameters given to changeInventory()');
        return
    }

    switch (action) {
        case 'add':
            gameState.inventory.push(itemName);
            break
        case 'delete':
            gameState.inventory.find(function (item, index) {
                if (item == itemName) {
                    var index = gameState.inventory.indexOf(item);
                    if (index !== -1) {
                        gameState.inventory.splice(index, 1);
                    }
                }
            })
            break

        default:
            break;
    }
    updateInventory(gameState.inventory, inventoryList);
}

/**
 * update inventoryList
 * @param {Array} inventory array of items 
 * @param {HTMLElement} inventoryList html <ul> element 
 */
function updateInventory(inventory, inventoryList) {
    inventoryList.innerHTML = '';
    inventory.forEach(function (item) {
        const inventoryItem = document.createElement("li");
        inventoryItem.id = "inventory-" + item;
        inventoryItem.innerText = item;
        inventoryList.appendChild(inventoryItem);
    })
}

/**
 * Shows a message in a speech bubble
 * @param {getElementById} targetBalloon 
 * @param {string} message 
 */

function ShowMessage(targetBalloon, message) {
    targetBalloon.style.opacity = "1";
    targetBalloon.innerText = message;
    setTimeout(hideMessage, 4 * sec, targetBalloon);
}
// ShowMessage("MainCharacterSpeech");
// ShowMessage("OtherCharacterSpeech");
// setTimeout(ShowMessage, 1 * sec, OtherCharacterSpeech);
// setTimeout(ShowMessage, 2 * sec, MainCharacterSpeech);

/**
 * Set the opacity to 0
 * @param {getElementById} targetBalloon 
 * @param {getElementById} targetSound 
 */

function hideMessage(targetBalloon) {
    targetBalloon.style.opacity = "0";
}
/**
 * Save the game state onto the browser
 * @param (object) gameState
*/
function SaveToBrowser(gameState) {
    localStorage.gameState = JSON.stringify(gameState);
}
