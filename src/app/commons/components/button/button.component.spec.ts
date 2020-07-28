/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TgButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: TgButtonComponent;
  let fixture: ComponentFixture<TgButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TgButtonComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TgButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
