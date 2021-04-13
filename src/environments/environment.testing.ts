import { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  configLocal: {
    api: 'https://api.taiga.io/api/v1/',
    defaultLanguage: 'en',
  },
};
