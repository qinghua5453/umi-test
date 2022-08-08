import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const FormCmp = () => {
  const [obj, setObj] = useState({});
  const { arr = [] } = obj;
  const [test, setTest] = useState({});

  console.log('test', test);
  useEffect(() => {
    setTest((pre) => ({
      ...pre,
      arr,
    }));
  }, [arr]);

  return 'form';
};
console.log(1);
export default FormCmp;
