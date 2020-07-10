/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { TestBed } from '@angular/core/testing';

import { TrelloImporterApiService } from './trello-importer-api.service';

describe('TrelloImporterApiService', () => {
  let service: TrelloImporterApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrelloImporterApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
