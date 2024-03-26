/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
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
