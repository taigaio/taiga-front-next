/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { Project } from '../projects/projects.model';

export interface TrelloAuthToken {
  url: string;
}

export interface GithubAuthToken {
  url: string;
}

export interface JiraAuthUrl {
  url: string;
}

export interface JiraAuthToken extends JiraAuthUrl {
  token: string;
}

export interface AsanaAuthUrl {
  url: string;
}

export interface AsanaAuthToken {
  token: {
    access_token: string;
    data: {
      email: string;
      id: number;
      name: string;
    },
    expires_in: number;
    refresh_token: string;
    token_type: string;
  };
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

export interface GithubUser {
  full_name: string;
  id: number;
  user: {
    full_name: string;
    gravatar_id: string;
    id: number;
    photo: string;
  };
  username: string;
}

export interface JiraUser {
  email: string;
  full_name: string;
  id: number;
  user: {
    full_name: string;
    gravatar_id: string;
    id: number;
    photo: string;
  };
}

export interface AsanaUser {
  full_name: string;
  id: number;
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
  isPrivate: boolean;
  name: string;
}


export interface GithubProject {
  description: string;
  id: string;
  isPrivate: boolean;
  name: string;
}

export interface JiraProject {
  description: string;
  id: string;
  isPrivate: boolean;
  name: string;
  type: string;
}

export interface AsanaProject {
  description: string;
  id: string;
  isPrivate: boolean;
  name: string;
}


export interface ImportedTrelloProject {
  isBacklogActivated: boolean;
  isKanbanActivated: boolean;
  myPermissions: string[];
  slug: string;
}

export interface ImportedGithubProject {
  isBacklogActivated: boolean;
  isKanbanActivated: boolean;
  myPermissions: string[];
  slug: string;
}

export interface ImportedJiraProject {
  isBacklogActivated: boolean;
  isKanbanActivated: boolean;
  myPermissions: string[];
  slug: string;
}

export interface ImportedAsanaProject {
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

export interface GithubImportData {
  description: Project['description'];
  isPrivate: Project['isPrivate'];
  keepExternalReference: boolean;
  name: Project['name'];
  project: string;
  template: string;
  token: string;
  usersBindings: Record<string, string>;
}

export interface JiraImportData {
  description: Project['description'];
  isPrivate: Project['isPrivate'];
  keepExternalReference: boolean;
  name: Project['name'];
  project: string;
  projectType: string;
  template: string;
  token: string;
  url: string;
  usersBindings: Record<string, string>;
}

export interface AsanaImportData {
  description: Project['description'];
  isPrivate: Project['isPrivate'];
  keepExternalReference: boolean;
  name: Project['name'];
  project: string;
  template: string;
  token: AsanaAuthToken;
  usersBindings: Record<string, string>;
}

export interface ImportProjectTask {
  taskId: string;
}
