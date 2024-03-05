/* eslint-disable no-debugger */
import React, { useState, useEffect } from 'react';

const useMapping = (config) => {
  const [count, setCount] = useState(1);

  const initCount = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    // debugger
    setTimeout(initCount, 2000);
  }, [config]);

  return {
    count,
  };
};

export default useMapping;
