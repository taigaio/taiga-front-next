import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tg-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TgLoadingComponent {

  constructor() { }

}
