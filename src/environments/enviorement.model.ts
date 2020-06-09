export interface Environment {
  production: boolean;
  configLocal?: {
    api: string,
  };
  configRemote?: string;
}
