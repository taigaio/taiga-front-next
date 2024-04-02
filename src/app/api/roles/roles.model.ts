/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { Project } from '@/app/api/projects/projects.model';

export enum Permissions {
  // Epic
  viewEpics = 'view_epics',
  addEpic = 'add_epic',
  modifyEpic = 'modify_epic',
  commentEpic = 'comment_epic',
  deleteEpic = 'delete_epic',
  // Milestone
  viewMilestones = 'view_milestones',
  addMilestone = 'add_milestone',
  modifyMilestone = 'modify_milestone',
  deleteMilestone = 'delete_milestone',
  // User Story
  viewUserstory = 'view_us',
  addUserstory = 'add_us',
  modifyUserstory = 'modify_us',
  commentUserstory = 'comment_us',
  deleteUserstory = 'delete_us',
  // Task
  viewTasks = 'view_tasks',
  addTask = 'add_task',
  commentTask = 'comment_task',
  modifyTask = 'modify_task',
  deleteTask = 'delete_task',
  // Issue
  viewIssues = 'view_issues',
  addIssue = 'add_issue',
  commentIssue = 'comment_issue',
  modifyIssue = 'modify_issue',
  deleteIsue = 'delete_issue',
  // Wiki Link
  viewWikiLinks = 'view_wiki_links',
  addWikiLink = 'add_wiki_link',
  modifyWikiLink = 'modify_wiki_link',
  deleteWikiLink = 'delete_wiki_link',
  // Wiki Page
  viewWikiPages = 'view_wiki_pages',
  addWikiPage = 'add_wiki_page',
  modifyWikiPage = 'modify_wiki_page',
  commentWikiPage = 'comment_wiki_page',
  deleteWikiPage = 'delete_wiki_page',
  // Project
  viewProject = 'view_project',
  modifyProject = 'modify_project',
  adminProjectValues = 'admin_project_values',
  deleteProject = 'delete_project',
  addMember = 'add_member',
  removeMember = 'remove_member',
  adminRoles = 'admin_roles',
}

export interface Role {
  readonly id: number;
  name: string;
  slug: string;
  project: number;
  order: number;
  computable: boolean;
  permissions: Permissions[];
  readonly membersCount?: number;
}

export interface RoleInput {
  name: string;
  project: Project['id'];
  order: number;
  computable: boolean;
  permissions: Permissions[];
}

export type RolePartialInput = Partial<RoleInput>;
