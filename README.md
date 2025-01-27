# Nuxt 3 template

This is modern nuxt 3 project template

## Https

After cloning repository recomended to generate certs for https

Try [mkcert](https://github.com/FiloSottile/mkcert) to create locally-trusted certs or anything else

Put it in `~/certs/`

## Installation

Recommended to use Bun as a package manager

To setup the project you need to run

```powershell
bun run setup
```

this will refresh and install all dependencies

To run the project you need to run

```powershell
bun run dev
```

## Update and adding dependencies

To update outdated dependencies you need to check it firstly

```powershell
bun outdated
```

than you can run

```powershell
bun run setup --force
```

to delete lock file and recreate it due to package.json file

## IDE Extensions

### Recommended IDE - VSCode

- [Prettier](https://prettier.io/docs/en/editors.html)
- [Volar (VSCode only)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [ESLint](https://eslint.org/docs/latest/use/integrations#editors)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
