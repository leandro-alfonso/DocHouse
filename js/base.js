/* ==================================================
   HOUSE M.D. - JAVASCRIPT PRINCIPAL
   Estructura del archivo:
   1. Menú hamburguesa
   2. Flip de tarjetas de personajes
   3. Carrusel de temporadas
   4. Timeline / Galería
   5. Validación del formulario de contacto
   6. Diagnóstico interactivo (Home)
================================================== */


/* ==================================================
   1. MENÚ HAMBURGUESA
================================================== */

function iniciarMenuHamburguesa() {
    const boton = document.querySelector(".encabezado__hamburguesa");
    const nav = document.querySelector(".encabezado__nav");
    const desplegable = document.querySelector(".menu-desplegable");
    const enlaceTemporadas = desplegable?.querySelector(":scope > a");

    if (!boton || !nav) return;

    boton.addEventListener("click", () => {
        boton.classList.toggle("activo");
        nav.classList.toggle("abierto");
    });

    if (desplegable && enlaceTemporadas) {
        enlaceTemporadas.addEventListener("click", (evento) => {
            if (window.innerWidth <= 900) {
                evento.preventDefault();
                const abierto = desplegable.classList.toggle("submenu-abierto");
                enlaceTemporadas.setAttribute("aria-expanded", String(abierto));
            }
        });
    }

    nav.querySelectorAll("a").forEach((enlace) => {
        if (enlace === enlaceTemporadas) return;
        enlace.addEventListener("click", () => {
            boton.classList.remove("activo");
            nav.classList.remove("abierto");
            desplegable?.classList.remove("submenu-abierto");
            enlaceTemporadas?.setAttribute("aria-expanded", "false");
        });
    });
}


/* ==================================================
   2. FLIP DE TARJETAS DE PERSONAJES
================================================== */

function iniciarFlipPersonajes() {
    const tarjetas = document.querySelectorAll(".tarjeta-flip");

    tarjetas.forEach((tarjeta) => {
        tarjeta.addEventListener("click", () => {
            // Cada click alterna la clase "flipped":
            // 1er click -> se agrega (gira al expediente)
            // 2do click -> se quita (vuelve al frente)
            tarjeta.classList.toggle("flipped");
        });
    });
}


/* ==================================================
   3. CARRUSEL DE TEMPORADAS
================================================== */

const datosTemporadas = [
    { numero: 1, anio: 2004, episodios: ["Pilot", "Paternity", "Occam's Razor", "Maternity", "Damned If You Do", "The Socratic Method", "Fidelity", "Poison", "DNR", "Histories", "Detox", "Sports Medicine", "Cursed", "Control", "Mob Rules", "Heavy", "Role Model", "Babies & Bathwater", "Kids", "Love Hurts", "Three Stories", "Honeymoon"] },
    { numero: 2, anio: 2005, episodios: ["Acceptance", "Autopsy", "Humpty Dumpty", "TB or Not TB", "Daddy's Boy", "Spin", "Hunting", "The Mistake", "Deception", "Failure to Communicate", "Need to Know", "Distractions", "Skin Deep", "Sex Kills", "Clueless", "Safe", "All In", "Sleeping Dogs Lie", "House vs. God", "Euphoria (1)", "Euphoria (2)", "Forever", "Who's Your Daddy?", "No Reason"] },
    { numero: 3, anio: 2006, episodios: ["Meaning", "Cane & Able", "Informed Consent", "Lines in the Sand", "Fools for Love", "Que Sera Sera", "Son of Coma Guy", "Whac-A-Mole", "Finding Judas", "Merry Little Christmas", "Words and Deeds", "One Day, One Room", "Needle in a Haystack", "Insensitive", "Half-Wit", "Top Secret", "Fetal Position", "Airborne", "Act Your Age", "House Training", "Family", "Resignation", "The Jerk", "Human Error"] },
    { numero: 4, anio: 2007, episodios: ["Alone", "The Right Stuff", "97 Seconds", "Guardian Angels", "Mirror, Mirror", "Whatever It Takes", "Ugly", "You Do Not Want to Know", "Games", "It's A Wonderful Lie", "Frozen", "Don't Ever Change", "No More Mr. Nice Guy", "Living the Dream", "House's Head (1)", "Wilson's Heart (2)"] },
    { numero: 5, anio: 2008, episodios: ["Dying Changes Everything", "Not Cancer", "Adverse Events", "Birthmarks", "Lucky Thirteen", "Joy", "The Itch", "Emancipation", "Last Resort", "Let Them Eat Cake", "Joy to the World", "Painless", "Big Baby", "The Greater Good", "Unfaithful", "The Softer Side", "The Social Contract", "Here Kitty", "Locked In", "Simple Explanation", "Saviors", "House Divided", "Under My Skin", "Both Sides Now"] },
    { numero: 6, anio: 2009, episodios: ["Broken (Part 1)", "Broken (Part 2)", "Epic Fail", "The Tyrant", "Instant Karma", "Brave Heart", "Known Unknowns", "Teamwork", "Ignorance and Bliss", "Wilson", "The Down Low", "Remorse", "Moving the Chains", "5 to 9", "Private Lives", "Black Hole", "Lockdown", "Knight Fall", "Open and Shut", "The Choice", "Baggage", "Help Me"] },
    { numero: 7, anio: 2010, episodios: ["Now What?", "Selfish", "Unwritten", "Massage Therapy", "Unplanned Parenthood", "Office Politics", "A Pox on Our House", "Small Sacrifices", "Larger Than Life", "Carrot or Stick", "Family Practice", "You Must Remember This", "Two Stories", "Recession Proof", "Bombshells", "Out of the Chute", "Fall from Grace", "The Dig", "Last Temptation", "Changes", "The Fix", "After Hours", "Moving On"] },
    { numero: 8, anio: 2011, episodios: ["Twenty Vicodin", "Transplant", "Charity Case", "Risky Business", "The Confession", "Parents", "Dead and Buried", "Perils of Paranoia", "Better Half", "Runaways", "Nobody's Fault", "Chase", "Man of the House", "Love is Blind", "Blowing the Whistle", "Gut Check", "We Need the Eggs", "Body and Soul", "The C-Word", "Post Mortem", "Holding On", "Everybody Dies"] }
];

