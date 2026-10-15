/* ==========================================================
   PORTAFOLIO — Emanuel Rangel  ·  v7 (scroll horizontal)
   Este archivo tiene 7 partes:
   1) Separar el nombre en letras
   2) Scroll hacia el lado: la rueda del mouse mueve la página horizontalmente
   3) Lo que pasa al hacer scroll (portada, barra de progreso, sección activa)
   4) Barra lateral: navegar y abrir / cerrar
   5) Animación de elementos al aparecer (+ números que cuentan + mapa de actividad)
   6) Interruptor de tema claro / oscuro
   7) Botones pequeños (copiar correo, volver al inicio)
   ========================================================== */


/* ----------------------------------------------------------
   1) SEPARAR EL NOMBRE EN LETRAS
   Para animar cada letra por separado, cada una necesita ser
   su propio elemento. Recorremos "Emanuel" y "Rangel" y creamos
   un <span class="letra"> por cada letra.
   A cada letra le damos un número (variable CSS):
     --k = posición en todo el nombre  (sirve para el retraso de entrada)
   ---------------------------------------------------------- */

export function inicializarPortafolio() {
const controller = new AbortController();
const letras = [];
let k = 0;

document.querySelectorAll("[data-letras]").forEach((linea) => {

    const texto = linea.textContent.trim();

    linea.textContent = "";

    [...texto].forEach((caracter) => {

        const letra = document.createElement("span");

        letra.className = "letra";
        letra.textContent = caracter;
        letra.style.setProperty("--k", k);
        letra.setAttribute("aria-hidden", "true"); // el h1 ya tiene aria-label

        linea.appendChild(letra);
        letras.push(letra);

        k++;
    });

});


/* ----------------------------------------------------------
   2) SCROLL HACIA EL LADO
   La página es una fila larga (.pista). El mouse, por defecto, solo
   sabe bajar y subir (deltaY). Aquí tomamos ese movimiento y lo
   convertimos en movimiento horizontal: pista.scrollBy({ left: ... }).
   ---------------------------------------------------------- */

const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// .pista es la fila que se desplaza (tiene overflow-x: auto)
const pista = document.getElementById("pista");

window.addEventListener("wheel", (e) => {

    if (e.ctrlKey) return;                                   // zoom del navegador: no tocar
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;     // ya viene de lado (trackpad): el navegador lo maneja

    // Si el panel tiene su propio scroll hacia abajo (pantalla baja) y todavía puede moverse, lo dejamos.
    const panel = e.target.closest ? e.target.closest(".panel") : null;

    if (panel && panel.scrollHeight > panel.clientHeight + 1) {
        const puedeSubir = e.deltaY < 0 && panel.scrollTop > 0;
        const puedeBajar = e.deltaY > 0 && panel.scrollTop + panel.clientHeight < panel.scrollHeight - 1;
        if (puedeSubir || puedeBajar) return;
    }

    e.preventDefault();

    const factor = e.deltaMode === 1 ? 32 : 1;               // algunos navegadores miden en "líneas"

    pista.scrollBy({ left: e.deltaY * factor, behavior: "auto" });

}, { passive: false, signal: controller.signal });


// Ir a una sección con animación suave
const secciones = [...document.querySelectorAll("[data-seccion]")];

function irA(id) {
    const destino = document.getElementById(id);
    if (!destino) return;

    pista.scrollTo({
        left: id === "inicio" ? 0 : destino.offsetLeft,
        behavior: reducirMovimiento ? "auto" : "smooth"
    });
}

// Teclado: flechas y re pág / av pág saltan de sección en sección
window.addEventListener("keydown", (e) => {

    if (["INPUT", "TEXTAREA", "BUTTON", "A"].includes(document.activeElement.tagName) && e.key === " ") return;

    const siguiente = ["ArrowRight", "ArrowDown", "PageDown"].includes(e.key);
    const anterior = ["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key);

    if (!siguiente && !anterior) return;

    e.preventDefault();

    const actual = secciones.indexOf(seccionActual());
    const indice = Math.min(Math.max(actual + (siguiente ? 1 : -1), 0), secciones.length - 1);

    irA(secciones[indice].id);
}, { signal: controller.signal });


/* ----------------------------------------------------------
   3) LO QUE PASA AL HACER SCROLL
   Igual que en las versiones anteriores, pero ahora "scroll" es
   cuánto te has movido hacia la derecha (pista.scrollLeft).
   ---------------------------------------------------------- */

const welcomeContent = document.getElementById("welcome-content");
const welcomeText = document.querySelector(".welcome-text");
const name = document.getElementById("welcome-name");
const description = document.querySelector(".welcome-description");
const tarjetas = document.querySelectorAll(".w-card, .w-sello");
const loader = document.querySelector(".loader");

const portada = document.getElementById("portada");
const arte = document.getElementById("portada-arte");
const progreso = document.getElementById("progreso");
const campoSeccion = document.getElementById("campo-seccion");
const itemsMenu = document.querySelectorAll(".sb-item[data-ir]");

// la sección que está en el centro de la pantalla
function seccionActual() {
    const mitad = document.documentElement.clientWidth * 0.5;
    let actual = secciones[0];

    secciones.forEach((s) => {
        if (s.getBoundingClientRect().left <= mitad) actual = s;
    });

    return actual;
}

let ultimaSeccion = null;

function alHacerScroll() {

    const scroll = pista.scrollLeft;


    // BIENVENIDO

    let welcomeOpacity = 1 - scroll / 150;

    welcomeOpacity = Math.max(0, welcomeOpacity);

    welcomeText.style.opacity = welcomeOpacity;


    // NOMBRE (se agranda y se desvanece, igual que la base original)

    let scale = 1 + scroll / 250;

    let nameOpacity = 1 - scroll / 450;

    nameOpacity = Math.max(0, nameOpacity);

    name.style.transform = `scale(${scale})`;

    name.style.opacity = nameOpacity;


    // LETRAS: cada una empieza a irse un poquito después que la anterior.
    // q va de 0 (la letra está quieta) a 1 (la letra ya se fue).
    letras.forEach((letra, indice) => {

        const q = Math.min(Math.max((scroll - indice * 14) / 200, 0), 1);

        if (!reducirMovimiento) {
            const giro = (indice % 2 === 0 ? -1 : 1) * q * 12;   // izquierda/derecha alternando
            letra.style.transform = `translateX(${-q * 80}px) rotate(${giro}deg)`;
        }

        letra.style.opacity = 1 - q;
    });


    // DESCRIPCIÓN y TARJETAS

    let descriptionOpacity = 1 - scroll / 180;

    descriptionOpacity = Math.max(0, descriptionOpacity);

    description.style.opacity = descriptionOpacity;

    tarjetas.forEach((t) => { t.style.opacity = descriptionOpacity; });


    // INDICADOR "DESLIZA"

    let loaderOpacity = 1 - scroll / 100;

    loaderOpacity = Math.max(0, loaderOpacity);

    loader.style.opacity = loaderOpacity;


    // MARCO CON EL PAISAJE: se desvanece y se encoge un poco mientras avanzas.
    // p va de 0 (arriba del todo) a 1 (cuando ya avanzaste el 60% del ancho de la pantalla).
    const p = Math.min(scroll / (document.documentElement.clientWidth * 0.6), 1);

    portada.style.opacity = 1 - p;

    portada.style.transform = `scale(${1 - p * 0.08})`;

    // el paisaje se mueve más lento que la página: da sensación de profundidad
    arte.style.transform = `translateX(${-scroll * 0.08}px) scale(1.2)`;

    // cuando ya no se ve, lo ocultamos para que no tape los clics de las tarjetas de abajo
    welcomeContent.classList.toggle("oculta", scroll > 260);


    /* BARRA DE PROGRESO
       Porcentaje = lo que has avanzado / lo que se puede avanzar.
       Va de 0 (inicio) a 1 (final) y se usa como scaleX. */

    const maximo = pista.scrollWidth - pista.clientWidth;

    const porcentaje = maximo > 0 ? scroll / maximo : 0;

    progreso.style.transform = `scaleX(${porcentaje})`;


    // SECCIÓN ACTIVA: marca el item del menú y el nombre en la barra de arriba
    const actual = seccionActual();

    if (actual !== ultimaSeccion) {

        ultimaSeccion = actual;

        campoSeccion.textContent = actual.dataset.nombre;

        itemsMenu.forEach((item) => {
            // el item "Disponible" de abajo apunta a Contacto, pero no debe marcarse como activo
            const marcado = item.dataset.ir === actual.id && !item.classList.contains("sb-estado");
            item.classList.toggle("activo", marcado);
        });
    }

}

pista.addEventListener("scroll", alHacerScroll, { passive: true, signal: controller.signal });
window.addEventListener("resize", alHacerScroll, { signal: controller.signal });

alHacerScroll(); // una vez al cargar, por si la página se abre ya a mitad de scroll


/* ----------------------------------------------------------
   4) BARRA LATERAL
   - Cada enlace con data-ir lleva a su sección con scroll suave.
   - El botón de la flecha cambia data-abierta (el CSS hace el resto).
   ---------------------------------------------------------- */

document.querySelectorAll("[data-ir]").forEach((enlace) => {

    enlace.addEventListener("click", (e) => {
        e.preventDefault();
        irA(enlace.dataset.ir);
    }, { signal: controller.signal });
});

const sidebar = document.getElementById("sidebar");
const botonSidebar = document.getElementById("sb-toggle");

botonSidebar.addEventListener("click", () => {

    const abierta = sidebar.dataset.abierta !== "true";

    sidebar.dataset.abierta = String(abierta);
    botonSidebar.setAttribute("aria-expanded", String(abierta));

}, { signal: controller.signal });


/* ----------------------------------------------------------
   5) ANIMACIÓN AL APARECER
   IntersectionObserver avisa cuando un elemento entra en la
   pantalla. En ese momento le ponemos la clase "in" y el CSS
   hace el resto (ver "ANIMACIONES AL APARECER" en style.css).
   Además: los números con data-contar cuentan desde 0.
   ---------------------------------------------------------- */

// Mapa de actividad: 70 cuadritos con intensidad al azar (solo decorativo / de ejemplo)
const mapa = document.getElementById("mapa");

for (let n = 0; n < 70; n++) {
    const cuadro = document.createElement("i");
    cuadro.dataset.n = Math.floor(Math.random() ** 1.6 * 5);   // 0 a 4 (más ceros que cuatros)
    cuadro.style.setProperty("--d", n % 14 + Math.floor(n / 14)); // turno: entran en diagonal
    mapa.appendChild(cuadro);
}

// Cuenta de 0 hasta el valor en 1.4 segundos
function contar(el) {

    const meta = Number(el.dataset.contar);
    const sufijo = el.dataset.sufijo || "";
    const duracion = 1400;
    const inicio = performance.now();

    function paso(ahora) {
        const t = Math.min((ahora - inicio) / duracion, 1);
        const suave = 1 - Math.pow(1 - t, 3);               // empieza rápido y frena al final
        el.textContent = Math.round(meta * suave) + sufijo;
        if (t < 1) requestAnimationFrame(paso);
    }

    requestAnimationFrame(paso);
}

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {

            entrada.target.classList.add("in");

            entrada.target.querySelectorAll("[data-contar]").forEach(contar);

            // ya apareció: dejamos de vigilarlo (solo anima una vez)
            observador.unobserve(entrada.target);
        }

    });

}, { threshold: 0.2 }); // 0.2 = cuando se ve el 20% del elemento

