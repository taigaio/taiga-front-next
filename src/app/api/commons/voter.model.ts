import { User } from '@/app/api/users/users.model';

export type Voter = Pick<User, 'fullName' | 'id' | 'username'>;

