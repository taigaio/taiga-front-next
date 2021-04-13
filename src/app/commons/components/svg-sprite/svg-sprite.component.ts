import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tg-svg-sprite',
  templateUrl: './svg-sprite.component.html',
  styles: [
    `:host { display: none; }`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TgSvgSpriteComponent {}
