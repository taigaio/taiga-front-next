This changes were made to mix taiga-front & taiga-front-next with angular-elements.

Package.json

- @angular/elements
- document-register-element

New files

- /src/main-webcomponent.ts
- /src/app/webcomponent.module.ts
- tsconfig.webcomponent.json
- /src/legacy

Modified files

- package.json - new tasks (*:elements)
- tsconfig - tsconfig.webcomponent.json added
- polyfills.ts - `import 'document-register-element';`


How to use a component from taiga-front-next in taiga-front

1. Add the component to webcomponent.module.ts or legacy-loader if your component has translations.
2. Build npm run build:elements && npm run pack:elements
3. Copy the result file to taiga-front node_modules `cp ./dist/elements/elements.js ../taiga-front-next/node_modules`
4. User the component in taiga-front, with the tag or the legacy-loader `tg-legacy-loader(component="tg-project-navigation")`
