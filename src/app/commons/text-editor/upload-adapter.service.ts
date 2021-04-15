/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

export class UploadAdapterService {

  constructor(private loader: any, private uploadFunction: (file: unknown, value?: unknown) => void) {}

  public setUploadFunction(uploadFunction: (value?: unknown) => void) {
    this.uploadFunction = uploadFunction;
  }

  upload() {
    return this.loader.file
      .then((file: any) => {
        return new Promise((resolve) => {
          this.uploadFunction(file, resolve);
        });
      });
  }

  abort() {}
}
