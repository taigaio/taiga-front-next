import { Application } from '../applications/application.model';

export interface ApplicationToken {
  application: Application;
  authCode: string;
  id: number;
  nextUrl: string;
  user: number;
}

export interface AuthorizeInput {
  application: string;
  state: string;
}

export interface ValidateInput {
  application: string;
  authCode: string;
  state: string;
}
