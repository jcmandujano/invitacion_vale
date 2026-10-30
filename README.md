# Invitación digital — XV de Valentina

Invitación web interactiva, mobile-first, con una estética mágica y cinematográfica. Incluye introducción animada, información del evento, mapa, galería, RSVP y la ceremonia del Sombrero Seleccionador para consultar casa, mesa y lugares.

## Invitación y Sombrero en un solo proyecto

La invitación vive en la raíz y el Sombrero en `sombrero/`. Desde la sección «Descubre tu lugar» se accede a la ceremonia, y desde ella se puede volver a la invitación. Ambos comparten el servidor de desarrollo y el export.

```bash
npm install
npm run dev
```

Abre la dirección que muestra Vite para probar toda la experiencia. Para validar y generar el sitio completo:

```bash
npm run lint
npm run test
npm run typecheck
npm run build
npm run preview
```

El resultado está en `dist/`: sube el **contenido completo** de esta carpeta a la carpeta del evento en el servidor, conservando `sombrero/` y `assets/`. Las rutas son relativas y funcionan también en una subcarpeta del dominio.

Los nombres oficiales se guardan localmente en `sombrero/src/private/guests.json`, que está excluido de Git. El build oficial falla si el archivo no existe; el servidor de desarrollo usa nombres ficticios en su ausencia. Guarda una copia privada del archivo si trabajas desde otra computadora.

El propietario aceptó que la lista de invitados esté incluida en el sitio estático: **cualquier persona que acceda puede descargarla completa**. Esta versión no tiene autenticación ni consulta privada.

Los textos de la nueva sección se editan en `public/invitacion.json`, dentro de `sorting`. La pantalla intermedia del Sombrero se puede activar con `VITE_SHOW_GUEST_CONFIRMATION=true` en `.env.local`.

## Tecnologías

- HTML5
- SCSS
- JavaScript
- Vite
- GSAP
- React y TypeScript para la experiencia del Sombrero
- Google Fonts

El resultado de producción es un sitio estático. No necesita PHP, base de datos, Node.js ni procesos activos en el servidor.

## Requisitos para desarrollo

- Node.js `20.19` o posterior, o `22.12` o posterior
- npm

Node.js solo es necesario en la computadora donde se desarrolla y genera el proyecto. No es necesario instalarlo en Hostinger.

## Instalación local

Desde la carpeta raíz del proyecto:

```bash
npm install
npm run dev
```

Vite mostrará una dirección local, normalmente:

```text
http://localhost:5173
```

## Contenido editable

Toda la información que normalmente debe actualizarse está centralizada en:

```text
public/invitacion.json
```

Este archivo permite cambiar, sin tocar JavaScript ni HTML:

- nombre, iniciales y título de la celebración;
- textos de la introducción y las secciones;
- fecha y hora del evento;
- fecha utilizada por la cuenta regresiva;
- salón, dirección y ciudad;
- enlace de Google Maps;
- código de vestimenta;
- textos de la galería;
- enlace de mesa de regalos y formulario de confirmación;
- textos de navegación y RSVP;
- título y descripción del navegador;
- visibilidad del menú de navegación.

### Formato de fecha

La fecha debe conservar el formato ISO con zona horaria:

```json
"date": "2026-10-18T19:00:00-06:00"
```

Para México central, `-06:00` representa el desfase horario utilizado en el ejemplo. Los textos visibles de la fecha se controlan de manera independiente mediante `dateParts`:

```json
"dateParts": {
  "day": "18",
  "month": "Octubre",
  "year": "2026",
  "short": "18 · 10 · 26"
}
```

Al cambiar la fecha, hay que actualizar tanto `date` como `dateParts` para que la cuenta regresiva y el texto visible coincidan.

### Enlaces externos

Agrega los enlaces finales en `public/invitacion.json`:

```json
"giftRegistry": {
  "url": "https://..."
},
"rsvp": {
  "method": "google-forms",
  "formUrl": "https://docs.google.com/forms/..."
}
```

Mientras alguna URL esté vacía, su botón se mostrará deshabilitado.

### Mostrar u ocultar la navegación

Dentro de `features`, utiliza un valor booleano sin comillas:

```json
"features": {
  "navigation": true
}
```

- `true`: el menú aparece después de la introducción.
- `false`: el menú permanece completamente oculto.

### Reglas al editar el JSON

- Conserva las llaves, comas y comillas existentes.
- No agregues una coma después del último campo de un objeto.
- Usa `true` y `false` sin comillas.
- Guarda el archivo como UTF-8 para conservar acentos y la letra ñ.
- Puedes validar el formato en Visual Studio Code antes de publicarlo.

Si el archivo no puede cargarse o tiene un formato incorrecto, la invitación utiliza datos de respaldo y muestra una advertencia en la consola del navegador.

## Comandos disponibles

### Servidor de desarrollo

```bash
npm run dev
```

### Generar la versión de producción

```bash
npm run build
```

El resultado se crea en:

```text
dist/
```

### Revisar la versión de producción localmente

```bash
npm run preview
```

Abre en el navegador la dirección mostrada por Vite.

## Publicación en Hostinger

1. Completa y revisa `public/invitacion.json`.
2. Ejecuta `npm run build` en tu computadora.
3. Abre la carpeta `dist`.
4. Comprime el contenido de `dist` en un archivo ZIP.
5. En Hostinger, entra a `Sitios web → Dashboard → Administrador de archivos`.
6. Abre la carpeta `public_html` del dominio.
7. Sube el ZIP y extrae su contenido directamente dentro de `public_html`.

La estructura publicada debe quedar así:

```text
public_html/
├── index.html
├── invitacion.json
└── assets/
```

No debe quedar anidada dentro de otra carpeta:

```text
public_html/dist/index.html  ← incorrecto
```

Solo se debe subir el contenido de `dist`. No es necesario subir `src`, `public`, `node_modules`, `docs` ni los archivos de configuración del proyecto.

## Actualizaciones después de publicar

Si solo cambian textos, fecha, dirección, mapa, WhatsApp o el feature flag del menú, se puede editar directamente:

```text
public_html/invitacion.json
```

En ese caso no es necesario volver a generar el build.

Sí se debe ejecutar nuevamente `npm run build` cuando se modifique:

- HTML;
- JavaScript;
- SCSS;
- imágenes o SVG dentro de `src`;
- animaciones o comportamiento de la invitación.

Después de un nuevo build, reemplaza `index.html` y la carpeta `assets` del servidor con los nuevos archivos de `dist`. Conserva también la versión correcta de `invitacion.json`.

## Estructura principal

```text
├── public/
│   └── invitacion.json       # Información editable del evento
├── src/
│   ├── assets/               # Recursos visuales
│   ├── js/                   # Lógica y animaciones
│   └── scss/                 # Estilos
├── index.html                # Estructura de la invitación
├── package.json              # Dependencias y comandos
└── dist/                     # Resultado generado para publicación
```

## Lista de comprobación antes de publicar

- Revisar nombre e iniciales.
- Confirmar la fecha visible y la fecha del countdown.
- Probar el enlace de Google Maps.
- Probar el número y mensaje de WhatsApp.
- Decidir si el menú estará visible.
- Ejecutar `npm run build` sin errores.
- Revisar el resultado con `npm run preview`.
- Comprobar la invitación desde un teléfono.
- Verificar que el dominio utilice HTTPS.

## Fuentes y contenido externo

Las tipografías se cargan desde Google Fonts, por lo que requieren conexión a internet. El mapa y la confirmación de asistencia se abren como enlaces externos hacia Google Maps y WhatsApp.
