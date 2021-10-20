import React from 'react';
import { useState } from 'react';
import styles from './index.less';
import CountCmp from '../../components/count';
import Layout from '../../components/base';
import { BaseProvider } from '../../provider/baseProvider';
import MemoCmp from '../../components/memo';
import RefCmp from '../../components/useRef';

const List = () => {
  console.log('父组件render');
  const [memoName, setMemoName] = useState('zj');
  const [memoAge, setMemoAge] = useState(1);

  return (
    <BaseProvider>
      list
      <div>
        {/* <Layout />
        <CountCmp /> */}
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
      </div>
    </BaseProvider>
  );
};

export default List;
