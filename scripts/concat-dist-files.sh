#!/bin/bash

# This source code is licensed under the terms of the
# GNU Affero General Public License found in the LICENSE file in
# the root directory of this source tree.
#
# Copyright (c) 2021-present Kaleidos INC

cat ./dist/elements/runtime-es5.js ./dist/elements/polyfills-es5.js ./dist/elements/main-es5.js > ./dist/elements/elements.js && ls -lah ./dist/elements/elements.js
