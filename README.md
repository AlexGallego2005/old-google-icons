# Iconos de Google (2015-2022)

Extensión para Google Chrome que reemplaza los iconos actuales del ecosistema de Google por los diseños utilizados entre 2015 y 2022.

## Aplicaciones soportadas

- Gmail
- Drive
- Meet
- Docs (Documentos)
- Sheets (Hojas de cálculo)
- Slides (Presentaciones)

## Funcionamiento técnico

- **Ejecución temprana:** Utiliza `document_start` en el `manifest.json` y un `MutationObserver` para interceptar los nodos antes de su renderizado, evitando el parpadeo de contenido no estilizado (FOUC).
- **Sustitución dual:** Reemplaza tanto los `href` de las etiquetas `<link rel="icon">` (favicons) como los atributos `src` de las etiquetas `<img>` de las cabeceras.
- **Inyección de CSS:** Anula los *sprite sheets* utilizados por Google en Docs, Sheets y Slides mediante la ocultación de pseudo-elementos (`::before`) y reasigna los logos clásicos respetando las dimensiones de la barra de navegación original.

## Instalación (Carga descomprimida)

1. Guarda la carpeta con los archivos de la extensión en un directorio local permanente.
2. Abre Google Chrome y accede a `chrome://extensions/`.
3. Activa el **Modo de desarrollador** (esquina superior derecha).
4. Haz clic en el botón **Cargar descomprimida** y selecciona la carpeta que contiene el archivo `manifest.json`.
5. Recarga las pestañas de Google correspondientes para aplicar los cambios.