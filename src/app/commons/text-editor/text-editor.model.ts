/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

export interface AutoCompleteItem {
  id: string;
  link: string;
  listRenderText: string;
  text?: string;
}
