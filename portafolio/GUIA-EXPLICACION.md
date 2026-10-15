# Guía para explicar el portafolio en React (v7)

## La idea en una frase

> "El portafolio usa **React + Vite**: `src/App.jsx` contiene la interfaz, `style.css` el diseño y `script.js` inicializa las interacciones que dependen del DOM."

## Cómo iniciar el proyecto

Instala Node.js y, desde la carpeta del proyecto, ejecuta:

```bash
npm install
npm run dev
```

Vite mostrará la dirección local para abrir el portafolio. Para generar la versión de producción usa `npm run build`; los archivos listos quedan en `dist/`.

## Archivos principales

| Archivo | Función |
|---|---|
| `index.html` | Documento base que carga React y Vite. |
| `src/main.jsx` | Crea el punto de montaje de React e importa los estilos. |
| `src/App.jsx` | Renderiza la interfaz del portafolio. |
| `style.css` | Define colores, distribución y animaciones. |
| `script.js` | Conecta las interacciones del portafolio y libera sus listeners al desmontarse. |

## Qué cambió en esta versión

| Pedido | Cómo se resolvió |
|---|---|
| Portada como la imagen 3 | Marco redondeado con un paisaje (dibujado en SVG), nombre gigante, tarjetas de vidrio y botón circular |
| Resto como imágenes 1 y 2 | Tarjetas de cristal en cuadrícula (bento), gráfica de olas, anillos, barras, interruptores |
| Menú como imágenes 4 y 5 | Barra vertical: cerrada solo iconos, abierta iconos + texto; raya brillante en la sección activa |
| Colores de la última imagen | Solo 5 colores (`--c1` a `--c5`); todo lo demás son mezclas transparentes de esos |
| Scroll hacia el lado | La rueda del mouse mueve la página horizontalmente |
| Se conserva | La animación de scroll de la portada y las letras que se mueven al aparecer y desaparecer |

## La paleta (5 colores)

| Variable | Color | Uso |
|---|---|---|
| `--c1` | `#021024` | Fondo oscuro, tinta |
| `--c2` | `#052659` | Tarjetas azules, botones en tema claro |
| `--c3` | `#5483B3` | Acentos, tarjeta destacada |
| `--c4` | `#7DA0CA` | Texto secundario, brillos |
| `--c5` | `#C1E8FF` | Texto en tema oscuro, fondo en tema claro |

Están al inicio de `style.css` (sección 1). Si cambias uno, cambia todo el portafolio.

## El scroll hacia el lado (lo más importante de explicar)

1. En `src/App.jsx`, todos los paneles están dentro de `<main className="pista">`.
2. En el CSS, `.pista` es una fila (`display: flex`) con `overflow-x: auto`: se desplaza hacia el lado. Cada `.panel` mide `100vw` (justo una pantalla).
3. El mouse normalmente solo sabe "subir y bajar" (`deltaY`). En `script.js` (parte 2) escuchamos la rueda (`wheel`), cancelamos el movimiento vertical y lo convertimos en horizontal con `pista.scrollBy({ left: e.deltaY })`.
4. Además: las flechas del teclado saltan de sección en sección y el menú lleva a cada una con `scrollTo` suave.
5. En el celular no hace falta nada de esto: se desliza con el dedo hacia el lado y cada panel "se pega" a la pantalla (`scroll-snap`).

## La portada

Dos capas fijas que no se mueven mientras haces scroll:

1. **El marco con el paisaje** (`.portada`): esquinas redondeadas, un SVG de montañas, nieve y una casa de vidrio. No hay personas. Si quieres tu propia foto, guárdala junto a `style.css` como `portada.jpg` y en `style.css` cambia `--foto: none;` por `--foto: url("portada.jpg");`.
2. **El texto y las tarjetas** (`.welcome-content`): "Bienvenido", el nombre, la descripción, la tarjeta "Mi stack", el sello "ER" y el proyecto destacado.

### La animación base que se conserva

Igual que en tu versión original, en `script.js` (parte 3): mientras avanzas, el nombre **se agranda y se desvanece**, y lo demás se desvanece a distinto ritmo. La fórmula es siempre `1 - scroll / número` (cuanto más avanzas, menos opacidad). Lo único que cambia es que ahora `scroll` es lo que te moviste hacia la derecha (`pista.scrollLeft`) y no hacia abajo.

### Las letras con movimiento

- **Preparación (JS):** `script.js` recorre "Emanuel" y "Rangel" y crea un `<span class="letra">` por cada letra, con un número `--k` (su posición en el nombre).
- **Al aparecer (CSS):** `@keyframes letra-entra` hace que cada letra suba y gire un poco. El retraso es `calc(0.25s + var(--k) * 70ms)`: cada letra entra 70 ms después de la anterior.
- **Al desaparecer (JS):** al avanzar, cada letra se va un poquito después que la anterior: se mueve hacia la izquierda hasta 80 px, gira hasta 12° (alternando lado) y se vuelve transparente.

## La barra lateral

