import { Project } from '@/app/api/projects/projects.model';
import { User } from '@/app/api/users/users.model';

export interface ContactProject {
  comment: string;
  createdDate: string;
  id: number;
  project: Project['id'];
  user: User['id'];
}
