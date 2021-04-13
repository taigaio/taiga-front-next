import { of } from 'rxjs';

export class LegacyServiceMock {
  _breadcrumb = [];
  _section = '';

  legacyState = of({});

  getInjector() {
    return {
      get:  () => {
        return {
          sectionsBreadcrumb: {
            toJS: () => this._breadcrumb,
          },
          section: this._section,
        };
      },
    };
  }
}
