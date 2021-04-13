import { Pipe, PipeTransform } from '@angular/core';
import { UtilsService } from '../utils/utils-service.service';
import { camelCase } from 'change-case';

@Pipe({name: 'camelCaseTransformer'})
export class CamelCaseTranformerPipe implements PipeTransform {
  transform(value: object | ArrayLike<unknown>): any {
    return UtilsService.objKeysTransformer(value, camelCase);
  }
}
