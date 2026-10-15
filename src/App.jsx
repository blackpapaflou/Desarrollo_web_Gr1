import React, { useEffect } from "react";
import { inicializarPortafolio } from "../script.js";

export default function App() {
    useEffect(() => {
        return inicializarPortafolio();
    }, []);

    return (
        <>


        {/* ICONOS: se dibujan una sola vez aquí y se reutilizan con <use href="#i-..."> */}
        <svg className="iconos" aria-hidden="true" width="0" height="0" style={{"position": "absolute"}}>
            <defs>
                <symbol id="i-home" viewBox="0 0 24 24"><path d="M3 11l9-8 9 8"></path><path d="M5 10v10h14V10"></path><path d="M10 20v-6h4v6"></path></symbol>
                <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"></path></symbol>
                <symbol id="i-code" viewBox="0 0 24 24"><path d="M8 7l-5 5 5 5"></path><path d="M16 7l5 5-5 5"></path><path d="M14 4l-4 16"></path></symbol>
                <symbol id="i-folder" viewBox="0 0 24 24"><path d="M3 6a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></symbol>
                <symbol id="i-grad" viewBox="0 0 24 24"><path d="M2 9l10-5 10 5-10 5z"></path><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5"></path><path d="M22 9v6"></path></symbol>
                <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3"></rect><path d="M3 7l9 6 9-6"></path></symbol>
                <symbol id="i-chev" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"></path></symbol>
                <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M7 17L17 7"></path><path d="M8 7h9v9"></path></symbol>
                <symbol id="i-down" viewBox="0 0 24 24"><path d="M12 4v11"></path><path d="M7 11l5 5 5-5"></path><path d="M4 20h16"></path></symbol>
                <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z"></path><circle cx="12" cy="10" r="2.5"></circle></symbol>
                <symbol id="i-copy" viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="2"></rect><path d="M5 15V6a2 2 0 0 1 2-2h9"></path></symbol>
                <symbol id="i-back" viewBox="0 0 24 24"><path d="M19 12H5"></path><path d="M11 6l-6 6 6 6"></path></symbol>
                <symbol id="i-github" viewBox="0 0 24 24"><path d="M9 19c-4 1.3-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"></path></symbol>
                <symbol id="i-linkedin" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></symbol>
                <symbol id="i-chat" viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.7 7L3 21l2-5.5A8 8 0 1 1 21 12z"></path></symbol>
                <symbol id="i-sol" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></symbol>
                <symbol id="i-luna" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path></symbol>
                <symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7"></path></symbol>
                <symbol id="i-ok" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path d="M8 12.5l3 3 5-6"></path></symbol>
            </defs>
        </svg>

        {/* FONDO: tres manchas de color borrosas que se mueven despacio detrás del vidrio */}
        <div className="fondo" aria-hidden="true"><i></i><i></i><i></i></div>


        {/* ==========================================================
             Cerrada: solo iconos. Abierta (botón de la flecha): iconos + texto.
             script.js cambia data-abierta y marca el item "activo" mientras haces scroll.
             ========================================================== */}
        <aside className="sidebar" id="sidebar" data-abierta={"false"} aria-label="Navegación principal">

            <button className="sb-toggle" id="sb-toggle" type="button" aria-expanded="false" aria-label="Abrir o cerrar el menú">
                <svg className="ic"><use href="#i-chev"></use></svg>
            </button>

            <a href="#inicio" className="sb-logo" data-ir="inicio" aria-label="Ir al inicio">
                <span className="sb-monograma">ER</span>
                <span className="sb-nombre">Portafolio</span>
            </a>

            <p className="sb-etiqueta">Menú</p>

            <nav>
                <ul className="sb-lista">
                    <li><a className="sb-item" href="#inicio" data-ir="inicio"><svg className="ic"><use href="#i-home"></use></svg><span className="sb-texto">Inicio</span></a></li>
                    <li><a className="sb-item" href="#sobre-mi" data-ir="sobre-mi"><svg className="ic"><use href="#i-user"></use></svg><span className="sb-texto">Sobre mí</span></a></li>
                    <li><a className="sb-item" href="#habilidades" data-ir="habilidades"><svg className="ic"><use href="#i-code"></use></svg><span className="sb-texto">Habilidades</span></a></li>
                    <li><a className="sb-item" href="#proyectos" data-ir="proyectos"><svg className="ic"><use href="#i-folder"></use></svg><span className="sb-texto">Proyectos</span><em className="sb-badge">3</em></a></li>
                    <li><a className="sb-item" href="#educacion" data-ir="educacion"><svg className="ic"><use href="#i-grad"></use></svg><span className="sb-texto">Educación</span></a></li>
                    <li><a className="sb-item" href="#contacto" data-ir="contacto"><svg className="ic"><use href="#i-mail"></use></svg><span className="sb-texto">Contacto</span></a></li>
                </ul>
            </nav>

            <div className="sb-pie">
                <a className="sb-item sb-estado" href="#contacto" data-ir="contacto">
                    <span className="sb-sello">OK</span><span className="sb-texto">Disponible</span>
                </a>
                {/* pon aquí tu CV: guarda el PDF junto a index.html y cambia href="#" por href="cv.pdf" */}
                <a className="sb-item" href="#" aria-label="Descargar CV">
                    <svg className="ic"><use href="#i-down"></use></svg><span className="sb-texto">Descargar CV</span>
                </a>
            </div>
        </aside>


        {/* ==========================================================
             BARRA SUPERIOR (cristal, como la imagen 2): saludo, datos y el interruptor de tema
             La línea fina de abajo es la barra de progreso del scroll.
             ========================================================== */}
        <header className="topbar" id="topbar">
            <div className="tb-saludo">
                <span className="tb-avatar">ER</span>
                <strong>Hola, soy Emanuel</strong>
            </div>

            <div className="tb-campos">
                <div className="tb-campo"><small>Sección</small><strong id="campo-seccion">Inicio</strong></div>
                <div className="tb-campo"><small>Stack</small><strong>Python · Django</strong></div>
                <div className="tb-campo"><small>Estado</small><strong><i className="punto"></i>Disponible</strong></div>
            </div>

            {/* INTERRUPTOR CLARO / OSCURO: el "pomo" se desliza de un lado al otro */}
            <button className="tema-switch" id="tema-switch" type="button" role="switch" aria-checked="true" aria-label="Cambiar entre tema claro y oscuro">
                <span className="pomo"></span>
                <span className="op op-claro"><svg className="ic"><use href="#i-sol"></use></svg>Claro</span>
                <span className="op op-oscuro"><svg className="ic"><use href="#i-luna"></use></svg>Oscuro</span>
            </button>

            <div className="progreso" id="progreso"></div>
        </header>


        {/* ==========================================================
             PORTADA (como la imagen 3)
             Dos capas fijas: el marco con el paisaje (.portada) y el texto (.welcome-content).
             script.js las desvanece y las mueve mientras haces scroll (hacia el lado).
             ========================================================== */}
        <div className="portada" id="portada" aria-hidden="true">

            <div className="portada-arte" id="portada-arte">

                {/* PAISAJE dibujado con SVG: atardecer en las montañas con una casa de vidrio (sin personas).
                     Usa solo los 5 colores de la paleta. Si prefieres tu foto, mira --foto en style.css. */}
                <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="g-cielo" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#021024"></stop>
                            <stop offset=".22" stopColor="#052659"></stop>
                            <stop offset=".5" stopColor="#5483B3"></stop>
                            <stop offset=".76" stopColor="#7DA0CA"></stop>
                            <stop offset=".94" stopColor="#C1E8FF"></stop>
                        </linearGradient>
                        <radialGradient id="g-brillo" cx="1000" cy="640" r="620" gradientUnits={"userSpaceOnUse"}>
                            <stop offset="0" stopColor="#C1E8FF" stopOpacity=".75"></stop>
                            <stop offset="1" stopColor="#C1E8FF" stopOpacity="0"></stop>
                        </radialGradient>
                        <linearGradient id="g-casco" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0" stopColor="#C1E8FF"></stop>
                            <stop offset=".55" stopColor="#7DA0CA"></stop>
                            <stop offset="1" stopColor="#5483B3"></stop>
                        </linearGradient>
                        <linearGradient id="g-interior" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0" stopColor="#052659"></stop>
                            <stop offset=".5" stopColor="#C1E8FF"></stop>
                            <stop offset="1" stopColor="#7DA0CA"></stop>
                        </linearGradient>
                        <linearGradient id="g-nieve" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#7DA0CA"></stop>
                            <stop offset="1" stopColor="#5483B3"></stop>
                        </linearGradient>
                        <filter id="f-nube" x="-30%" y="-80%" width="160%" height="260%"><feGaussianBlur stdDeviation="16"></feGaussianBlur></filter>
                        <filter id="f-suave" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="10"></feGaussianBlur></filter>
                        <clipPath id="c-ventana-baja"><rect x="296" y="612" width="1108" height="116" rx="58"></rect></clipPath>
                        <clipPath id="c-ventana-alta"><path d="M704 604 C716 520 866 474 1060 474 C1250 474 1378 510 1420 604 Z"></path></clipPath>
                    </defs>

                    {/* cielo, resplandor y estrellas */}
                    <rect width="1600" height="900" fill="url(#g-cielo)"></rect>
                    <rect width="1600" height="900" fill="url(#g-brillo)"></rect>
                    <g fill="#C1E8FF" opacity=".7">
                        <circle cx="180" cy="80" r="1.8"></circle><circle cx="420" cy="150" r="1.4"></circle><circle cx="690" cy="60" r="1.8"></circle>
                        <circle cx="980" cy="110" r="1.4"></circle><circle cx="1290" cy="70" r="1.8"></circle><circle cx="1480" cy="170" r="1.4"></circle>
                        <circle cx="110" cy="250" r="1.4"></circle><circle cx="860" cy="230" r="1.2"></circle><circle cx="1180" cy="210" r="1.2"></circle>
                    </g>

                    {/* nubes borrosas */}
                    <g filter="url(#f-nube)">
                        <ellipse cx="360" cy="430" rx="260" ry="34" fill="#C1E8FF" opacity=".35"></ellipse>
                        <ellipse cx="1180" cy="400" rx="320" ry="30" fill="#C1E8FF" opacity=".3"></ellipse>
                        <ellipse cx="760" cy="500" rx="360" ry="26" fill="#7DA0CA" opacity=".5"></ellipse>
                        <ellipse cx="1420" cy="520" rx="220" ry="24" fill="#C1E8FF" opacity=".35"></ellipse>
                    </g>

                    {/* montañas lejanas */}
                    <path fill="#5483B3" opacity=".6" d="M0 640 L120 560 L210 610 L360 500 L470 600 L560 560 L690 650 L1210 640 L1330 560 L1450 610 L1520 570 L1600 620 L1600 800 L0 800 Z"></path>
                    <path fill="#052659" opacity=".7" d="M0 700 L90 650 L200 690 L320 620 L430 690 L520 660 L640 720 L1300 720 L1400 660 L1500 700 L1600 660 L1600 800 L0 800 Z"></path>

                    {/* nieve */}
                    <path fill="url(#g-nieve)" d="M0 748 C280 716 560 738 800 732 S1300 714 1600 738 V900 H0 Z"></path>
                    <ellipse cx="850" cy="770" rx="560" ry="24" fill="#C1E8FF" opacity=".4" filter="url(#f-suave)"></ellipse>

                    {/* CASA: volumen bajo (casco + vidrio) */}
                    <rect x="250" y="586" width="1200" height="164" rx="82" fill="url(#g-casco)"></rect>
                    <rect x="296" y="612" width="1108" height="116" rx="58" fill="url(#g-interior)"></rect>
                    <g clipPath="url(#c-ventana-baja)">
                        <g fill="#021024" opacity=".5">
                            <rect x="340" y="676" width="150" height="52" rx="14"></rect>
                            <rect x="560" y="660" width="90" height="68" rx="10"></rect>
                            <rect x="900" y="672" width="170" height="56" rx="14"></rect>
                            <rect x="1180" y="650" width="70" height="80" rx="10"></rect>
                        </g>
                        <g stroke="#021024" strokeWidth={"6"} opacity=".55">
                            <path d="M430 612V728M560 612V728M690 612V728M820 612V728M950 612V728M1080 612V728M1210 612V728M1320 612V728"></path>
                        </g>
                    </g>

                    {/* CASA: volumen alto curvo */}
                    <path d="M640 600 C640 482 822 426 1060 426 C1296 426 1470 472 1500 600 Z" fill="url(#g-casco)"></path>
                    <path d="M640 600 C640 482 822 426 1060 426 C1296 426 1470 472 1500 600" fill="none" stroke="#C1E8FF" strokeWidth={"3"} opacity=".85"></path>
                    <path d="M704 604 C716 520 866 474 1060 474 C1250 474 1378 510 1420 604 Z" fill="url(#g-interior)"></path>
                    <g clipPath="url(#c-ventana-alta)">
                        <g fill="#021024" opacity=".5">
                            <rect x="820" y="540" width="120" height="70" rx="12"></rect>
                            <rect x="1150" y="548" width="140" height="64" rx="12"></rect>
                        </g>
                        <g stroke="#021024" strokeWidth={"6"} opacity=".55">
                            <path d="M800 470V610M920 470V610M1040 470V610M1160 470V610M1280 470V610M1380 470V610"></path>
                        </g>
                    </g>

                    {/* plantas del desierto, abajo */}
                    <g fill="#021024" opacity=".55">
                        <path d="M120 800 q10 -60 22 0 q6 -40 18 0 q14 -50 20 0 Z"></path>
                        <path d="M1460 806 q10 -70 22 0 q8 -46 20 0 q14 -56 22 0 Z"></path>
                    </g>
                </svg>

                {/* tu foto (opcional): solo se ve si defines --foto en style.css */}
                <div className="portada-foto"></div>
            </div>

            {/* vignette suave para que los bordes se vean más profundos */}
            <div className="portada-velo"></div>
            {/* grano muy sutil, da textura de fotografía */}
            <div className="portada-grano"></div>
        </div>

        <div className="welcome-content" id="welcome-content">

            <p className="welcome-text">Bienvenido <span>2K26</span></p>

            {/* El nombre está en dos líneas. script.js separa cada línea en letras
                (<span class="letra">) para poder animar cada letra por separado. */}
            <h1 id="welcome-name" aria-label="Emanuel Rangel">
                <span className="linea" data-letras={true}>Emanuel</span>
                <span className="linea linea-2" data-letras={true}>Rangel</span>
            </h1>

            <p className="welcome-description">
                Portafolio personal. Soy estudiante de informática y aprendo construyendo.
            </p>

            {/* tarjeta de la izquierda: tu stack */}
            <article className="w-card w-stack">
                <h2>Mi stack</h2>
                <p>Lo que uso para construir: lógica, datos y la interfaz que se ve.</p>
                <div className="w-stack-pie">
                    <div className="w-numero"><b>4+</b><span>Tecnologías</span></div>
                    <div className="w-fichas" aria-hidden="true">
                        <i>Py</i><i>Dj</i><i>SQL</i><i>&lt;/&gt;</i>
                    </div>
                    <a href="#habilidades" className="w-ir" data-ir="habilidades" aria-label="Ver habilidades">
                        <svg className="ic"><use href="#i-arrow"></use></svg>
                    </a>
                </div>
            </article>

            {/* sello circular y tarjeta de la derecha: proyecto destacado */}
            <div className="w-derecha">
                <span className="w-sello" aria-hidden="true">ER</span>
                <article className="w-card w-proyecto">
                    <a href="#proyectos" className="w-ir w-ir-arriba" data-ir="proyectos" aria-label="Ver proyectos">
                        <svg className="ic"><use href="#i-arrow"></use></svg>
                    </a>
                    <h2>Nombre del proyecto</h2>
                    <p className="w-meta"><svg className="ic"><use href="#i-pin"></use></svg> Proyecto destacado</p>
                    <p>Breve descripción de qué hace el proyecto y qué problema resuelve.</p>
                    <div className="w-etiquetas"><span>Python</span><span>Django</span><span>MySQL</span></div>
                </article>
            </div>

            {/* indicador: "desliza hacia el lado" */}
            <div className="loader" aria-hidden="true">
                <span>Desliza</span>
                <i></i><i></i><i></i>
            </div>

        </div>


        {/* ==========================================================
             EL RECORRIDO HORIZONTAL
             Todos los paneles están en una fila. Cuando giras la rueda (o deslizas),
             script.js mueve la página hacia el lado.
             data-seccion + data-nombre: así sabe en qué sección estás.
             ========================================================== */}
        <main className="pista" id="pista">

            {/* espacio vacío: aquí vive la portada (que está fija) */}
            <div className="espacio" id="inicio" data-seccion={true} data-nombre="Inicio"></div>


            {/* 01 · SOBRE MÍ */}
            <section className="panel" id="sobre-mi" data-seccion={true} data-nombre="Sobre mí">
                <header className="panel-cab" data-anim="right">
                    <p className="etiqueta">01 — Sobre mí</p>
                    <h2>Estudiante de informática, <em>aprendiendo construyendo</em></h2>
                </header>

                <div className="bento">

                    <article className="vidrio perfil" style={{"--c": "4", "--r": "2"}} data-anim="zoom">
                        <div className="avatar" aria-hidden="true"><span>ER</span></div>
                        <h3>Emanuel Rangel</h3>
                        <p className="rol">Estudiante de informática</p>
                        <p className="ubicacion"><svg className="ic"><use href="#i-pin"></use></svg> Tu ciudad, País</p>
                        <div className="chips"><span>Backend</span><span>Bases de datos</span><span>Web</span></div>
                    </article>

                    <article className="vidrio texto-grande" style={{"--c": "8", "--i": "1"}} data-anim="right">
                        <p>
                            Escribe aquí un párrafo breve sobre quién eres, qué estás estudiando
                            y qué tipo de proyectos te gusta construir. Dos o tres frases son
                            suficientes: lo importante es que suene a ti.
                        </p>
                    </article>

                    <article className="vidrio" style={{"--c": "4", "--i": "2"}} data-anim="right">
                        <div className="tile-cab"><h3>Ahora mismo</h3><b className="gran-numero" data-contar="3">0</b></div>
                        <ul className="lista-puntos">
                            <li><span>Estudiando</span><strong>Informática</strong></li>
                            <li><span>Construyendo</span><strong>Este portafolio</strong></li>
                            <li><span>Aprendiendo</span><strong>Django</strong></li>
                        </ul>
                    </article>

                    <article className="vidrio" style={{"--c": "4", "--i": "3"}} data-anim="right">
                        <div className="tile-cab"><h3>Disponibilidad</h3></div>
                        <label className="toggle"><span>Prácticas</span><input type="checkbox" defaultChecked={false} /><i className="toggle-pista"><b></b></i></label>
                        <label className="toggle"><span>Proyectos propios</span><input type="checkbox" defaultChecked={false} /><i className="toggle-pista"><b></b></i></label>
                        <label className="toggle"><span>Trabajo remoto</span><input type="checkbox" /><i className="toggle-pista"><b></b></i></label>
                    </article>

                </div>
            </section>


            {/* 02 · HABILIDADES */}
            <section className="panel" id="habilidades" data-seccion={true} data-nombre="Habilidades">
                <header className="panel-cab" data-anim="right">
                    <p className="etiqueta">02 — Habilidades</p>
                    <h2>Con qué trabajo <em>y cómo he ido avanzando</em></h2>
                </header>

                <div className="bento">

                    {/* gráfica de olas (como la imagen 1). Los datos son de ejemplo: cambia los números de las curvas */}
                    <article className="vidrio grafica" style={{"--c": "7", "--r": "2"}} data-anim="right">
                        <div className="tile-cab">
                            <h3>Progreso de aprendizaje</h3>
                            <span className="nota">Ejemplo, edítalo</span>
                        </div>
                        <svg viewBox="0 0 600 270" preserveAspectRatio="none" role="img" aria-label="Gráfica de ejemplo con el progreso de aprendizaje entre 2023 y 2026">
                            <g className="rejilla">
                                <line x1="0" y1="40" x2="600" y2="40"></line><line x1="0" y1="105" x2="600" y2="105"></line>
                                <line x1="0" y1="170" x2="600" y2="170"></line><line x1="0" y1="235" x2="600" y2="235"></line>
                            </g>
                            <path className="ola ola-b-area" d="M0 235 C70 225 100 160 170 178 S270 232 330 170 S430 96 480 140 S560 190 600 130 L600 270 L0 270 Z"></path>
                            <path className="ola ola-b-linea" d="M0 235 C70 225 100 160 170 178 S270 232 330 170 S430 96 480 140 S560 190 600 130"></path>
                            <path className="ola ola-a-area" d="M0 250 C60 230 90 120 150 150 S250 215 310 140 S410 48 460 96 S550 160 600 70 L600 270 L0 270 Z"></path>
                            <path className="ola ola-a-linea" d="M0 250 C60 230 90 120 150 150 S250 215 310 140 S410 48 460 96 S550 160 600 70"></path>
                        </svg>
                        <div className="eje"><span>2023</span><span>2024</span><span>2025</span><span>2026</span></div>
                        <div className="leyenda"><span><i className="l-a"></i>Python y Django</span><span><i className="l-b"></i>HTML, CSS y MySQL</span></div>
                    </article>

                    {/* anillos (como los de la imagen 2) */}
                    <article className="vidrio" style={{"--c": "5", "--i": "1"}} data-anim="zoom">
                        <div className="tile-cab"><h3>Tecnologías</h3><span className="nota">Nivel estimado</span></div>
                        <div className="anillos">
                            <div className="anillo" style={{"--v": ".8"}}>
                                <svg viewBox="0 0 80 80"><circle className="a-pista" cx="40" cy="40" r="34"></circle><circle className="a-valor" cx="40" cy="40" r="34" pathLength="100"></circle></svg>
                                <b data-contar="80" data-sufijo="%">0%</b><span>Python</span>
                            </div>
                            <div className="anillo" style={{"--v": ".75"}}>
                                <svg viewBox="0 0 80 80"><circle className="a-pista" cx="40" cy="40" r="34"></circle><circle className="a-valor" cx="40" cy="40" r="34" pathLength="100"></circle></svg>
                                <b data-contar="75" data-sufijo="%">0%</b><span>HTML / CSS</span>
                            </div>
                            <div className="anillo" style={{"--v": ".65"}}>
                                <svg viewBox="0 0 80 80"><circle className="a-pista" cx="40" cy="40" r="34"></circle><circle className="a-valor" cx="40" cy="40" r="34" pathLength="100"></circle></svg>
                                <b data-contar="65" data-sufijo="%">0%</b><span>MySQL</span>
                            </div>
                            <div className="anillo" style={{"--v": ".6"}}>
                                <svg viewBox="0 0 80 80"><circle className="a-pista" cx="40" cy="40" r="34"></circle><circle className="a-valor" cx="40" cy="40" r="34" pathLength="100"></circle></svg>
                                <b data-contar="60" data-sufijo="%">0%</b><span>Django</span>
                            </div>
                        </div>
                    </article>

                    {/* barras (como las de la imagen 1) */}
                    <article className="vidrio" style={{"--c": "5", "--i": "2"}} data-anim="zoom">
                        <div className="tile-cab"><h3>Áreas</h3><span className="nota">Nivel estimado</span></div>
                        <div className="barras">
                            <div className="barra" style={{"--v": ".75"}}>
                                <div className="barra-cab"><span>Backend</span><b data-contar="75" data-sufijo="%">0%</b></div>
                                <div className="barra-pista"><i className="barra-relleno"></i></div>
                            </div>
                            <div className="barra" style={{"--v": ".65"}}>
                                <div className="barra-cab"><span>Bases de datos</span><b data-contar="65" data-sufijo="%">0%</b></div>
                                <div className="barra-pista"><i className="barra-relleno"></i></div>
                            </div>
                            <div className="barra" style={{"--v": ".7"}}>
                                <div className="barra-cab"><span>Interfaz web</span><b data-contar="70" data-sufijo="%">0%</b></div>
                                <div className="barra-pista"><i className="barra-relleno"></i></div>
                            </div>
                        </div>
                    </article>

                </div>
            </section>


            {/* 03 · PROYECTOS */}
            <section className="panel" id="proyectos" data-seccion={true} data-nombre="Proyectos">
                <header className="panel-cab" data-anim="right">
                    <p className="etiqueta">03 — Proyectos</p>
                    <h2>Algunas cosas <em>que he construido</em></h2>
                </header>

                <div className="bento bento-proy">

                    <article className="vidrio proyecto destacado" style={{"--c": "4"}} data-anim="up">
                        <div className="project-thumb" aria-hidden="true"></div>
                        <div className="proy-cab"><span className="project-number">01</span><a href="#" className="w-ir" aria-label="Abrir proyecto 1"><svg className="ic"><use href="#i-arrow"></use></svg></a></div>
                        <h3>Nombre del proyecto</h3>
                        <p>Breve descripción de qué hace el proyecto y qué problema resuelve.</p>
                        <div className="project-tags"><span>Python</span><span>Django</span></div>
                    </article>

                    <article className="vidrio proyecto" style={{"--c": "4", "--i": "1"}} data-anim="up">
                        <div className="project-thumb" aria-hidden="true"></div>
                        <div className="proy-cab"><span className="project-number">02</span><a href="#" className="w-ir" aria-label="Abrir proyecto 2"><svg className="ic"><use href="#i-arrow"></use></svg></a></div>
                        <h3>Nombre del proyecto</h3>
                        <p>Breve descripción de qué hace el proyecto y qué problema resuelve.</p>
                        <div className="project-tags"><span>MySQL</span><span>HTML/CSS</span></div>
                    </article>

                    <article className="vidrio proyecto" style={{"--c": "4", "--i": "2"}} data-anim="up">
                        <div className="project-thumb" aria-hidden="true"></div>
                        <div className="proy-cab"><span className="project-number">03</span><a href="#" className="w-ir" aria-label="Abrir proyecto 3"><svg className="ic"><use href="#i-arrow"></use></svg></a></div>
                        <h3>Nombre del proyecto</h3>
                        <p>Breve descripción de qué hace el proyecto y qué problema resuelve.</p>
                        <div className="project-tags"><span>Python</span><span>MySQL</span></div>
                    </article>

                    {/* "ahora construyendo" (como el reproductor de la imagen 2) */}
                    <article className="vidrio construyendo" style={{"--c": "8", "--i": "3"}} data-anim="right">
                        <div className="cons-arte" aria-hidden="true"><span>ER</span></div>
                        <div className="cons-info">
                            <p className="etiqueta">Ahora construyendo</p>
                            <h3>Este portafolio</h3>
                            <p className="nota">HTML · CSS · JavaScript</p>
                            <div className="barra" style={{"--v": ".8"}}>
                                <div className="barra-cab"><span>Avance</span><b data-contar="80" data-sufijo="%">0%</b></div>
                                <div className="barra-pista"><i className="barra-relleno"></i></div>
                            </div>
                        </div>
                    </article>

                    {/* mapa de actividad (inspirado en el "Heatmap" de la imagen 1). Es decorativo: JS pone los cuadros */}
                    <article className="vidrio" style={{"--c": "4", "--i": "4"}} data-anim="right">
                        <div className="tile-cab"><h3>Actividad</h3><span className="nota">Ejemplo</span></div>
                        <div className="mapa" id="mapa" aria-hidden="true"></div>
                        <div className="mapa-leyenda" aria-hidden="true"><span>Menos</span><i className="h0"></i><i className="h1"></i><i className="h2"></i><i className="h3"></i><i className="h4"></i><span>Más</span></div>
                    </article>

                </div>
            </section>


            {/* 04 · EDUCACIÓN */}
            <section className="panel" id="educacion" data-seccion={true} data-nombre="Educación">
                <header className="panel-cab" data-anim="right">
                    <p className="etiqueta">04 — Educación</p>
                    <h2>Formación <em>y lo que viene</em></h2>
                </header>

                <div className="bento">

                    <article className="vidrio" style={{"--c": "7", "--r": "2"}} data-anim="right">
                        <div className="tile-cab"><h3>Recorrido</h3></div>
                        <ul className="timeline">
                            <li>
                                <span className="timeline-date">2023 — presente</span>
                                <span className="timeline-title">Nombre de la institución</span>
                                <span className="timeline-detail">Programa de informática</span>
                            </li>
                            <li>
                                <span className="timeline-date">2024</span>
                                <span className="timeline-title">Nombre del curso o certificación</span>
                                <span className="timeline-detail">Plataforma o institución</span>
                            </li>
                            <li className="futuro">
                                <span className="timeline-date">Lo que sigue</span>
                                <span className="timeline-title">Tu próximo curso o certificación</span>
                                <span className="timeline-detail">Agrega aquí tu siguiente meta</span>
                            </li>
                        </ul>
                    </article>

                    <article className="vidrio" style={{"--c": "5", "--i": "1"}} data-anim="right">
                        <div className="tile-cab"><h3>Metas 2026</h3><b className="gran-numero" data-contar="3">0</b></div>
                        <ul className="checks">
                            <li><label><input type="checkbox" defaultChecked={false} /><i className="caja"><svg className="ic"><use href="#i-check"></use></svg></i><span>Terminar este portafolio</span></label></li>
                            <li><label><input type="checkbox" /><i className="caja"><svg className="ic"><use href="#i-check"></use></svg></i><span>Publicar mi primer proyecto en Django</span></label></li>
                            <li><label><input type="checkbox" /><i className="caja"><svg className="ic"><use href="#i-check"></use></svg></i><span>Practicar consultas avanzadas en MySQL</span></label></li>
                        </ul>
                    </article>

                    <article className="vidrio avance" style={{"--c": "5", "--i": "2"}} data-anim="zoom">
                        <div className="anillo anillo-grande" style={{"--v": ".5"}}>
                            <svg viewBox="0 0 80 80"><circle className="a-pista" cx="40" cy="40" r="34"></circle><circle className="a-valor" cx="40" cy="40" r="34" pathLength="100"></circle></svg>
                            <b data-contar="50" data-sufijo="%">0%</b>
                        </div>
                        <div>
                            <h3>Avance de la carrera</h3>
                            <p className="nota">Ejemplo: cambia el 50 por tu avance real.</p>
                        </div>
                    </article>

                </div>
            </section>


            {/* 05 · CONTACTO */}
            <section className="panel" id="contacto" data-seccion={true} data-nombre="Contacto">
                <header className="panel-cab" data-anim="right">
                    <p className="etiqueta">05 — Contacto</p>
                    <h2>Hablemos <em>de tu próximo proyecto</em></h2>
                </header>

                <div className="bento">

                    <article className="vidrio contacto-grande" style={{"--c": "7", "--r": "2"}} data-anim="right">
                        <p className="etiqueta">Escríbeme</p>
                        <h3>Si quieres hablar sobre un proyecto, una oportunidad o simplemente saludar, aquí me encuentras.</h3>
                        <a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=emanuel.rangel.mira@gmail.com" target="_blank" rel="noopener noreferrer" className="boton-grande pulso" id="correo" data-email="emanuel.rangel.mira@gmail.com">
                            <svg className="ic"><use href="#i-mail"></use></svg> emanuel.rangel.mira@gmail.com
                        </a>
                        <p className="pie-legal">© 2026 Emanuel Rangel. Todos los derechos reservados.</p>
                    </article>

                    {/* iconos tipo "apps" (como AirDrop / Mensajes / Mail de la imagen 2) */}
                    <article className="vidrio" style={{"--c": "5", "--i": "1"}} data-anim="zoom">
                        <div className="apps">
                            <a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=emanuel.rangel.mira@gmail.com" target="_blank" rel="noopener noreferrer" className="app"><i className="app-i a1"><svg className="ic"><use href="#i-mail"></use></svg></i><span>Correo</span></a>
                            <a href="https://github.com/blackpapaflou" target="_blank" rel="noopener noreferrer" className="app"><i className="app-i a2"><svg className="ic"><use href="#i-github"></use></svg></i><span>GitHub</span></a>
                            <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer" className="app"><i className="app-i a4"><svg className="ic"><use href="#i-chat"></use></svg></i><span>WhatsApp</span></a>
                        </div>
                    </article>

                    {/* filas de acciones (como Copiar / Imprimir / Duplicar de la imagen 2) */}
                    <article className="vidrio acciones" style={{"--c": "5", "--i": "2"}} data-anim="zoom">
                        <button type="button" className="fila" id="copiar"><span id="copiar-texto">Copiar correo</span><svg className="ic"><use href="#i-copy"></use></svg></button>
                        <a href="#" className="fila"><span>Descargar CV</span><svg className="ic"><use href="#i-down"></use></svg></a>
                        <button type="button" className="fila" id="volver"><span>Volver al inicio</span><svg className="ic"><use href="#i-back"></use></svg></button>
                    </article>

                </div>
            </section>

        </main>


        </>
    );
}
