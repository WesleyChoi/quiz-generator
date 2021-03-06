// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PrimaryButton, Spinner, Stack, Text } from '@fluentui/react';
import React, { useCallback, useEffect, useState } from 'react';
import {
  buttonStyle,
  buttonWithIconStyles,
  chatIconStyle,
  mainContainerStyle
} from './styles/ConfigurationScreen.styles';
import {
  headerStyle,
  leftPreviewContainerStackTokens,
  leftPreviewContainerStyle,
  namePreviewStyle,
  responsiveLayoutStackTokens,
  responsiveLayoutStyle,
  rightInputContainerStackTokens,
  rightInputContainerStyle
} from './styles/ConfigurationScreen.styles';

import { Chat20Filled } from '@fluentui/react-icons';
import { DisplayNameField } from './DisplayNameField';
import { getToken } from './utils/getToken';
import { getThreadId } from './utils/getThreadId';
import { joinThread } from './utils/joinThread';
import { getEndpointUrl } from './utils/getEndpointUrl';
import { checkThreadValid } from './utils/checkThreadValid';

// These props are set by the caller of ConfigurationScreen in the JSX and not found in context
export interface ConfigurationScreenProps {
  joinChatHandler(): void;
  setToken(token: string): void;
  setUserId(userId: string): void;
  setDisplayName(displayName: string): void;
  setThreadId(threadId: string): void;
  setEndpointUrl(endpointUrl: string): void;
}

// ConfigurationScreen states
const CONFIGURATIONSCREEN_SHOWING_SPINNER_LOADING = 1;
const CONFIGURATIONSCREEN_SHOWING_JOIN_CHAT = 2;
const CONFIGURATIONSCREEN_SHOWING_INVALID_THREAD = 3;
const CONFIGURATIONSCREEN_SHOWING_SPINNER_INITIALIZE_CHAT = 4;

const ALERT_TEXT_TRY_AGAIN = "You can't be added at this moment. Please wait at least 60 seconds to try again.";
const ERROR_TEXT_THREAD_INVALID = 'Thread Id is not valid, please revisit home page to create a new thread';
const ERROR_TEXT_THREAD_NOT_RECORDED = 'Thread id is not recorded in server';
const ERROR_TEXT_THREAD_NULL = 'Thread id is null';
const INITIALIZE_CHAT_SPINNER_LABEL = 'Initializing chat client...';
const JOIN_BUTTON_TEXT = 'Join chat';
const LOADING_SPINNER_LABEL = 'Loading...';
const NAME_DEFAULT = '';
const PROFILE_LABEL = '';

/**
 * There are four states of ConfigurationScreen.
 * 1. Loading configuration screen state. This will show 'loading' spinner on the screen.
 * 2. Join chat screen. This will show a name selector.
 * 3. Invalid thread state. This will show 'thread id is not valid' on the screen.
 * 4. Loading chat spinner. This will show 'initializing chat client' spinner on the screen.
 *
 * @param props
 */
