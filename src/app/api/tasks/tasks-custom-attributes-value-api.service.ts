import { Injectable } from '@angular/core';
import { ConfigService } from '@/app/config.service';
import { HttpClient } from '@angular/common/http';
import { TaskCustomAttributeValues } from './task-custom-attribute.model';

@Injectable()
export class TasksCustomAttributesValueApiService {
  constructor(private http: HttpClient, private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/task-custom-attributes`;
  }

  public get(id: number) {
    return this.http.get<TaskCustomAttributeValues>(`${this.base}/${id}`);
  }

  public put(id: number, values: Record<string, string>) {
    return this.http.put<TaskCustomAttributeValues>(`${this.base}/${id}`, values);
  }

  public patch(id: number, values: Record<string, string>) {
    return this.http.patch<TaskCustomAttributeValues>(`${this.base}/${id}`, values);
  }
}
