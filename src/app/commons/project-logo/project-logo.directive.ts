/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { Input, HostBinding, Directive } from '@angular/core';
import { Project } from '@/app/api/projects/projects.model';
import murmurhash from 'imurmurhash';

@Directive({
  selector: '[tgProjectLogo]',
})
export class ProjectLogoDirective {
  @HostBinding('style.background')
  public bg = '';

  @HostBinding('src')
  public src = '';

  @Input()
  public logo: 'small' | 'big' = 'small';

  @Input('tgProjectLogo')
  public set project(project: Project) {
    let logoUrl = project.logoBigUrl;

    if (this.logo === 'small') {
      logoUrl = project.logoSmallUrl;
    }

    if (logoUrl) {
      this.src = logoUrl;
      this.bg = '';
    } else {
      const key = `${project.slug}-${project.id}`;
      const idx = murmurhash(key, 42).result() % this.logos.length;
      const logo = this.logos[idx];

      // LEGACY
      const prefix = (window as any)._version ? (window as any)._version : '';

      this.src = `${prefix}${logo[0]}`;
      this.bg = logo[1];
    }
  }

  private imgs = [
    '/images/project-logos/project-logo-01.png',
    '/images/project-logos/project-logo-02.png',
    '/images/project-logos/project-logo-03.png',
    '/images/project-logos/project-logo-04.png',
    '/images/project-logos/project-logo-05.png',
  ];

  private colors = [
    'rgba(153, 214, 220, 1)',
    'rgba(213, 156, 156, 1)',
    'rgba(214, 161, 212, 1)',
    'rgba(164, 162, 219, 1)',
    'rgba(152, 224, 168, 1)',
  ];

  private logos: string[][] = [];

  constructor() {
    this.logos = this.cartesianProduct(this.imgs, this.colors);
  }

  private cartesianProduct(imgs: string[], colors: string[]): string[][] {
    const logos: string[][] = [];

    colors.forEach((color) => {
      imgs.forEach((img) => {
        logos.push([img, color]);
      });
    });

    return logos;
  }
}
