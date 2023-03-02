import { render } from 'react-dom';
import Example from './example';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function ReactDndDemo() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Example />
    </DndProvider>
  );
}

export default ReactDndDemo;
