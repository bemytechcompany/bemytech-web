# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## 📱 Páginas legales por app

Cada app de la casa se registra como contenido en `content/apps/<slug>/` y el
sitio genera sus páginas automáticamente (SSG, sin JavaScript). Estas URLs van
en las fichas de Google Play y App Store: **una vez publicadas, nunca cambian**.

| Ruta | Contenido |
| :-- | :-- |
| `/<slug>` | Landing mínima de la app |
| `/<slug>/privacidad` | Política de privacidad |
| `/<slug>/terminos` | Términos y condiciones |
| `/<slug>/eliminar-cuenta` | Cómo eliminar la cuenta (requisito de Google Play) |
| `/<slug>/seguridad-infantil` | Estándares de seguridad infantil CSAE (opcional: solo apps Social/Citas) |

Los slugs no registrados devuelven 404 real. Las páginas se listan también en
la sección "Nuestras Apps" del home y entran al sitemap.

### Agregar una app nueva (cero código)

1. Crear `content/apps/<nueva>/` con 4 archivos:
   `meta.json`, `privacidad.md`, `terminos.md`, `eliminar-cuenta.md`
   (copiar `content/apps/chispa/` como plantilla).
   Opcional: `seguridad-infantil.md` (estándares CSAE, requerido por Google
   Play solo para apps de categoría Social/Citas); si no existe, la ruta
   responde 404 y no se enlaza.
2. Hacer deploy.

`meta.json` define nombre, tagline, descripción, email de soporte, colores
(`gradiente`, `colorLink`) y `updatedAt`. El H1 de cada `.md` es el título de
la página.
