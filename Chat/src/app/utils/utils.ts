// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GUID_FOR_INITIAL_TOPIC_NAME } from './constants';

declare let __BUILDTIME__: string; // Injected by webpack
export const getBuildTime = (): string => __BUILDTIME__;

export function getChatSDKVersion(): string {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require('../../../package.json')['dependencies']['@azure/communication-chat'];
}

export const CAT = '🐱';
export const MOUSE = '🐭';
export const KOALA = '🐨';
export const OCTOPUS = '🐙';
export const MONKEY = '🐵';
export const FOX = '🦊';

export const getBackgroundColor = () => {
  return {
    backgroundColor: 'rgb(255, 250, 228)'
  };
};

export const existsTopicName = (topicName?: string): boolean =>
  !!topicName && topicName !== GUID_FOR_INITIAL_TOPIC_NAME;
