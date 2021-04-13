import { Environment } from './environment.model';

import config from '../configs/config.json';

export const environment: Environment = {
  production: true,
  configLocal: config,
};
