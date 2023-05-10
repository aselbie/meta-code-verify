/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {MESSAGE_TYPE, Origin, State} from '../config';
import {sendMessageToBackground} from './sendMessageToBackground';

export const currentOrigin: {val: string | Origin} = {val: ''};

export function updateCurrentState(state: State) {
  sendMessageToBackground({
    type: MESSAGE_TYPE.UPDATE_STATE,
    state,
    origin: currentOrigin.val as Origin,
  });
}