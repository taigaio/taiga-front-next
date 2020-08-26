/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
