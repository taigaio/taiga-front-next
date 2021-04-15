/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { ProjectsApiService } from './projects-api.service';
import { SpectatorHttp, createHttpFactory, HttpMethod } from '@ngneat/spectator';
import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';
import * as faker from 'faker';
import { ProjectsListOrderBy } from './projects.model';
import { UtilsService } from '@/app/commons/utils/utils-service.service';
import { UserMockFactory } from '@/app/api/users/users.model.mock';
import { parseQueryParams } from '@/utils/test.helpers';

describe('ProjectsApiService', () => {
  let spectator: SpectatorHttp<ProjectsApiService>;
  let projectId: number;

  const createHttp = createHttpFactory({
    service: ProjectsApiService,
    providers: [
      { provide: ConfigService, useValue: ConfigServiceMock },
    ],
  });

  function getNewProject() {
    return {
      name: faker.commerce.productName(),
      description: faker.lorem.paragraphs(),
      creationTemplate: faker.random.number(),
      isBacklogActivated: faker.random.boolean(),
      isIssuesActivated: faker.random.boolean(),
      isKanbanActivated: faker.random.boolean(),
      isPrivate: faker.random.boolean(),
      isWikiActivated: faker.random.boolean(),
      videoconferences: faker.lorem.word(),
      videoconferencesExtraData: faker.lorem.word(),
      totalMilestones: faker.random.number(),
      totalStoryPoints: faker.random.number(),
    };
  }

  beforeEach(() => {
    spectator = createHttp();
    projectId = faker.random.number();
  });

  it('list', () => {
    const filters = {
      member: faker.random.number(),
      members: [faker.random.number(), faker.random.number()],
      isLookingForPeople: faker.random.boolean(),
      isFeatured: faker.random.boolean(),
      isBacklogActivated: faker.random.boolean(),
      isKanbanActivated: faker.random.boolean(),
    };

    const orderBy = ProjectsListOrderBy.totalActivity;

    const queryParams = UtilsService.buildQueryParams({
      ...filters,
      orderBy,
    }).toString();

    spectator.service.list(filters, orderBy).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects?${queryParams}`, HttpMethod.GET);
  });

  it('create', () => {
    const project = getNewProject();

    spectator.service.create(project).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects`, HttpMethod.POST);
    expect(req.request.body).toEqual(project);
  });

  it('get', () => {
    spectator.service.get(projectId).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}`, HttpMethod.GET);
  });

  it('getBySlug', () => {
    const slug = faker.lorem.slug();
    spectator.service.getBySlug(slug).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/by_slug?${parseQueryParams({slug})}`, HttpMethod.GET);
  });

  it('put', () => {
    const project = getNewProject();

    spectator.service.put(projectId, project).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}`, HttpMethod.PUT);
  });

  it('patch', () => {
    const project = getNewProject();

    spectator.service.patch(projectId, project).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}`, HttpMethod.PATCH);
  });

  it('delete', () => {
    spectator.service.delete(projectId).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}`, HttpMethod.DELETE);
  });

  it('bulkUpdateOrder', () => {
    const newOrder = [
      {
        order: faker.random.number(),
        projectId:  faker.random.number(),
      },
    ];

    spectator.service.bulkUpdateOrder(newOrder).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/bulk_update_order`, HttpMethod.POST);
    expect(req.request.body).toEqual(newOrder);
  });

  it('getModulesConfiguration', () => {
    spectator.service.getModulesConfiguration(projectId).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}/modules`, HttpMethod.GET);
  });

  it('editModulesConfiguration', () => {
    const modules = {
      github: {
          secret: faker.random.uuid(),
          webhooksUrl: faker.internet.url(),
      },
      gogs: {
        secret: faker.random.uuid(),
        webhooksUrl: faker.internet.url(),
      },
    };

    spectator.service.editModulesConfiguration(projectId, modules).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}/modules`, HttpMethod.PATCH);
    expect(req.request.body).toEqual(modules);
  });

  it('stats', () => {
    spectator.service.stats(projectId).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}/stats`, HttpMethod.GET);
  });

  it('issueStats', () => {
    spectator.service.issueStats(projectId).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}/issues_stats`, HttpMethod.GET);
  });

  it('tagColors', () => {
    spectator.service.tagColors(projectId).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}/tags_colors`, HttpMethod.GET);
  });

  it('createTag', () => {
    const tag = {
      color: faker.internet.color(),
      tag: faker.lorem.word(),
    };

    spectator.service.createTag(projectId, tag).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}/create_tag`, HttpMethod.POST);
    expect(req.request.body).toEqual(tag);
  });

  it('editTag', () => {
    const tag = {
      color: faker.internet.color(),
      fromTag: faker.lorem.word(),
      toTag: faker.lorem.word(),
    };

    spectator.service.editTag(projectId, tag).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}/edit_tag`, HttpMethod.POST);
    expect(req.request.body).toEqual(tag);
  });

  it('deleteTag', () => {
    const tag = faker.lorem.word();

    spectator.service.deleteTag(projectId, tag).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}/delete_tag?${parseQueryParams({tag})}`, HttpMethod.DELETE);
  });

  it('mixTags', () => {
    const fromTags = [faker.lorem.word()];
    const toTag = faker.lorem.word();

    spectator.service.mixTags(projectId, fromTags, toTag).subscribe();

    const queryParams = UtilsService.buildQueryParams({
      fromTags: fromTags.join(','),
      toTag,
    }).toString();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}/mix_tags?${queryParams}`, HttpMethod.GET);
  });

  it('likeProject', () => {
    spectator.service.likeProject(projectId).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}/like`, HttpMethod.GET);
  });

  it('projectFans', () => {
    spectator.service.projectFans(projectId).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}/fans`, HttpMethod.GET);
  });

  it('watchProject', () => {
    const notifyLevel = faker.random.number();

    spectator.service.watchProject(projectId, notifyLevel).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}/watch`, HttpMethod.POST);
    expect(req.request.body).toEqual({notifyLevel});
  });

  it('stopWatchingProject', () => {
    spectator.service.stopWatchingProject(projectId).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}/unwatch`, HttpMethod.POST);
  });

  it('projectWatchers', () => {
    spectator.service.projectWatchers(projectId).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}/watchers`, HttpMethod.GET);
  });

  it('createTemplate', () => {
    const template = { name: faker.lorem.words(), description: faker.lorem.paragraph()};

    spectator.service.createTemplate(projectId, template.name, template.description).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}/create_template`, HttpMethod.POST);
    expect(req.request.body).toEqual({
      templateName: template.name,
      templateDescription: template.description,
    });
  });

  it('leave', () => {
    spectator.service.leave(projectId).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}/leave`, HttpMethod.POST);
  });

  it('changeLogo', () => {
    const filename = faker.system.fileName();
    const file = new File([], filename);

    spectator.service.changeLogo(projectId, file).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}/change_logo`, HttpMethod.POST);
    expect(req.request.body instanceof FormData).toBeTruthy();
    expect(((req.request.body as FormData).get('logo') as File).name).toEqual(filename);
  });

  it('removeLogo', () => {
    spectator.service.removeLogo(projectId).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}/remove_logo`, HttpMethod.POST);
  });

  it('transferValidateToken', () => {
    spectator.service.transferValidateToken(projectId).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}/transfer_validate_token`, HttpMethod.POST);
  });

  it('transferRequest', () => {
    spectator.service.transferRequest(projectId).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}/transfer_request`, HttpMethod.POST);
  });

  it('transferStart', () => {
    const userId = faker.random.number();

    spectator.service.transferStart(projectId, userId).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}/transfer_start`, HttpMethod.POST);

    expect(req.request.body).toEqual({
      user: userId,
    });
  });

  it('transferAccept', () => {
    const token = faker.random.uuid();
    const reason = faker.lorem.paragraph();

    spectator.service.transferAccept(projectId, token, reason).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}/transfer_accept`, HttpMethod.POST);

    expect(req.request.body).toEqual({
      reason,
      token,
    });
  });

  it('transferReject', () => {
    const token = faker.random.uuid();
    const reason = faker.lorem.paragraph();

    spectator.service.transferReject(projectId, token, reason).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}/transfer_reject`, HttpMethod.POST);

    expect(req.request.body).toEqual({
      reason,
      token,
    });
  });

  it('duplicate', () => {
    const newProject = getNewProject();
    const user = UserMockFactory.build();

    const project = {
      description: newProject.description,
      isPrivate: newProject.isPrivate,
      name: newProject.name,
      users: [user.id],
    };

    spectator.service.duplicate(projectId, project).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/projects/${projectId}/duplicate`, HttpMethod.POST);
    expect(req.request.body).toEqual(project);
  });

  it('export', () => {
    spectator.service.export(projectId).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/exporter/${projectId}`, HttpMethod.GET);
  });

  it('import', () => {
    const filename = faker.system.fileName();
    const file = new File([], filename);

    spectator.service.import(file).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/importer/load_dump`, HttpMethod.POST);
    expect(req.request.body instanceof FormData).toBeTruthy();
    expect(((req.request.body as FormData).get('dump') as File).name).toEqual(filename);
  });

});
