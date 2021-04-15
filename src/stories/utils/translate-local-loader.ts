/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { of, Observable } from 'rxjs';
import en from '@/assets/i18n/en.json';

class LocalTranslateLoader implements TranslateLoader {
  getTranslation(): Observable<object> {
    return of(en);
  }
}

export const StoryBookTranslationModule = () => {
  return TranslateModule.forRoot({
    loader: {provide: TranslateLoader, useClass: LocalTranslateLoader},
    defaultLanguage: 'en',
  });
};
