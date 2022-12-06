import * as React from 'react';
import { HTML } from '@use-gpu/react';

export const Overlay = () => {
  const overlayEl = document.querySelector('#root .overlay');

  return <HTML container={overlayEl}>
    <div>hello live!</div>
  </HTML>
};