/* 
   PORTAFOLIO  Emanuel Rangel
   Este archivo tiene 4 partes:
   1) Efecto de scroll de la bienvenida (el tuyo, sin cambios)
   2) Barra de progreso
   3) Animacion de elementos al aparecer
   4) Interruptor de tema claro / oscuro
*/


/*  1) BIENVENIDA: se desvanece y crece al hacer scroll*/

const welcomeText = document.querySelector(".welcome-text");
const name = document.getElementById("welcome-name");
const description = document.querySelector(".welcome-description");
const loader = document.querySelector(".loader");

// 2) La barra de progreso también se actualiza dentro del mismo evento
const progreso = document.getElementById("progreso");

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


    /* ------------------------------------------------------
       2) BARRA DE PROGRESO
       Porcentaje = lo que has bajado / lo que se puede bajar.
       Va de 0 (arriba) a 1 (abajo) y se usa como scaleX.
       ------------------------------------------------------ */

    const maximo = document.documentElement.scrollHeight - window.innerHeight;

    const porcentaje = maximo > 0 ? scroll / maximo : 0;

    progreso.style.transform = `scaleX(${porcentaje})`;

});


/* ----------------------------------------------------------
   3) ANIMACIÓN AL APARECER
   IntersectionObserver avisa cuando un elemento entra en la
   pantalla. En ese momento le ponemos la clase "in" y el CSS
   hace el resto (ver "ANIMACIÓN AL APARECER" en style.css).
   ---------------------------------------------------------- */

const elementosAnimados = document.querySelectorAll("[data-anim]");

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {

            entrada.target.classList.add("in");

            // ya apareció: dejamos de vigilarlo (solo anima una vez)
            observador.unobserve(entrada.target);
        }

    });

}, { threshold: 0.2 }); // 0.2 = cuando se ve el 20% del elemento

elementosAnimados.forEach((el) => observador.observe(el));


/* ----------------------------------------------------------
   4) INTERRUPTOR DE TEMA CLARO / OSCURO
   (El tema inicial ya lo eligió el mini script del <head>.)
   Al hacer clic:
   - cambiamos data-tema en <html> entre "claro" y "oscuro";
   - el CSS redefine las variables de color según ese valor;
   - guardamos la elección en localStorage para recordarla.
   ---------------------------------------------------------- */

const interruptor = document.getElementById("tema-switch");

function temaActual() {
    return document.documentElement.getAttribute("data-tema");
}

// aria-checked = true cuando el tema oscuro está activo (para lectores de pantalla)
function marcarInterruptor() {
    interruptor.setAttribute("aria-checked", String(temaActual() === "oscuro"));
}

marcarInterruptor();

interruptor.addEventListener("click", () => {

    const nuevo = temaActual() === "oscuro" ? "claro" : "oscuro";

    document.documentElement.setAttribute("data-tema", nuevo);

    marcarInterruptor();

    try {
        localStorage.setItem("tema", nuevo);
    } catch (e) {
        // si el navegador no deja guardar, no pasa nada
    }

});
