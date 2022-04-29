import React from 'react';
// 高阶组件
import ComOne from './components/com-one';
import ComTwo from './components/com-two';

function WithRoute(Wrap) {
  return (
    <div>
      <Wrap />
    </div>
  );
}

export default WithRoute;
