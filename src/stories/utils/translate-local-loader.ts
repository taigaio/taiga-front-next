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
