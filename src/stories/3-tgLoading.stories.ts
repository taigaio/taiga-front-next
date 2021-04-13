import { moduleMetadata, storiesOf } from '@storybook/angular';
import { CommonComponentsModule } from '@/app/commons/components/common-components.module';
import { TgSvgSpriteComponent } from '@/app/commons/components/svg-sprite/svg-sprite.component';

storiesOf('tgLoading', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        TgSvgSpriteComponent,
      ],
      imports: [
        CommonComponentsModule,
      ],
    })
  )
  .add('Loading', () => {
    return {
      template: `
      <tg-loading></tg-loading>
      <tg-svg-sprite hidden></tg-svg-sprite>
      `,
    };
  });
