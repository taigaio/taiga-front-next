/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
