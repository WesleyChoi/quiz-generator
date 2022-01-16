// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getBackgroundColor } from '../utils/utils';
import { IButtonStyles, IStackTokens, mergeStyles, Theme } from '@fluentui/react';

export const headerStyle = mergeStyles({
  fontWeight: 600,
  fontSize: '1.5rem', // 36px
  width: '100%',
  textAlign: 'center',
  paddingBottom: '1rem'
});

export const responsiveLayoutStackTokens: IStackTokens = {
  childrenGap: '4.5rem'
};

export const responsiveLayoutStyle = mergeStyles({
  height: '100%',
  width: '100% ',
  // half childrenGap from Stack
  padding: '2.25rem',
  // max of min-width from stack items + padding width * 2 = 20 + 2.25 * 2
  minWidth: '24.5rem',
  minHeight: 'auto',
  // sum of max-height of stack items + childrenGap * (#items - 1) + padding * 2 = (15.0975 + 15.875) + 4.5 * 1 + 2.25 * 2 =
  maxHeight: '39.97255rem'
});

export const leftPreviewContainerStackTokens: IStackTokens = {
  childrenGap: '0.8125rem'
};

export const leftPreviewContainerStyle = mergeStyles({
  width: '10rem',
  minHeight: '15.0975rem',
  padding: '0.5rem'
});

export const rightInputContainerStackTokens: IStackTokens = {
  childrenGap: '1.25rem'
};

export const rightInputContainerStyle = mergeStyles({
  padding: '0.5rem'
});

export const namePreviewStyle = (isEmpty: boolean): string => {
  return mergeStyles({
    height: '1.5rem',
    width: '8.313rem',
    fontSize: '1.125rem', // 18px
    fontWeight: 600,
    letterSpacing: '0',
    lineHeight: '1.5rem',
    textAlign: 'center',
    opacity: isEmpty ? 1 : 0.34,
    wordWrap: 'break-word',
    overflowY: 'hidden'
  });
};

export const labelFontStyle = mergeStyles({
  fontSize: '1rem', // 16px
  fontWeight: 600,
  letterSpacing: '0',
  lineHeight: '2rem',
  minWidth: '19rem'
});

export const chatIconStyle = mergeStyles({
  marginRight: '0.375rem',
  fontSize: '0.875rem' // 14px
});

export const buttonStyle = mergeStyles({
  height: '2.75rem',
  fontWeight: 600,
  width: '100%',
  maxWidth: '18.75rem',
  minWidth: '12.5rem',
  fontSize: '0.875rem' // 14px
});

export const buttonWithIconStyles: IButtonStyles = {
  textContainer: {
    display: 'contents'
  }
};

export const mainContainerStyle = mergeStyles({
  maxWidth: '46.875rem',
  width: '100%',
  height: '100%'
});
