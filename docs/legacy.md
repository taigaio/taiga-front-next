This changes were made to mix taiga-front & taiga-front-next with angular-elements.

Package.json

- @angular/elements
- document-register-element

New files

- /src/main-webcomponent.ts
- /src/app/webcomponent.module.ts
- tsconfig.webcomponent.json

Modified files

- package.json - new tasks (*:elements)
- tsconfig - tsconfig.webcomponent.json added
- polyfills.ts - `import 'document-register-element';`
