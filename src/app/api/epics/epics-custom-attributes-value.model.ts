import { Epic } from '@/app/api/epics/epics.model';

export interface EpicCustomAttributeValueDetail {
  attributesValues: Record<string, string>;
  epic: Epic['id'];
  version: number;
}

export type EpicCustomAttributeValueDetailPartialInput = Partial<EpicCustomAttributeValueDetail>;
