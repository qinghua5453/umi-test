import React, { useState, useEffect } from 'react';

const useMapping = ({ min }) => {
  const [count, setCount] = useState(1);

  const initCount = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    setTimeout(initCount, 2000);
  }, [min]);

  return {
    count,
  };
};

export default useMapping;
