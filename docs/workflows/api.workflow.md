# Creating a new api module

Creating an `Example` module in the api folder.

```bash
ng g m api/example
```

Add `HttpClientModule` to the imports list.

```ts
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
  ]
})
export class ExampleModule { }
```

Creating a service

```bash
ng g service api/example/ExampleApi
```

If we're going to have multiple services in this module we must create a `services` folder.

```bash
ng g service api/example/ExampleApi
```

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

  public getDiscover() {
    return this.http.get<Example>(`${this.config.apiUrl}/example`);
  }
}
```
