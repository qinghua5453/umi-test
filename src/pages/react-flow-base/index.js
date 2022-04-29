import React, { useState } from 'react';
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';

const initElements = [
  {
    id: '1',
    type: 'input', // input node
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
  // default node
  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output', // output node
    data: { label: 'Output Node-1' },
    position: { x: 250, y: 250 },
  },
  {
    id: '4',
    type: 'output', // output node
    data: { label: 'Output Node-2' },
    position: { x: 500, y: 250 },
  },
  // animated edge
  // { id: 'e1-2', source: '1', target: '2', animated: true, label: 'sas' },
  // { id: 'e2-3', source: '2', target: '3', label: 'dfsdfg' },
];

export default () => {
  const [elements, setElements] = useState(initElements);
  const edgeTypes = {
    custom: () => {
      return <div>sshshsh-label</div>;
    },
  };

  console.log('elements----', elements);
  const onConnect = (params) => {
    console.log('params', params);
    let result = [];
    setElements((els) => {
      console.log('els', els);
      result = els.map((el) => {
        return {
          ...el,
          //  label: 'sdsf'
        };
      });
      //  console.log('result---', result);
      return addEdge(params, result);
    });
  };

  return (
    <div style={{ height: 1000 }}>
      <ReactFlow
        elements={elements}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
        key="edges"
      />
    </div>
  );
};
