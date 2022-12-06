import React, {hot} from '@use-gpu/live';
import {AutoCanvas, WebGPU} from '@use-gpu/webgpu';
import {Overlay} from './Overlay';
import {HTML} from '@use-gpu/react';
import {Data, Draw, FaceLayer, Pass} from '@use-gpu/workbench';
import type {StorageSource, DataField} from '@use-gpu/core';

const makeFallback = (error: Error) => (
  <div className="error-modal">
    <p>WebGPU error!</p>
    <p>{error.toString()}</p>
  </div>
);

export const App = hot(() => {
  const rootEl = document.querySelector('#root');
  const canvasEl = document.querySelector('#root .canvas');

  return (
    <WebGPU
      fallback={(error: Error) => (
        <HTML container={canvasEl}>{makeFallback(error)}</HTML>
      )}
    >
      <Overlay />
      <AutoCanvas selector={'#root .canvas'} samples={4}>
        <TestTriangle />
      </AutoCanvas>
    </WebGPU>
  );
}, module);

const TestTriangle = () => {
  const positions: number[] = [
    -1.0, -1.0, 
    1.0, -1.0, 
    0.0, 1.0
  ];
  const colors: number[] = [
    1.0, 0.0, 0.0, 
    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0
  ];
  const fields: DataField[] = [
    ['vec2<f32>', positions],
    ['vec3<f32>', colors],
  ];

  return (
    <Draw>
      <Pass>
        <Data
          fields={fields}
          render={(positions: StorageSource, colors: StorageSource) => (
            <FaceLayer positions={positions} colors={colors} />
          )}
        />
      </Pass>
    </Draw>
  );
};
