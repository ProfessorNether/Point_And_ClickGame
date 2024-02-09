alert('Deze pagina heeft toegang tot uw huidige locatie & zoekgeschiedenis');
document.getElementById("MainTitle").innerText = "Point & Click Game";
//Game window ref
const GameWindow = document.getElementById("container");

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
            console.log("Open Door Bitch;");
            Door1.style.opacity = 0.2;
            Sign.style.opacity = 1;
            break;
        case "Sign":
            console.log("Read Sign Bitch;");
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