import { Attachment } from '@/app/api/commons/attachment.model';
import { User } from '@/app/api/users/users.model';

export interface HistoryEntry {
  comment: string;
  commentHtml: string;
  createdAt: string;
  deleteCommentDate: null | string;
  deleteCommentUser: null | string;
  diff: {
    attachments: Attachment[][];
    sprintOrder: number[];
  };
  editCommentDate: null | string;
  id: string;
  isHidden: boolean;
  isSnapshot: boolean;
  key: string;
  snapshot: null | string;
  type: number;
  user: Pick<User, 'gravatarId' |
  'isActive' |
  'photo' |
  'username'> & {
    name: string;
    pk: number;
  };
  values: {
    users: Record<string, User>;
  };
  valuesDiff: {
    sprintOrder: number[];
  };
}

export type HistoryEntryType = 'userstory' | 'task' | 'issue' | 'wikipage';

export interface HistoryEntryComment {
  comment: string;
  commentHtml: string;
  date: string;
  user: Pick<User , 'bigPhoto' |
  'bio' |
  'color' |
  'fullName' |
  'fullNameDisplay' |
  'gravatarId' |
  'id' |
  'isActive' |
  'lang' |
  'photo' |
  'roles' |
  'theme' |
  'timezone' |
  'username'>;
}
