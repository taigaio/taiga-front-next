import * as Factory from 'factory.ts';
import { Auth } from './auth.model';
import * as faker from 'faker';
import { UserMockFactory } from '@/app/api/users/users.model.mock';

export const AuthMockFactory: Factory.Sync.Factory<Auth> = Factory.Sync.makeFactory({
  authToken: faker.random.uuid(),
})
.combine(UserMockFactory);
