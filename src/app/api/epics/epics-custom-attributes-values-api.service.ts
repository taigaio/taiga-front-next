import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@/app/config.service';
import { EpicCustomAttributeValueDetail, EpicCustomAttributeValueDetailPartialInput } from './epics-custom-attributes-value.model';


@Injectable()
export class EpicsCustomAttributesValuesApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/epics/custom-attributes-values`;
  }

  public get(epic: number) {
    return this.http.get<EpicCustomAttributeValueDetail>(`${this.base}/${epic}`);
  }

  public patch(id: number, data: EpicCustomAttributeValueDetailPartialInput) {
    return this.http.patch<EpicCustomAttributeValueDetail>(`${this.base}/${id}`, data);
  }
}
