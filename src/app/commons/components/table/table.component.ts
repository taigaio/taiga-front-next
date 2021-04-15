/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'tg-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TgTableComponent {

  // Table data. Should be an object with the table structure
  //
  // Example:
  //
  // public get periodicElement(): PeriodicElement[] {
  //   return [
  //     {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  //     {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  //     {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  //     {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  //     {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  //     {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  //     {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  //     {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  //     {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  //     {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  //   ];
  // }
  @Input() public dataSource: [];

  // Name of the columns of the table.
  //
  // Example: ['position', 'name', 'weight', 'symbol']

  @Input() public displayedColumns?: string[];
}
