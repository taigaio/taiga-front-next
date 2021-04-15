/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectNavigationComponent } from './project-navigation.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ProjectLogoModule } from '@/app/commons/project-logo/project-logo.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveComponentModule } from '@ngrx/component';

@NgModule({
  declarations: [ProjectNavigationComponent],
  imports: [
    ProjectLogoModule,
    CommonModule,
    TranslateModule,
    RouterModule.forChild([]),
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveComponentModule,
  ],
  exports: [
    ProjectNavigationComponent,
  ],
})
export class ProjectNavigationModule { }