let indiceTemporadaActual = 0;

function crearHtmlEpisodio(titulo, numero) {
    return `
        <article class="episodio">
            <span class="episodio__numero">EP. ${String(numero).padStart(2, "0")}</span>
            <h4 class="episodio__titulo">${titulo}</h4>
        </article>
    `;
}

function renderizarTemporada() {
    const temporada = datosTemporadas[indiceTemporadaActual];
    const viewport = document.querySelector(".carrusel__viewport");
    if (!viewport) return;

    const alturaAnterior = viewport.offsetHeight;
    const htmlEpisodios = temporada.episodios.map((titulo, indice) => crearHtmlEpisodio(titulo, indice + 1)).join("");

    viewport.style.height = alturaAnterior ? `${alturaAnterior}px` : "";
    viewport.classList.add("carrusel__viewport--cambiando");

    viewport.innerHTML = `
        <div class="ficha-temporada">
            <div class="ficha-temporada__cabecera">
                <div>
                    <span class="etiqueta-mono">ARCHIVO CLÍNICO</span>
                    <h3 class="ficha-temporada__titulo">Temporada ${temporada.numero}</h3>
                </div>
                <div class="ficha-temporada__meta">
                    <span>AÑO <strong>${temporada.anio}</strong></span>
                    <span>EPISODIOS <strong>${temporada.episodios.length}</strong></span>
                </div>
            </div>
            <p class="ficha-temporada__aviso">Listado completo de los nombres de cada episodio de la temporada.</p>
            <div class="episodios-destacados">${htmlEpisodios}</div>
        </div>
    `;

    const alturaNueva = viewport.scrollHeight;
    requestAnimationFrame(() => {
        viewport.style.height = `${alturaNueva}px`;
    });

    const finalizarTransicion = () => {
        viewport.style.height = "";
        viewport.classList.remove("carrusel__viewport--cambiando");
        viewport.removeEventListener("transitionend", finalizarTransicion);
    };
    viewport.addEventListener("transitionend", finalizarTransicion);
    actualizarIndicadores();
}

function actualizarIndicadores() {
    const puntos = document.querySelectorAll(".carrusel__punto");
    puntos.forEach((punto, indice) => punto.classList.toggle("activo", indice === indiceTemporadaActual));
}

function crearIndicadores() {
    const contenedor = document.querySelector(".carrusel__indicadores");
    if (!contenedor) return;
    contenedor.innerHTML = "";
    datosTemporadas.forEach((temporada, indice) => {
        const punto = document.createElement("button");
        punto.className = "carrusel__punto";
        punto.textContent = temporada.numero;
        punto.setAttribute("aria-label", "Ir a temporada " + temporada.numero);
        punto.addEventListener("click", () => {
            indiceTemporadaActual = indice;
            renderizarTemporada();
        });
        contenedor.appendChild(punto);
    });
}

