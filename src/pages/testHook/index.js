import React, { useEffect, useState } from 'react';
import useMapping from './aHook.js';

function TestHook() {
  const [min, setMin] = useState(0);
  const { count } = useMapping({ min });

  useEffect(() => {
    console.log('count', count);
  }, [min, count]);

  const buttonClick = () => setMin(min + 1);
  return (
    <div>
      TestHook
      <button onClick={buttonClick}>11111</button>
    </div>
  );
}

export default TestHook;
