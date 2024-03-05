import React, { useEffect, useState } from 'react';
import useMapping from './aHook.js';

function TestHook() {
  const [config, setConfig] = useState({ min: 0 });
  const { count } = useMapping(config);

  // console.log('count1111', count);
  // console.log('config----', config);

  useEffect(() => {
    console.log('count', count);
  }, [config, count]);

  const buttonClick = () => setConfig({ min: config.min + 1 });
  return (
    <div>
      TestHook
      <button onClick={buttonClick}>11111</button>
    </div>
  );
}

export default TestHook;
