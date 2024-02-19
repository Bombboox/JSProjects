//Menu
const content = document.getElementById('content'); 

//Buttons
const find = document.getElementById('find');
const back = document.getElementById('back');

function main() {
    switchScene('main-menu');
}

content.addEventListener('click', (e) => {
    console.log(e.target.id);
    switch(e.target.id) {
        case "find":
            switchScene('find-match');
            break;
        
        case "back":
            switchScene('main-menu');
            break;
    }
});

function switchScene(sceneName) {
    const scenes = document.querySelectorAll('.scene');
    scenes.forEach(scene => {
        if (scene.id === sceneName) {
            scene.style.display = 'block'; // Show the selected scene
        } else {
            scene.style.display = 'none'; // Hide other scenes
        }
    });
}
  
window.onload = main;