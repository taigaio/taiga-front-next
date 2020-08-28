This changes were made to mix taiga-front & taiga-front-next with angular-elements.

Package.json

- @angular/elements
- document-register-element
- elements-zone-strategy

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

Add the component to webcomponent.module.ts or legacy-loader if your component has translations.

Build npm run build:elements && npm run pack:elements

Copy the result file to taiga-front node_modules `cp ./dist/elements/elements.js ../taiga-front/node_modules`

Use the component in taiga-front, with the tag or the legacy-loader 

```
tg-legacy-loader(component="tg-project-navigation", params="{projectId: 2}")
```

If your component has dynamic data you must use AngularJS directive `tg-load-element`

```
tg-legacy-loader(
    tg-load-element="vm.nextProjectMenu"
)
```

Remember keep the locales sync in `src/assets/i18n/` (taiga-front-next) and `app/locales/taiga` (taiga-front)


For the webcomponent we had to add :host in every :root, because :root doesn't refer to the webcomponent root and we still need :root for storybook and playground. 

```css
:root,
:host {}
```
