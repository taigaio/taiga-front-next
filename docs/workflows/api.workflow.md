# Creating a new api module

Creating an `Example` module in the api folder.

```bash
ng g m api/example
```

Add `HttpClientModule` and `AuthInterceptorModule` to the imports list.

```ts
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptorModule } from '@/app/commons/auth-interceptor/auth-interceptor.module';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    AuthInterceptorModule,
  ]
})
export class ExampleModule { }
```

Creating a service

```bash
ng g service api/example/ExampleApi
```

If we're going to have multiple services in this module we must create a `services` folder.

We also have to create the interface models, in this example in `src/app/api/example/example.model.ts`

Api service example

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@/app/config.service';
import { Example } from './example.model';

@Injectable({
  providedIn: 'root'
})
export class ExampleApiService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public getData() {
    return this.http.get<Example>(`${this.config.apiUrl}/example`);
  }
}
```

For testing we're using [spectator](https://github.com/ngneat/spectator). This is the test of the previous service example.

```ts
import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { ExampleApiService } from './example-api.service';
import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';

describe('ExampleApiService', () => {
  let spectator: SpectatorHttp<ExampleApiService>;
  const createHttp = createHttpFactory({
    service: ExampleApiService,
    providers: [
      { provide: ConfigService, useValue: ConfigServiceMock },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('get data', () => {
    spectator.service.getData().subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/example`, HttpMethod.GET);
  });
});
```
