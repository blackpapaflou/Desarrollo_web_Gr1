// ELEMENTOS


const welcomeText = document.querySelector(".welcome-text");
const name = document.getElementById("welcome-name");
const description = document.querySelector(".welcome-description");
const loader = document.querySelector(".loader");



// SCROLL


window.addEventListener("scroll", () => {

    const scroll = window.scrollY;


    
    // BIENVENIDO
   

    let welcomeOpacity = 1 - scroll / 150;

    welcomeOpacity = Math.max(0, welcomeOpacity);

    welcomeText.style.opacity = welcomeOpacity;


    // NOMBRE
   

    let scale = 1 + scroll / 250;

    let nameOpacity = 1 - scroll / 450;

    nameOpacity = Math.max(0, nameOpacity);

    name.style.transform = `scale(${scale})`;

    name.style.opacity = nameOpacity;


  
    // PORTAFOLIO PERSONAL
   

    let descriptionOpacity = 1 - scroll / 180;

    descriptionOpacity = Math.max(0, descriptionOpacity);

    description.style.opacity = descriptionOpacity;


  
    // LOADER
    

    let loaderOpacity = 1 - scroll / 100;

    loaderOpacity = Math.max(0, loaderOpacity);

    loader.style.opacity = loaderOpacity;

});