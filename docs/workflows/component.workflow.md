# Creating a new component

Create an `Example` component in the commons/components folder.

```bash
ng generate component commons/components/Example
```
Set the component name and selector using the `tg` prefix and remove the unused OnInit function

```ts
@Component({
  selector: 'tg-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TgExampleComponent {

  constructor() { }

}
```
Where possible, we should try to maintain the same element interface as the standard HTML elements. Let's say we create a tgButton, we can expect it to implement a class, type, disabled or aria-label attributes plus any other required Inputs, such as the variant.

As a reminder

- `@Attribute` will read an attribute from the host tag and bind it to a component variable once, on the constructor. This is useful for binding attributes that won't change.
- `@Hostbinding` is the same as @Attribute, but the binding will be listened for changes in the host and updated in the component.

Implement the `:host` selector in the CSS to set the styles of the host container.

Use the `ChangeDetectionStrategy.OnPush` by default meaning that automatic change detection is deactivated. Change detection can still be explicitly invoked.


## Testing

For testing we're using [spectator](https://github.com/ngneat/spectator). This is the test of the previous service example.

```ts
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TgExampleComponent } from './example.component';

describe('ButtonComponent', () => {
  let spectator: Spectator<TgExampleComponent>;
  const createComponent = createComponentFactory(TgExampleComponent);

  beforeEach(() => spectator = createComponent({
    // The component inputs
    props: {
      name: 'example'
    },
    // Override the component's providers
    providers: [],
    // Whether to run change detection (defaults to true)
    detectChanges: false
  }));

  it('should have a success class by default', () => {
    // This test checks that the input attribute name becomes a class in the component structure
    expect(spectator.query('div')).toHaveClass('example');
  });
});
```

## Storybook

Create a new `n-componentName.stories.ts` file under the `stories` folder. For example `3-tgExample.stories.ts`

Use knobs to allow the design team to interact with the component and test the inputs and attributes. 

```ts
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { text, boolean, withKnobs, select } from '@storybook/addon-knobs';
import { CommonComponentsModule } from '@/app/commons/components/common-components.module';
import faker from 'faker';

storiesOf('tgExample', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [
        TgOtherExampleComponent // Declare any other component required
      ],
      imports: [
        CommonComponentsModule, //Import CommonsModules to access to shared components
      ],
    })
  )
  .add('Example Component', () => {
    const loading = boolean('Loading', false);
    return {
      template: `
        <tg-example [loading]="loading">
          Example text
        </tg-example>
      `,
      props: {
        loading,
      },
    };
  });
```
