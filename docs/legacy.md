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

Copy the result file to taiga-front `cp ./dist/elements/elements.js ../taiga-front/`

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

```
  @.nextProjectMenu = {
      component: 'tg-project-navigation',
      params: {
          project: @projectService.project.toJS()
      },
      events: {
          search: () =>
              @.search()
      }      
  }
```

Remember keep the locales sync in `src/assets/i18n/` (taiga-front-next) and `app/locales/taiga` (taiga-front)

For the webcomponent we had to add :host in every :root, because :root doesn't refer to the webcomponent root and we still need :root for storybook and playground. 

```css
:root,
:host {}
```

`project-logo.directive`, using the version prefix for the assets

`project-navigation.component`, is using a service from taiga-front to know previous sections.

If you have to add legacy in modern code add the comment // LEGACY

#### Working with elements.js in taiga-front repo

Ignore changes in the file

```
git update-index --skip-worktree elements.js
```

If you want to commit elements.js you have to undo the skip-worktree

```
git update-index --no-skip-worktree elements.js
```

Then commit, push and skip-worktree again.


#### Events from taiga-front to taiga-front-next

In taiga-front, you have to send an event through the RX subject `legacyChannel`

```js
  window.legacyChannel.next({
      type: 'SET_DETAIL_OBJ',
      value: task._attrs
  })
```

Then you have to control the event in `legacy.component.ts`.

```ts
channel.subscribe((event) => {
  if (event.type === 'SET_DETAIL_OBJ') {
    this.legacyService.setState({
      detailObj: UtilsService.objKeysTransformer(event.value, camelCase) as any,
    });
  }
});
```

In this example we are changing the state defined in `legacy.service.ts`.

You can read the legacy state like this.

```ts
  this.milestoneId$ = this.legacyService.legacyState
  .pipe(
    pluck('detailObj'),
    map((obj) => {
      return obj?.milestone;
    })
  );
```
