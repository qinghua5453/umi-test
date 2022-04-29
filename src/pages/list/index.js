import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from './index.less';
import CountCmp from '../../components/count';
import Layout from '../../components/base';
import { BaseProvider } from '../../provider/baseProvider';
import MemoCmp from '../../components/memo';
import RefCmp from '../../components/useRef';
import ChildCmp from '../components/child';

const List = () => {
  console.log('父组件render');
  const [memoName, setMemoName] = useState('zj');
  const [memoAge, setMemoAge] = useState(1);
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(0);

  console.log('count----', count);
  useEffect(() => {
    setInterval(() => {
      setCount((c) => {
        return c + 1;
      });
      if (count == 10) {
        setNumber(1);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (count == 10) {
      setNumber(1);
    }
  }, [count]);

  return (
    <BaseProvider>
      list
      <div>
        {/* <Layout /> */}
        {/* <CountCmp /> */}
        {/* <div>
          <input value={memoName} onChange={(e) => {
            setMemoName(e.target.value);
          }}></input>
        </div>
        <button
          onClick={() => {
            setMemoAge(memoAge + 1);
          }}
        >
          更新age
        </button>
        <MemoCmp name={memoName}>{memoAge}</MemoCmp> */}
        {/* <RefCmp /> */}
        {/* <ChildCmp /> */}
        <ChildCmp count={count} number={number} />
      </div>
    </BaseProvider>
  );
};

export default List;
