import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { TgCheckboxComponent } from './checkbox.component';

describe('TgCheckboxComponent', () => {
  let spectator: Spectator<TgCheckboxComponent>;
  const createComponent = createComponentFactory({
    component: TgCheckboxComponent,
  });

  beforeEach(() => spectator = createComponent({
    props: {
      labelPosition: 'after',
    },
    detectChanges: false,
  }));

  it('should set a default label class', () => {
    spectator.detectChanges();
    expect(spectator.query('label')).toHaveClass('label-after');
  });

  it('should set different label class if label set before checkbox', () => {
    spectator.setInput('labelPosition', 'before');
    spectator.detectChanges();
    expect(spectator.query('label')).toHaveClass('label-before');
  });

});
