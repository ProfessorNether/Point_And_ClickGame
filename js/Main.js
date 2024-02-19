alert('Deze pagina heeft toegang tot uw huidige locatie & zoekgeschiedenis');
document.getElementById("MainTitle").innerText = "Point & Click Game";
//Game window ref
const GameWindow = document.getElementById("container");

//inventory
const inventoryList = document.getElementById("InventoryList");

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

        default:
            MainCharacter.style.background.opacity = 0;
            Door1.style.opacity = 1;
            Sign.style.opacity = 1;
            //do something
            break;
    }
}