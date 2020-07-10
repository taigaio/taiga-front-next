/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Project } from '../projects/projects.model';

export interface TrelloAuthToken {
    url: string;
}

export interface TrelloUser {
  email: string;
  full_name: string;
  id: string;
  user: {
      full_name: string;
      gravatar_id: string;
      id: number;
      photo: string;
  };
}

export interface TrelloProject {
  description: string;
  id: string;
  is_private: boolean;
  name: string;
}

export interface ImportedTrelloProject {
  isBacklogActivated: boolean;
  isKanbanActivated: boolean;
  myPermissions: string[];
  slug: string;
}

export interface TrelloImportData {
  description: Project['description'];
  isPrivate: Project['isPrivate'];
  keepExternalReference: boolean;
  name: Project['name'];
  project: string;
  template: string;
  token: string;
  usersBindings: Record<string, string>;
}

export interface ImportProjectTask {
  taskId: string;
}
