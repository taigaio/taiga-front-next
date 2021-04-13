import { Project } from '@/app/api/projects/projects.model';

export interface NotifyPolicyDetail {
  id: number;
  liveNotifyLevel: number;
  project: Project['id'];
  projectName: string;
  webNotifyLevel: boolean;
}
