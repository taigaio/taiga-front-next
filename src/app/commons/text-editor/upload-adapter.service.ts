/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Injectable } from '@angular/core';
import { UploadFileAdapter } from './upload-file-adapter.model';

@Injectable()
export class UploadAdapterService implements UploadFileAdapter {
  public loader: any;

  public setLoader(loader: any) {
    this.loader = loader;
  }

  upload() {
    // TODO: real taiga upload
    return this.loader.file
      .then((file: any) => {
        console.log('taiga file', file);
        return {
          default: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Test.png',
          text: 'file name',
        };
      });
  }

  abort() {}
}
