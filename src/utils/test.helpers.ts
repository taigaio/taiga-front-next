import { HttpParams } from '@angular/common/http';

export const parseQueryParams = (params: Record<string, string>) => {
  return new HttpParams({
    fromObject: params,
  });
};
