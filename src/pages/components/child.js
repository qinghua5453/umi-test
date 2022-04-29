import React, { useEffect } from 'react';
import { useState } from 'react';

const ChildCmp = (props = {}) => {
  console.log('子组件render');
  return 'ChildCmp';
};

function areEqual(prevProps, nextProps) {
  console.log('prevProps', prevProps, 'nextProps', nextProps);
  if (prevProps.number !== nextProps.number) {
    return false;
  }
  return true;
}

// export default ChildCmp;
// export default React.memo(ChildCmp);
export default React.memo(ChildCmp, areEqual);
