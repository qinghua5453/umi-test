/* eslint-disable no-debugger */
import React, { useEffect, useState } from 'react';
import multData from './data';
import TestCmp from './cmp';

function ArrTest() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [flag1, setFlag1] = useState(false);
  const [flag2, setFlag2] = useState(false);

  const [abUpdated, setAbUpdated] = useState(false);

  useEffect(() => {
    // 监听a和b的更新
    if (flag1 && flag2) {
      // console.log('555555')
    }
  }, [flag1, flag2]);

  // console.log('这是外面的打印')
  useEffect(() => {
    setTimeout(() => {
      setA(1);
      setFlag1(true);
      setC(1);
    });

    // setTimeout(() => {
    //   setB(1)
    //   setFlag2(true)
    // }, 3000)
  }, []);

  return <TestCmp />;
}

export default ArrTest;