function iniciarCarruselTemporadas() {
    const anterior = document.querySelector(".carrusel__flecha--anterior");
    const siguiente = document.querySelector(".carrusel__flecha--siguiente");
    if (!anterior || !siguiente) return;

    const parametro = Number(new URLSearchParams(window.location.search).get("temporada"));
    if (parametro >= 1 && parametro <= datosTemporadas.length) {
        indiceTemporadaActual = parametro - 1;
    }

    anterior.addEventListener("click", () => {
        indiceTemporadaActual = (indiceTemporadaActual - 1 + datosTemporadas.length) % datosTemporadas.length;
        renderizarTemporada();
    });
    siguiente.addEventListener("click", () => {
        indiceTemporadaActual = (indiceTemporadaActual + 1) % datosTemporadas.length;
        renderizarTemporada();
    });
    crearIndicadores();
    renderizarTemporada();
}


/* ==================================================
   4. TIMELINE / GALERÍA
================================================== */

function iniciarGaleria() {
    const miniaturas = document.querySelectorAll(".galeria__item");
    const modal = document.querySelector(".galeria-modal");
    if (!miniaturas.length || !modal) return;

    const modalImagen = modal.querySelector(".galeria-modal__imagen");
    const modalTitulo = modal.querySelector(".galeria-modal__titulo");
    const modalTexto = modal.querySelector(".galeria-modal__texto");
    const cerrar = modal.querySelector(".galeria-modal__cerrar");
    const anterior = modal.querySelector(".galeria-modal__anterior");
    const siguiente = modal.querySelector(".galeria-modal__siguiente");
    let indice = 0;

    function mostrar(i) {
        indice = (i + miniaturas.length) % miniaturas.length;
        const item = miniaturas[indice];
        modalImagen.src = item.dataset.imagen;
        modalImagen.alt = item.dataset.titulo;
        modalTitulo.textContent = item.dataset.titulo;
        modalTexto.textContent = item.dataset.descripcion;
        modal.classList.add("abierto");
        document.body.classList.add("modal-abierto");
    }
    function cerrarModal() {
        modal.classList.remove("abierto");
        document.body.classList.remove("modal-abierto");
    }

    miniaturas.forEach((item, i) => item.addEventListener("click", () => mostrar(i)));
    cerrar.addEventListener("click", cerrarModal);
    anterior.addEventListener("click", () => mostrar(indice - 1));
    siguiente.addEventListener("click", () => mostrar(indice + 1));
    modal.addEventListener("click", (e) => { if (e.target === modal) cerrarModal(); });
    document.addEventListener("keydown", (e) => {
        if (!modal.classList.contains("abierto")) return;
        if (e.key === "Escape") cerrarModal();
        if (e.key === "ArrowLeft") mostrar(indice - 1);
        if (e.key === "ArrowRight") mostrar(indice + 1);
    });
}


/* ==================================================
   5. VALIDACIÓN DEL FORMULARIO DE CONTACTO
================================================== */

function iniciarFormularioContacto() {
    const formulario = document.querySelector(".formulario");

    if (!formulario) {
        return;
    }

    const campoNombre = formulario.querySelector("#nombre");
    const campoEmail = formulario.querySelector("#email");
    const campoMensaje = formulario.querySelector("#mensaje");
    const mensajeEnvio = formulario.querySelector(".formulario__mensaje-envio");

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        let esValido = true;

        esValido = validarCampoTexto(campoNombre, 2) && esValido;
        esValido = validarCampoEmail(campoEmail) && esValido;
        esValido = validarCampoTexto(campoMensaje, 10) && esValido;

        if (esValido) {
            mensajeEnvio.textContent = "Expediente enviado correctamente. El equipo de Princeton-Plainsboro se pondrá en contacto a la brevedad.";
            mensajeEnvio.classList.add("visible");
            formulario.reset();
        } else {
            mensajeEnvio.classList.remove("visible");
        }
    });
}

function obtenerErrorDe(campo) {
    return campo.parentElement.querySelector(".formulario__error");
}

function validarCampoTexto(campo, longitudMinima) {
    const error = obtenerErrorDe(campo);
    const valor = campo.value.trim();

    if (valor.length < longitudMinima) {
        error.textContent = "Este campo necesita al menos " + longitudMinima + " caracteres.";
        return false;
    }

    error.textContent = "";
    return true;
}

function validarCampoEmail(campo) {
    const error = obtenerErrorDe(campo);
    const valor = campo.value.trim();
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!patronEmail.test(valor)) {
        error.textContent = "Ingresá un email válido.";
        return false;
    }

    error.textContent = "";
    return true;
}


/* ==================================================
   6. ENFERMEDADES DESTACADAS (HOME)
================================================== */