document.querySelectorAll("[data-anim]").forEach((el) => observador.observe(el));


/* ----------------------------------------------------------
   6) INTERRUPTOR DE TEMA CLARO / OSCURO
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

}, { signal: controller.signal });


/* ----------------------------------------------------------
   7) BOTONES PEQUEÑOS
   ---------------------------------------------------------- */

// Copiar el correo al portapapeles
const botonCopiar = document.getElementById("copiar");
const textoCopiar = document.getElementById("copiar-texto");
const correo = document.getElementById("correo");

let copiarTimer;
botonCopiar.addEventListener("click", async () => {

    const direccion = correo.dataset.email;

    try {
        await navigator.clipboard.writeText(direccion);
        textoCopiar.textContent = "¡Copiado!";
    } catch (e) {
        textoCopiar.textContent = direccion;   // si el navegador no deja copiar, al menos lo mostramos
    }

    clearTimeout(copiarTimer);
    copiarTimer = setTimeout(() => { textoCopiar.textContent = "Copiar correo"; }, 1800);

}, { signal: controller.signal });

// Volver al inicio
document.getElementById("volver").addEventListener("click", () => irA("inicio"), { signal: controller.signal });

return () => {
    controller.abort();
    observador.disconnect();
    clearTimeout(copiarTimer);
    mapa.replaceChildren();
};
}
