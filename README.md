<p align="center">
  <img width="200" src="https://img.favpng.com/11/16/9/bbva-los-molinos-logo-brand-product-png-favpng-NX5S8uz0qhKnVZjUAW3VVupxY.jpg"></img>
</p>

## Open-wc Starter App

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

## Descripcion

En este proyecto llamado Memory Card, lo he montado sobre open-wc que es conjunto de herramientas para facilitar el desarrollo de aplicaciones web con estándares web abiertos que incluye Lit, que es una libreria basada en web componentes y es la evolución de LitElement.

1. Primer paso a considerar.
Instalamos nuestras dependencias usando nuestro administrador de paquetes, recuerda que debe de ser superior a la version 10 y la version de node
a la version 10, vienen en el mismo instalador.

Nos situamos en el paquete donde hemos clonado nuestro proyecto e instalamos las dependencias.
Ir al paquete:

```bash
cd memory-card
```

Instalar dependencias:

```bash
npm install
```

2. Segundo paso.
Arrancamos el proyecto, nuestro proyecto para arrancarlo necesitamos un comando llamado `npm run start` que esta en nuestro **package.json**
que estan nuestros scripts de arranque de proyecto, construccion de proyecto y testeos, aunque he puesto otro framework de testeo llamado `test-cucumber` y tambien he usado el recomendado por Lit que es Esto es un [web test runner](https://lit.dev/docs/tools/testing/) ya que recordemos que Lit esta en desarrollo y puede que tengamos problemas a la hora de configuracion de librerias externas.

Arrancamos proyecto:

```bash
npm run start
```

3. Tercer paso.
Ahora en nuestro proyecto ingresamos el nombre, ese nombre nos genera un token, lo he puesto para no saltar de una vista a otra, por ejemplo no escribir una ruta en tu navegador e ir directamente hacia la vista del juego, en la vista card seleccionamos nuestra dificultad y le damos al boton `Play` y seleccionamos una card, como podemos observar tenemos un contador restante en base a nuestra dificultad, también un contador con nuestra puntuacion en base a la dificultad seleccionada ademas en dispositivos moviles si fallamos nos vibrará un segundo.
Podemos seleccionar cualquier nivel que queramos para bajar o subir nuestra dificultad.

4. Cuarto paso.
En este paso va a estar enfocado a los testeos, he usado la libreria que nos ofrece open-wc para ver que pasamos de una vista a otra manejando los elementos proporcionados como botones, inputs o selectores, la libreria de testos `@open-wc/testing` es la mas recomendada, ya que podemos tambien configurar polyfills para navegadores antiguos o versiones antiguas.

Arrancar testeos con web driver:

```bash
npm run test
```

He puesto algunos pasos como, vista-login, logeo, introduccion de datos, pasar vista view-card, seleccionar dificultad y click en card.

Tambien he realizado test con `test-cucumber` recuerda que debes de tener WebDriver de chrome para arrancarlo y tu entorno de local debe de ser el correcto, este testeo es opcional ya que me dió problemas en los selectores, yo en bbva usaba el selector `data-test-id` para manipular los testeos desde cells-pepino.

Arrancar testeos con test-cucumber:
```bash
npx cucumber-js --config=./features/cucumber.conf.cjs
```

## Consideraciones importantes de nuestra PWA y usos en nuestra App

He usado para una navegacion entre componentes una biblioteca de ayuda `pwa-helpers` y en ella he usado la funcion `installRouter` para hacer una navegacion que permite gestionar las rutas y direcciones URL dentro de una aplicación, permitiendo la navegación entre diferentes vistas o componentes según las URL solicitadas por el usuario.

También he usado los `serviceWorkers` en la aplicacion lo cual la configuración que he realizado de cachear nuestra App nos permite usar la aplicación sin conexión a internet, por ejemplo si voy al portal de la aplicación, por eso he usado tambien `workbox-cli` para tener una configuracion mas completa para adaptar la necesidades que queremos cuando la aplicacion funcione offline.

## Despliegue de la aplicación

Normalmente para realizar despliegues en la aplicacion se usa Jenkins o AzureDevOps con pipelines, aunque yo he preferido usar netlify para realizar este tipo de pruebas en producción despues de hacer el buildeo de nuestra app.

Memory card desplegado:

<https://memory-card-juan.netlify.app/>


## Scripts

- `start` runs your app for development, reloading on file changes
- `start:build` runs your app after it has been built using the build command
- `build` builds your app and outputs it in your `dist` directory
- `test` runs your test suite with Web Test Runner
- `lint` runs the linter for your project
- `format` fixes linting and formatting errors

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.
