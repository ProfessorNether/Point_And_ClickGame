//alert('Deze pagina heeft toegang tot uw huidige locatie & zoekgeschiedenis');
document.getElementById("MainTitle").innerText = "Point & Click Game";
//Game window ref
const GameWindow = document.getElementById("container");

//inventory
const inventoryList = document.getElementById("InventoryList");

const MainCharacterSpeech = document.getElementById("MainCharacterSpeech");
const OtherCharacterSpeech = document.getElementById("OtherCharacterSpeech");
//const SmallHouseSpeech = document.getElementById("SmallHouseSpeech")
const otherAvatar = document.getElementById("counterAvatarImg");
const MainAvatar = document.getElementById("MainCharacterIMG");
const otherHouseAvatar = document.getElementById("CounterHouseIMG");
const otherKeyAvatar = document.getElementById("counterKeyImg");

//letter const
const otherLetterClose = document.getElementById("counterLetterCloseImg");
const otherLetterOpen = document.getElementById("counterLetterOpenImg");

//apple const
const appleFront = document.getElementById("AppleFrontImg");
const appleSide = document.getElementById("AppleSideWaysImg");

const HouseLock = document.getElementById("HouseLock");

const sec = 1000;

//game state
let gameState = {
    "door1locked": true,
    "inventory": [
    ],
    "KeyPickedUp": false,
    "ChestOpened": false,
    "AppleFound": false,
    "FirstTimeTalkingToFlames": true
    // "FirstTimeFlameTalk": false
}

