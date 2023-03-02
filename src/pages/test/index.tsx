import React, { useEffect, useMemo, useState } from 'react';

function Test() {
  const [arr, setArr] = useState([]);
  const [config, setConfig] = useState({});

  const [cpConfig, setCpConfig] = useState(config);

  // const cpConfig = useMemo(() => {
  //   return JSON.parse(JSON.stringify(config));
  // }, [config]);

  console.log('1');
  useEffect(() => {
    setConfig({ name: 'zj' });
  }, [cpConfig]);

  return <div>Test</div>;
}

export default Test;
