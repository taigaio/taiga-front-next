import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { TgLoadingComponent } from '../loading/loading.component';

describe('ButtonComponent', () => {
  let spectator: Spectator<TgLoadingComponent>;
  const createComponent = createComponentFactory({
    component: TgLoadingComponent,
  });

  beforeEach(() => spectator = createComponent());

  it('should have a success class by default', () => {
    expect(spectator.query('div')).toHaveClass('loading');
  });

});
