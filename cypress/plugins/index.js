/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

const cypressTypeScriptPreprocessor = require("./cy-ts-preprocessor");

module.exports = on => {
  on("file:preprocessor", cypressTypeScriptPreprocessor);
};