export default (props: ConfigurationScreenProps): JSX.Element => {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [emptyWarning, setEmptyWarning] = useState(false);
  const [configurationScreenState, setConfigurationScreenState] = useState<number>(
    CONFIGURATIONSCREEN_SHOWING_SPINNER_LOADING
  );
  const [disableJoinChatButton, setDisableJoinChatButton] = useState<boolean>(false);
  const { joinChatHandler, setToken, setUserId, setDisplayName, setThreadId, setEndpointUrl } = props;

  // Used when new user is being registered.
  const setupAndJoinChatThreadWithNewUser = useCallback(() => {
    const internalSetupAndJoinChatThread = async (): Promise<void> => {
      const threadId = getThreadId();
      const token = await getToken();
      const endpointUrl = await getEndpointUrl();

      if (!threadId) {
        throw new Error(ERROR_TEXT_THREAD_NULL);
      }

      setToken(token.token);
      setUserId(token.identity);
      setDisplayName(name);
      setThreadId(threadId);
      setEndpointUrl(endpointUrl);

      const result = await joinThread(threadId, token.identity, name);
      if (!result) {
        alert(ALERT_TEXT_TRY_AGAIN);
        setDisableJoinChatButton(false);
        return;
      }

      setDisableJoinChatButton(false);
      joinChatHandler();
    };
    internalSetupAndJoinChatThread();
  }, [name, joinChatHandler, setDisplayName, setEndpointUrl, setThreadId, setToken, setUserId]);

  useEffect(() => {
    if (configurationScreenState === CONFIGURATIONSCREEN_SHOWING_SPINNER_LOADING) {
      const setScreenState = async (): Promise<void> => {
        try {
          const threadId = getThreadId();
          if (!(await checkThreadValid(threadId))) {
            throw new Error(ERROR_TEXT_THREAD_NOT_RECORDED);
          }
        } catch (error) {
          setConfigurationScreenState(CONFIGURATIONSCREEN_SHOWING_INVALID_THREAD);
          return;
        }
        setConfigurationScreenState(CONFIGURATIONSCREEN_SHOWING_JOIN_CHAT);
      };
      setScreenState();
    }
  }, [configurationScreenState]);

  const validateName = (): void => {
    if (!name) {
      setEmptyWarning(true);
    } else {
      setEmptyWarning(false);
      setDisableJoinChatButton(true);
      setConfigurationScreenState(CONFIGURATIONSCREEN_SHOWING_SPINNER_INITIALIZE_CHAT);
      setupAndJoinChatThreadWithNewUser();
    }
  };

  const displaySpinner = (spinnerLabel: string): JSX.Element => {
    return <Spinner label={spinnerLabel} ariaLive="assertive" labelPosition="top" />;
  };

  const displayJoinChatArea = (): JSX.Element => {
    return (
      <Stack
        horizontal
        wrap
        horizontalAlign="center"
        verticalAlign="center"
        tokens={responsiveLayoutStackTokens}
        className={responsiveLayoutStyle}
      >
        <Stack horizontalAlign="center" tokens={leftPreviewContainerStackTokens} className={leftPreviewContainerStyle}>
          <Text role={'heading'} aria-level={1} className={headerStyle}>
            {PROFILE_LABEL}
          </Text>
          <Text className={namePreviewStyle(name !== '')}>{name !== '' ? name : NAME_DEFAULT}</Text>
        </Stack>
        <Stack className={rightInputContainerStyle} tokens={rightInputContainerStackTokens}>
          <DisplayNameField
            setName={setName}
            setEmptyWarning={setEmptyWarning}
            validateName={validateName}
            isEmpty={emptyWarning}
            TEXTFIELD_PLACEHOLDER='Enter your name'
            TEXTFIELD_LABEL = 'Name'
          />
          <DisplayNameField
            setName={setNotes}
            setEmptyWarning={setEmptyWarning}
            validateName={validateName}
            isEmpty={emptyWarning}
            TEXTFIELD_PLACEHOLDER='Enter your notes'
            TEXTFIELD_LABEL='Notes'
          />
          <PrimaryButton
            disabled={disableJoinChatButton}
            className={buttonStyle}
            styles={buttonWithIconStyles}
            text={'Start Quiz'}
            onClick={validateName}
            onRenderIcon={() => <Chat20Filled className={chatIconStyle} />}
          />
        </Stack>
      </Stack>
    );
  };

  const displayInvalidThreadError = (): JSX.Element => {
    return (
      <div>
        <p>{ERROR_TEXT_THREAD_INVALID}</p>
      </div>
    );
  };

  const displayWithStack = (child: JSX.Element): JSX.Element => {
    return (
      <Stack className={mainContainerStyle} horizontalAlign="center" verticalAlign="center">
        {child}
      </Stack>
    );
  };

  if (configurationScreenState === CONFIGURATIONSCREEN_SHOWING_SPINNER_LOADING) {
    return displaySpinner(LOADING_SPINNER_LABEL);
  } else if (configurationScreenState === CONFIGURATIONSCREEN_SHOWING_JOIN_CHAT) {
    return displayWithStack(displayJoinChatArea());
  } else if (configurationScreenState === CONFIGURATIONSCREEN_SHOWING_INVALID_THREAD) {
    return displayWithStack(displayInvalidThreadError());
  } else if (configurationScreenState === CONFIGURATIONSCREEN_SHOWING_SPINNER_INITIALIZE_CHAT) {
    return displaySpinner(INITIALIZE_CHAT_SPINNER_LABEL);
  } else {
    throw new Error('configuration screen state ' + configurationScreenState.toString() + ' is invalid');
  }
};
