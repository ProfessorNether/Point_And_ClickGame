alert('Deze pagina heeft toegang tot uw huidige locatie & zoekgeschiedenis');
document.getElementById("MainTitle").innerText = "Point & Click Game";
//Game window ref
const GameWindow = document.getElementById("container");

//inventory
const inventoryList = document.getElementById("InventoryList");

const MainCharacterSpeech = document.getElementById("MainCharacterSpeech");
const OtherCharacterSpeech = document.getElementById("OtherCharacterSpeech");
const otherAvatar = document.getElementById("RightChar");

const sec = 1000;


//game state
gameState = {
    "door2locked": true
}

//main moveable char ref
const MainCharacter = document.getElementById("MainCharacter");
const OffssetCharacter = 40;

//what to do if user clicks
GameWindow.onclick = function (e) {
    var rect = GameWindow.getBoundingClientRect();
    var X = e.clientX - rect.left
    var Y = e.clientY - rect.top

    console.log(e.target.id);
    MainCharacter.style.left = X - OffssetCharacter + "px";
    MainCharacter.style.top = Y - OffssetCharacter + "px";

    switch (e.target.id) {
        case "Door1":
            if (gameState.door2locked == true) {
                console.log("Open Door;");
                Door1.style.opacity = 0.2;
                Sign.style.opacity = 1;
                //check for key
                if (document.getElementById("inventory_Key") !== null) {
                    gameState.door2locked = false;
                    alert("Door unlocked");
                } else {
                    alert("Door is locked!");
                }
                //no = message saying needs key 
            } else {
                console.log("entering building")
                alert("Entering Building");
            }
            break;
        case "Key1":
            if (document.getElementById("Key1") !== null) {
                console.log("you found key")
                document.getElementById("Key1").remove();
                const keyElement = document.createElement("li");
                keyElement.id = "inventory_Key";
                keyElement.innerText = "Key";
                inventoryList.appendChild(keyElement);
            }
            break;
        case "Sign":
            console.log("Read Sign;");
            Sign.style.opacity = 0.2;
            Door1.style.opacity = 1;
            break;
        case "Statue":
            console.log("Talk to Statue;");
            setTimeout(function () { otherAvatar.style.opacity = 1; }), 4 * sec;
            ShowMessage(MainCharacterSpeech, "Wow cool statue...");
            setTimeout(ShowMessage, 4 * sec, OtherCharacterSpeech, "I can can speak dummy");
            setTimeout(ShowMessage, 8 * sec, MainCharacterSpeech, "You should check the north house");
            setTimeout(function () { otherAvatar.style.opacity = 0; }), 12 * sec;
            break;

        default:
            MainCharacter.style.background.opacity = 0;
            Door1.style.opacity = 1;
            Sign.style.opacity = 1;
            //do something
            break;
    }

    /**
    * @param {getElementById} targetBalloon
    * @param {string} message
    */
    function ShowMessage(targetBalloon, message) {
        targetBalloon.style.opacity = "1";
        setTimeout(HideMessage, 2 * sec);
    }
    // ShowMessage("MainCharacterSpeech");
    // ShowMessage("OtherCharacterSpeech");
    setTimeout(ShowMessage, 1 * sec, OtherCharacterSpeech);
    setTimeout(ShowMessage, 2 * sec, MainCharacterSpeech);

    /**
    * @param {string} targetBalloon
    */
    function HideMessage(targetBalloon) {
        document.getElementById(targetBalloon).style.opacity = "0";
    }
}