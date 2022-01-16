// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TextFieldStyleProps, inputBoxStyle, inputBoxTextStyle } from './styles/DisplayNameField.styles';
import { ENTER_KEY } from './utils/constants';

import React from 'react';
import { TextField } from '@fluentui/react';

interface DisplayNameFieldProps {
  setName(displayName: string): void;
  setEmptyWarning(isEmpty: boolean): void;
  isEmpty: boolean;
  defaultName?: string;
  validateName?(): void;
  TEXTFIELD_PLACEHOLDER: string;
  TEXTFIELD_LABEL: string;
}


const TEXTFIELD_ID = 'displayName';
const TEXTFIELD_EMPTY_ERROR_MSG = 'Name cannot be empty';

const DisplayNameFieldComponent = (props: DisplayNameFieldProps): JSX.Element => {
  const { setName, setEmptyWarning, isEmpty, defaultName, validateName, TEXTFIELD_PLACEHOLDER,TEXTFIELD_LABEL } = props;

  const onNameTextChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ): void => {
    if (newValue === undefined) {
      return;
    }

    setName(newValue);
    if (!newValue) {
      setEmptyWarning(true);
    } else {
      setEmptyWarning(false);
    }
  };
  

  return (
    <TextField
      autoComplete="off"
      defaultValue={defaultName}
      inputClassName={inputBoxTextStyle}
      label={TEXTFIELD_LABEL}
      className={inputBoxStyle}
      onChange={onNameTextChange}
      id={TEXTFIELD_ID}
      placeholder={TEXTFIELD_PLACEHOLDER}
      onKeyDown={(ev) => {
        if (ev.which === ENTER_KEY) {
          validateName && validateName();
        }
      }}
      styles={TextFieldStyleProps}
      errorMessage={isEmpty ? TEXTFIELD_EMPTY_ERROR_MSG : undefined}
    />
  );
};

export const DisplayNameField = (props: DisplayNameFieldProps): JSX.Element => <DisplayNameFieldComponent {...props} />;
