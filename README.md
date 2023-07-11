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
Ahora en nuestro proyecto ingresamos el nombre, ese nombre nos genera un token, lo he puesto para no saltar de una vista a otra, por ejemplo no escribir una ruta en tu navegador e ir directamente hacia la vista del juego, en la vista card seleccionamos nuestra dificultad y le damos al boton > Este párrafo será una cita y en HTML se mostrará con la etiqueta <button>.

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
