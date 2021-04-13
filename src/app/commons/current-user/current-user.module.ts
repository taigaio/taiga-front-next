import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CurrentUserApiModule } from '@/app/api/current-user/current-user-api.module';
import { CurrentUserEffects } from './effects/current-user.effects';
import * as fromCurrentUser from './reducers/current-user.reducer';

@NgModule({
  declarations: [],
  imports: [
    CurrentUserApiModule,
    StoreModule.forFeature(fromCurrentUser.currentUserFeatureKey, fromCurrentUser.reducer),
    EffectsModule.forFeature([CurrentUserEffects]),
  ],
})
export class CurrentUserModule { }