- Es un `<aside>` fijo a la izquierda. El atributo `data-abierta="true"` o `"false"` decide si está abierta.
- El botón de la flecha solo cambia ese atributo; el CSS hace el resto con `transition` (el ancho pasa de 68 px a 244 px con una curva de "rebote").
- La raya brillante de la sección activa se calcula en `script.js`: en cada scroll busca qué panel está en el centro de la pantalla y le pone la clase `activo` a su botón.
- En celular se convierte en una barra de iconos abajo.

## Barra superior (estilo imagen 2)

Una "píldora" de cristal con tu saludo, la sección actual (cambia sola), tu stack, tu estado y el interruptor de tema. La línea fina de abajo es la **barra de progreso**: `scaleX(avanzado / total)`.

## Tarjetas de cristal

Todas usan la clase `.vidrio`: fondo semitransparente + `backdrop-filter: blur()` (desenfoca lo que hay detrás) + borde y brillo suave. La cuadrícula (`.bento`) tiene 12 columnas y cada tarjeta dice cuántas ocupa: `style="--c:4"` (4 columnas), `style="--r:2"` (2 filas).

## Animaciones por sección

| Parte | Qué se ve | Cómo se hace | Dónde |
|---|---|---|---|
| Aparecer al avanzar | Cada tarjeta entra desde la derecha, abajo o con zoom | `IntersectionObserver` agrega la clase `in`; el CSS reproduce un `@keyframes` | `[data-anim]`, `script.js` parte 5 |
| Sobre mí | Aro de colores que gira; con el mouse gira más rápido | `conic-gradient` + `@keyframes girar` | `.avatar` |
| Sobre mí | Interruptores tipo iOS | `<input type="checkbox">` + `:checked` + `transition` | `.toggle` |
| Habilidades | La gráfica se "dibuja" sola | `stroke-dasharray` y `stroke-dashoffset` con `transition` | `.ola-*` |
| Habilidades | Anillos que se llenan y números que cuentan | `stroke-dashoffset` + función `contar()` en JS | `.anillo` |
| Habilidades | Barras con bolita al final | `width` de 0 al valor, con rebote | `.barra-relleno` |
| Proyectos | Tarjetas que se levantan; mapa de actividad que se llena en diagonal | `transition` + retraso `--d` por cuadro | `.proyecto`, `.mapa` |
| Educación | Línea que crece y puntos que laten; metas con casillas | `scaleY` + `@keyframes latido-punto`; `:checked` | `.timeline`, `.checks` |
| Contacto | Botón con ondas; iconos que se inclinan; copiar correo | `@keyframes pulso`; `transition`; `navigator.clipboard` | `.pulso`, `.app`, `#copiar` |

## Tema claro / oscuro

- El `<head>` pone `data-tema="claro"` u `"oscuro"` en `<html>` antes de dibujar (así no parpadea).
- El CSS tiene dos bloques de variables con los mismos nombres y valores distintos; JavaScript solo cambia ese atributo y lo guarda en `localStorage`.
- El claro **no es blanco**: usa los azules claros de la paleta (`#C1E8FF` y `#7DA0CA`).

## Demostración en vivo (1 minuto)

1. Recarga la página: las letras entran una por una.
2. Gira la rueda despacio: las letras se van una tras otra y el paisaje se desvanece (explica `1 - scroll / número`).
3. Abre la barra lateral con la flecha y navega a Proyectos. Muestra que la raya brillante cambia sola.
4. Pulsa Claro / Oscuro. Abre F12 y muestra cómo cambia `data-tema` en `<html>`.
5. En F12, cambia `--c3` en `:root` por otro color: todo el portafolio cambia al instante.

## Posibles preguntas del profesor

- **¿Por qué el scroll va hacia el lado?** La página es una fila de paneles; JavaScript convierte la rueda del mouse (vertical) en movimiento horizontal. En celular es nativo.
- **¿Por qué no usaste una librería de animación?** CSS ya trae lo necesario y el código queda corto y entendible.
- **¿Por qué `IntersectionObserver` y no escuchar el scroll?** El navegador avisa solo cuando algo aparece; escuchar el scroll en cada píxel es más pesado.
- **¿Cómo animaste cada letra?** JavaScript separa el nombre en letras y CSS les da un retraso distinto según su posición.
- **¿Qué es `backdrop-filter`?** Desenfoca lo que hay detrás de un elemento semitransparente: es el efecto "vidrio".
- **¿Funciona en celular?** Sí: la barra lateral pasa abajo, los paneles se pegan a la pantalla y las tarjetas se apilan.
- **¿Qué falta?** Reemplazar los textos y números de ejemplo (sobre mí, proyectos, niveles de las habilidades, institución, correo, enlaces) con tus datos reales.

## Qué editar con tus datos

| Qué | Dónde |
|---|---|
| Párrafo "Sobre mí", ciudad | `src/App.jsx`, panel `#sobre-mi` |
| Niveles (80%, 75%…) | `src/App.jsx`: `style={{ "--v": ".8" }}` y `data-contar="80"` (cambia los dos) |
| Proyectos | `src/App.jsx`, panel `#proyectos` |
| Institución, cursos, metas | `src/App.jsx`, panel `#educacion` |
| Correo y enlaces | `src/App.jsx`, panel `#contacto` (y el `href` de "Correo") |
| Tu CV | Guarda `cv.pdf` en la carpeta del proyecto y cambia `href="#"` por `href="/cv.pdf"` |