const enfermedadesDestacadas = {
    lupus: { nombre: "Lupus", texto: "Enfermedad autoinmune en la que el sistema inmunitario puede atacar distintos tejidos del organismo.", episodio: "Temporada 4 · Episodio 8 · You Don't Want to Know" },
    porfiria: { nombre: "Porfiria aguda intermitente", texto: "Trastorno metabólico que afecta la producción de ciertas sustancias necesarias para formar el grupo hemo y puede provocar ataques agudos.", episodio: "Temporada 1 · Episodio 22 · Honeymoon" },
    cushing: { nombre: "Enfermedad de Cushing", texto: "Alteración causada por una exposición excesiva y sostenida al cortisol, generalmente relacionada con un problema en la regulación hormonal.", episodio: "Temporada 1 · Episodio 16 · Heavy" },
    chagas: { nombre: "Enfermedad de Chagas", texto: "Infección causada por el parásito Trypanosoma cruzi, transmitido principalmente por la picadura de la vinchuca en zonas endémicas.", episodio: "Temporada 4 · Episodio 13 · No More Mr. Nice Guy" },
    lyme: { nombre: "Enfermedad de Lyme", texto: "Infección bacteriana transmitida por ciertas garrapatas que puede afectar la piel, las articulaciones y otros órganos.", episodio: "Temporada 4 · Episodio 7 · Ugly" },
    sindrome: { nombre: "Sarcoidosis", texto: "Enfermedad inflamatoria que puede producir pequeños grupos de células inflamatorias, llamados granulomas, en distintos órganos.", episodio: "Temporada 5 · Episodio 22 · House Divided" },
    crohn: { nombre: "Enfermedad de Crohn", texto: "Enfermedad inflamatoria intestinal crónica que puede afectar distintas partes del aparato digestivo.", episodio: "Temporada 6 · Episodio 8 · Teamwork" },
    fabry: { nombre: "Enfermedad de Fabry", texto: "Trastorno hereditario poco frecuente que altera el procesamiento de ciertos lípidos y puede afectar varios órganos.", episodio: "Temporada 6 · Episodio 3 · Epic Fail" },
    sifilis: { nombre: "Sífilis", texto: "Infección bacteriana de transmisión sexual que puede presentar distintas etapas y afectar diferentes órganos si no se trata.", episodio: "Temporada 8 · Episodio 6 · Parents" },
    kawasaki: { nombre: "Enfermedad de Kawasaki", texto: "Enfermedad inflamatoria que afecta principalmente a niños y puede comprometer los vasos sanguíneos, especialmente las arterias coronarias.", episodio: "Temporada 8 · Episodio 5 · The Confession" },
    rey: { nombre: "Síndrome de Reye", texto: "Trastorno poco frecuente que puede producir inflamación del cerebro y daño hepático, principalmente en niños y adolescentes.", episodio: "Temporada 8 · Episodio 9 · Better Half" },
    porfiria2: { nombre: "Porfiria variegata", texto: "Tipo de porfiria que puede provocar síntomas neurológicos y, en algunos casos, manifestaciones cutáneas.", episodio: "Temporada 7 · Episodio 10 · Carrot or Stick" }
};

function iniciarEnfermedades() {
    const items = document.querySelectorAll(".enfermedad-item");
    if (!items.length) return;

    items.forEach((item) => {
        const boton = item.querySelector(".enfermedad");
        const detalle = item.querySelector(".enfermedad__detalle");
        const flecha = item.querySelector(".enfermedad__flecha");
        if (!boton || !detalle) return;

        boton.addEventListener("click", () => {
            const enfermedad = enfermedadesDestacadas[boton.dataset.enfermedad];
            if (!enfermedad) return;

            const estabaAbierto = !detalle.hidden;

            items.forEach((otroItem) => {
                const otroBoton = otroItem.querySelector(".enfermedad");
                const otroDetalle = otroItem.querySelector(".enfermedad__detalle");
                const otraFlecha = otroItem.querySelector(".enfermedad__flecha");
                if (!otroBoton || !otroDetalle) return;
                otroBoton.classList.remove("activo");
                otroBoton.setAttribute("aria-expanded", "false");
                if (otraFlecha) otraFlecha.textContent = "+";
                otroDetalle.hidden = true;
                otroDetalle.innerHTML = "";
            });

            // Si se vuelve a tocar la misma enfermedad, se cierra.
            if (estabaAbierto) return;

            boton.classList.add("activo");
            boton.setAttribute("aria-expanded", "true");
            if (flecha) flecha.textContent = "−";
            detalle.innerHTML = `
                <span class="etiqueta-mono">CASO SELECCIONADO</span>
                <h3>${enfermedad.nombre}</h3>
                <p>${enfermedad.texto}</p>
                <span class="enfermedad__episodio">${enfermedad.episodio}</span>
            `;
            detalle.hidden = false;
        });
    });
}

/* ==================================================
   INICIALIZACIÓN GENERAL
================================================== */

document.addEventListener("DOMContentLoaded", () => {
    iniciarMenuHamburguesa();
    iniciarFlipPersonajes();
    iniciarCarruselTemporadas();
    iniciarGaleria();
    iniciarFormularioContacto();
    iniciarEnfermedades();
});
