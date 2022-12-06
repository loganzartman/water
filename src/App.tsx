import * as React from 'react';
import { AutoCanvas, WebGPU } from '@use-gpu/webgpu';
import { Overlay } from './Overlay';
import { HTML } from '@use-gpu/react';

const makeFallback = (error: Error) =>
  <div className="error-modal">
    <p>WebGPU error!</p>
    <p>{error.toString()}</p>
  </div>

export const App = () => {
  const rootEl = document.querySelector('#root');
  const canvasEl = document.querySelector('#root .canvas');

  return (
    <WebGPU
      fallback={(error: Error) => <HTML container={canvasEl}>{makeFallback(error)}</HTML>}
    >
      <Overlay />
      <AutoCanvas
        selector={'#root .canvas'}
        samples={4}
      >
      </AutoCanvas>
    </WebGPU>
  )
};