//allows te remove save file
localStorage.removeItem("gameState")

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
                //Door1.style.opacity = 0.0;
                //Sign.style.opacity = 1;
                //check for key
                if (document.getElementById("inventory-Key") !== null) {
                    gameState.door1locked = false;
                    alert("Door unlocked");
                    HouseLock.style.opacity = 0;
                } else {
                    alert("Door is locked!");
                }
                //no = message saying needs key 
            } else {
                console.log("entering building")
                alert("You did it! YAAAYYYY");
            }
            SaveToBrowser(gameState);
            break;
        case "Smallhouse":
            if (document.getElementById("Smallhouse") !== null) {
                console.log('what a cool house');

                setTimeout(function () { otherHouseAvatar.style.opacity = 1; });
                setTimeout(function () { MainAvatar.style.opacity = 1; });
                ShowMessage(MainCharacterSpeech, "what a cute house");
                setTimeout(ShowMessage, 4 * sec, OtherCharacterSpeech, "(silent)");
                setTimeout(ShowMessage, 8 * sec, MainCharacterSpeech, "I wonder if someone lives here");
                setTimeout(ShowMessage, 12 * sec, OtherCharacterSpeech, "(Silent)");
                setTimeout(ShowMessage, 16 * sec, MainCharacterSpeech, "Best to get going again");
                setTimeout(function () { otherHouseAvatar.style.opacity = 0; }, 20 * sec);
                setTimeout(function () { MainAvatar.style.opacity = 0; }, 20 * sec);
            }
            break
        case "Chest":
            if (document.getElementById("Chest") !== null && gameState.FirstTimeTalkingToFlames === false) {
                alert("You have found an apple!");
                document.getElementById("Chest").remove();
                changeInventory('Apple', 'add');
                gameState.ChestOpened = true;
                SaveToBrowser(gameState);
            }
            break
        case "Key1":
            if (document.getElementById("Key1") !== null) {
                console.log('Found key!');
                document.getElementById("Key1").remove();
                changeInventory('Key', 'add');
                gameState.KeyPickedUp = true;
                SaveToBrowser(gameState);
            }
            break;

        case "Sign":
            console.log("Read Sign;");

            setTimeout(function () { otherLetterClose.style.opacity = 1; });
            setTimeout(function () { MainAvatar.style.opacity = 1; });
            setTimeout(function () { changeInventory('Letter', 'add'); }, 1 * sec);
            ShowMessage(MainCharacterSpeech, "Hey a letter, I wonder what's inside it");
            setTimeout(ShowMessage, 4 * sec, OtherCharacterSpeech, "(Opens Letter..)");
            setTimeout(function () { otherLetterClose.style.opacity = 0; }, 6 * sec);
            setTimeout(function () { otherLetterOpen.style.opacity = 1; }, 6 * sec);
            setTimeout(ShowMessage, 8 * sec, MainCharacterSpeech, "Lets see what we have here....");
            setTimeout(ShowMessage, 12 * sec, OtherCharacterSpeech, "A long time ago there was a key");
            setTimeout(ShowMessage, 17 * sec, OtherCharacterSpeech, "And you should find it");
            setTimeout(ShowMessage, 22 * sec, OtherCharacterSpeech, "Now go... go... gooo...");
            setTimeout(ShowMessage, 27 * sec, MainCharacterSpeech, "I think I needs to find a key..");
            setTimeout(function () { otherLetterOpen.style.opacity = 0; }, 31 * sec);
            setTimeout(function () { MainAvatar.style.opacity = 0; }, 31 * sec);

            Sign.style.opacity = 0;
            setTimeout(function () { document.getElementById("Sign").remove() }, 1 * sec);
            //Door1.style.opacity = 0;
            break;

        case "Statue":
            console.log("Talk to Statue;");
            setTimeout(function () { otherAvatar.style.opacity = 1; });
            setTimeout(function () { MainAvatar.style.opacity = 1; });

            if (document.getElementById("inventory-Apple") === null && gameState.KeyPickedUp === false) {
                ShowMessage(MainCharacterSpeech, "How funny, 3 flames with eyes..");
                setTimeout(ShowMessage, 4 * sec, OtherCharacterSpeech, "We can can hear you Dum Dum");
                setTimeout(ShowMessage, 8 * sec, MainCharacterSpeech, "Woah guys, no need to be so mean");
                setTimeout(ShowMessage, 12 * sec, OtherCharacterSpeech, "If you are willing to do a thing for us");
                setTimeout(ShowMessage, 17 * sec, OtherCharacterSpeech, "We can give you this key");
                setTimeout(function () { otherKeyAvatar.style.opacity = 1; }, 16 * sec);
                setTimeout(ShowMessage, 22 * sec, OtherCharacterSpeech, "and you can enter the building with the lock");
                setTimeout(function () { otherKeyAvatar.style.opacity = 0; }, 22 * sec);
                setTimeout(ShowMessage, 27 * sec, OtherCharacterSpeech, "Give us something to eat and the key is yours!");

                setTimeout(function () { gameState.FirstTimeTalkingToFlames = false }, 31 * sec);
                setTimeout(function () { otherAvatar.style.opacity = 0; }, 31 * sec);
                setTimeout(function () { MainAvatar.style.opacity = 0; }, 31 * sec);
            } else {
                if (gameState.KeyPickedUp === false) {
                    ShowMessage(MainCharacterSpeech, "I have found an apple, is this good enough for you?");
                    setTimeout(ShowMessage, 4 * sec, OtherCharacterSpeech, "hmmm... let us discuss for a moment");
                    setTimeout(ShowMessage, 8 * sec, MainCharacterSpeech, "sure, take your time");
                    setTimeout(ShowMessage, 12 * sec, OtherCharacterSpeech, "We have come to an agreement");
                    setTimeout(ShowMessage, 17 * sec, OtherCharacterSpeech, "We accept your offering, here is the key");
                    setTimeout(function () { otherKeyAvatar.style.opacity = 1; }, 16 * sec);
                    // if (document.getElementById("Key1") !== null) {
                    // console.log('Found key!');
                    // setTimeout(function () { document.getElementById("Key1").remove(); }, 18 * sec);
                    setTimeout(function () { changeInventory('Key', 'add'); }, 18 * sec);
                    setTimeout(gameState.KeyPickedUp = true, 18 * sec);
                    //   gameState.KeyPickedUp = true;
                    //  SaveToBrowser(gameState);
                    // }
                    setTimeout(function () { otherKeyAvatar.style.opacity = 0; }, 22 * sec);
                    setTimeout(ShowMessage, 22 * sec, MainCharacterSpeech, "Thanks guys!");
                    setTimeout(ShowMessage, 27 * sec, MainCharacterSpeech, "Here is your apple!");
                    setTimeout(function () { appleSide.style.opacity = 1; }, 28 * sec);

                    setTimeout(function () { changeInventory('Apple', 'delete'); }, 29 * sec);
                    setTimeout(ShowMessage, 31 * sec, OtherCharacterSpeech, "nam nam nam nam!");
                    setTimeout(function () { appleSide.style.opacity = 0; }, 31 * sec);
                    setTimeout(function () { appleFront.style.opacity = 1; }, 31 * sec);
                    setTimeout(function () { appleFront.style.opacity = 0; }, 35 * sec);
                    setTimeout(function () { otherAvatar.style.opacity = 0; }, 35 * sec);
                    setTimeout(function () { MainAvatar.style.opacity = 0; }, 35 * sec);
                } else {
                    ShowMessage(MainCharacterSpeech, "How is the apple?");
                    setTimeout(ShowMessage, 4 * sec, OtherCharacterSpeech, "we like it! (nam nam nam)");
                    setTimeout(ShowMessage, 8 * sec, MainCharacterSpeech, "Good to hear!");
                    setTimeout(ShowMessage, 12 * sec, OtherCharacterSpeech, "(More NAM NAM NAM)");
                    setTimeout(function () { otherAvatar.style.opacity = 0; }, 16 * sec);
                    setTimeout(function () { MainAvatar.style.opacity = 0; }, 16 * sec);
                }

            }

            break;

        default:
            MainCharacter.style.background.opacity = 0;
            // Door1.style.opacity = 1;
            //Sign.style.opacity = 1;
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
