/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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

      this.src = logo[0];
      this.bg = logo[1];
    }
  }

  private imgs = [
    '/assets/project-logos/project-logo-01.png',
    '/assets/project-logos/project-logo-02.png',
    '/assets/project-logos/project-logo-03.png',
    '/assets/project-logos/project-logo-04.png',
    '/assets/project-logos/project-logo-05.png',
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

  public cartesianProduct(...allEntries: string[][]): string[][] {
    return allEntries.reduce((results: string[][], entries) => {
      return results
        .map(result => entries.map(entry => result.concat([entry])))
        .reduce((subResults, result) => subResults.concat(result), []);
    }, [[]]);
  }
}
