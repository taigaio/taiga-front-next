import { Config } from '@/app/models/config.model';

export interface Environment {
  production: boolean;
  configLocal?: Config;
  configRemote?: string;
}
