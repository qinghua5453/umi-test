import React, { useState } from 'react';
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';

const initialElements = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    data: { label: 'Another Node' },
    position: { x: 100, y: 125 },
  },
];

export default () => {
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params) => {
    console.log('params', params);
    setElements((els) => addEdge(params, els));
  };

  const onNodeDragStart = (event, node) => {
    console.log(event, node);
  };

  return (
    <div style={{ height: 1000 }}>
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onNodeDragStart={onNodeDragStart}
        deleteKeyCode={46} /* 'delete'-key */
      />
    </div>
  );
};
