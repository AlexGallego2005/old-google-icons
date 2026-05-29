// --- LÓGICA DINÁMICA DE CALENDAR ---
const diaActual = new Date().getDate();
const faviconCalendarLocal = chrome.runtime.getURL(`calendar_${diaActual}_2x_ico.png`);
const logoCalendarLocal = chrome.runtime.getURL(`calendar_${diaActual}_2x.png`);

// 1. RUTAS DE LAS IMÁGENES
const faviconsLocales = {
    "mail.google.com": chrome.runtime.getURL("mail_fav.png"),
    "calendar.google.com": faviconCalendarLocal, // Usa tus iconos editados a mano sin padding
    "drive.google.com": chrome.runtime.getURL("drive_fav.png"),
    "meet.google.com": chrome.runtime.getURL("meet_fav.png")
};

const logosLocales = {
    mail: chrome.runtime.getURL("mail_logo.png"),
    mailLoading: chrome.runtime.getURL("mail_loading.png"),
    calendar: logoCalendarLocal, // Usa los originales para la cabecera
    drive: chrome.runtime.getURL("drive_logo.png"),
    meet: chrome.runtime.getURL("meet_logo.png"),
    sheets: chrome.runtime.getURL("sheets_logo.png"),
    slides: chrome.runtime.getURL("slides_logo.png"),
    docs: chrome.runtime.getURL("docs_logo.png")
};

const urlActual = window.location.href;

// 2. DETECTAR FAVICON ACTUAL
let urlFaviconActual = faviconsLocales[window.location.hostname];

if (window.location.hostname === "docs.google.com") {
    if (urlActual.includes("/spreadsheets/")) urlFaviconActual = chrome.runtime.getURL("sheets_fav.png");
    else if (urlActual.includes("/presentation/")) urlFaviconActual = chrome.runtime.getURL("slides_fav.png");
    else urlFaviconActual = chrome.runtime.getURL("docs_fav.png");
}

// 3. DESTRUIR EL SPRITE SHEET EN DOCS/SHEETS/SLIDES
function inyectarCSSSprites() {
    let logoCSS = null;
    if (urlActual.includes("/document/")) logoCSS = logosLocales.docs;
    else if (urlActual.includes("/spreadsheets/")) logoCSS = logosLocales.sheets;
    else if (urlActual.includes("/presentation/")) logoCSS = logosLocales.slides;

    if (logoCSS) {
        const estilo = document.createElement("style");
        estilo.textContent = `
            .docs-branding-icon-img::before,
            .docs-branding-icon::before { content: none !important; display: none !important; }
            .docs-branding-icon-img,
            .docs-branding-icon {
                background-image: url('${logoCSS}') !important;
                background-size: contain !important;
                background-position: center left !important;
                background-repeat: no-repeat !important;
                width: 100px !important;
                height: 36px !important;
                margin-left: 0px !important; 
                margin-right: 12px !important;
                display: inline-block !important;
            }
        `;
        function intentarInyectar() {
            if (document.head) document.head.appendChild(estilo);
            else setTimeout(intentarInyectar, 5);
        }
        intentarInyectar();
    }
}
inyectarCSSSprites();

// 4. EL INTERCEPTOR INTELIGENTE
function interceptarNodos(nodo) {
    if (!nodo || nodo.nodeType !== 1) return;

    // A. Interceptar la pestaña (Favicon)
    if (nodo.nodeName === "LINK" && nodo.rel && nodo.rel.includes("icon")) {
        if (urlFaviconActual && nodo.href !== urlFaviconActual) {
            nodo.href = urlFaviconActual;
        }
    }

    // B. Interceptar las imágenes normales (Cabeceras y Cargas)
    if (nodo.nodeName === "IMG" && nodo.src) {

        if (nodo.alt === "Google Workspace") {
            nodo.style.display = "none";
            return;
        }

        let src = nodo.src.toLowerCase();

        if (src.includes("gstatic.com") && (src.includes("productlogos") || src.includes("ui/v1/icons/mail") || src.includes("logo_"))) {

            const estaEnPantallaDeCarga = nodo.closest('#loading');
            const estaEnCabecera = nodo.closest('#gb') || nodo.classList.contains('gb_5c');

            // Escudo anti-avatares
            if (!estaEnPantallaDeCarga && !estaEnCabecera) return;

            if (nodo.hasAttribute("srcset")) nodo.removeAttribute("srcset");
            if (nodo.hasAttribute("width")) nodo.removeAttribute("width");
            if (nodo.hasAttribute("height")) nodo.removeAttribute("height");

            nodo.style.objectFit = "contain";

            if (estaEnPantallaDeCarga) {
                nodo.style.width = "auto";
                nodo.style.height = "auto";
                nodo.style.maxWidth = "280px";
                nodo.style.maxHeight = "200px";
                if (src.includes("gmail") || src.includes("mail")) nodo.src = logosLocales.mailLoading;
            } else {

                // --- SIZING ESPECÍFICO ---
                if (src.includes("slides") || src.includes("presentation") || src.includes("sheets") || src.includes("spreadsheets") || src.includes("docs") || src.includes("document")) {
                    nodo.style.width = "30px";
                    nodo.style.height = "30px";
                } else if (src.includes("calendar")) {
                    nodo.style.width = "40px"; // Volvemos a los 40px estándar para la cabecera
                    nodo.style.height = "40px";
                } else {
                    nodo.style.width = "auto";
                    nodo.style.height = "auto";
                    nodo.style.maxWidth = "120px";
                }

                // --- REEMPLAZO DE LA IMAGEN ---
                if (src.includes("gmail") || src.includes("mail")) nodo.src = logosLocales.mail;
                else if (src.includes("calendar")) nodo.src = logosLocales.calendar;
                else if (src.includes("drive")) nodo.src = logosLocales.drive;
                else if (src.includes("meet")) nodo.src = logosLocales.meet;
                else if (src.includes("slides") || src.includes("presentation")) nodo.src = logosLocales.slides;
                else if (src.includes("sheets") || src.includes("spreadsheets")) nodo.src = logosLocales.sheets;
                else if (src.includes("docs") || src.includes("document")) nodo.src = logosLocales.docs;
            }
        }
    }

    if (nodo.childNodes && nodo.childNodes.length > 0) {
        nodo.childNodes.forEach(hijo => interceptarNodos(hijo));
    }
}

// 5. EL VIGILANTE
const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        if (mutation.type === "childList") mutation.addedNodes.forEach(nodo => interceptarNodos(nodo));
        if (mutation.type === "attributes") interceptarNodos(mutation.target);
    });
});

observer.observe(document.documentElement, {
    childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'href', 'srcset']
});