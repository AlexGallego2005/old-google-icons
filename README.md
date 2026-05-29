# Iconos de Google (2015-2022)

Extensión para Google Chrome que reemplaza los iconos actuales del ecosistema de Google por los diseños utilizados entre 2015 y 2022.

## Aplicaciones soportadas y comparativa

| Aplicación | Sin la extensión (Actuales) | Con la extensión (Clásicos) |
| :--- | :---: | :---: |
| Gmail | <img width="125" height="47" alt="image" src="https://github.com/user-attachments/assets/b242c483-bd94-452a-af4c-f401b1e70e45" /> | <img width="145" height="67" alt="image" src="https://github.com/user-attachments/assets/9f7869c3-9dad-416c-8b1d-eb389b9dcdab" /> <img width="58" height="47" alt="image" src="https://github.com/user-attachments/assets/b876a621-9ecc-457f-94c5-abecc7164a65" /> |
| Drive | <img width="187" height="63" alt="image" src="https://github.com/user-attachments/assets/21e03b35-d7d4-458b-94f2-20c3fd622a10" /> <img width="35" height="41" alt="image" src="https://github.com/user-attachments/assets/ca380bbc-4200-4b9b-b8a1-03851c99f918" /> | <img width="157" height="64" alt="image" src="https://github.com/user-attachments/assets/f764b4b0-8cde-440b-a66f-e6245a1fd4c8" /> <img width="41" height="42" alt="image" src="https://github.com/user-attachments/assets/2eab1a17-aca3-486d-a62a-c0e48f48f1dd" /> |
| Meet | | |
| Docs (Documentos) | <img width="48" height="54" alt="image" src="https://github.com/user-attachments/assets/1f21753a-18ef-47f0-a158-0f6df12ca0bf" /> <img width="35" height="57" alt="image" src="https://github.com/user-attachments/assets/9d5aa911-eec1-4ee1-b0c1-4049b4588e6d" /> | <img width="51" height="52" alt="image" src="https://github.com/user-attachments/assets/c82d3dec-4f20-4ceb-b69b-1845d3476101" /> <img width="48" height="39" alt="image" src="https://github.com/user-attachments/assets/dc52e9bc-f005-4bd8-b83b-b700e442dd2b" />
| Sheets (Hojas de cálculo) | <img width="49" height="53" alt="image" src="https://github.com/user-attachments/assets/6903fe61-f71f-4b84-8ce3-121ab50bab73" /> <img width="47" height="35" alt="image" src="https://github.com/user-attachments/assets/5892a78b-c57b-420c-beb5-64d2c693f988" /> | <img width="46" height="54" alt="image" src="https://github.com/user-attachments/assets/69305eb4-52bc-4274-8d03-58a6ca716a9e" /> <img width="46" height="46" alt="image" src="https://github.com/user-attachments/assets/596ecf39-bbea-41c9-b3c0-c517d780c45a" /> |
| Slides (Presentaciones) | | |
| Calendario | | |

## Funcionamiento

- **Ejecución temprana:** Utiliza `document_start` en el `manifest.json` y un `MutationObserver` para interceptar los nodos antes de su renderizado, evitando el parpadeo de contenido no estilizado (FOUC).
- **Sustitución dual:** Reemplaza tanto los `href` de las etiquetas `<link rel="icon">` (favicons) como los atributos `src` de las etiquetas `<img>` de las cabeceras.
- **Inyección de CSS:** Anula los *sprite sheets* utilizados por Google en Docs, Sheets y Slides mediante la ocultación de pseudo-elementos (`::before`) y reasigna los logos clásicos respetando las dimensiones de la barra de navegación original.

## Instalación

1. Guarda la carpeta con los archivos de la extensión en un directorio local permanente.
2. Abre Google Chrome y accede a `chrome://extensions/`.
3. Activa el **Modo de desarrollador** (esquina superior derecha).
4. Haz clic en el botón **Cargar descomprimida** y selecciona la carpeta que contiene el archivo `manifest.json`.
5. Recarga las pestañas de Google correspondientes para aplicar los cambios.
