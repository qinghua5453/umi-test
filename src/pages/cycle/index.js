import React, { useEffect, useState } from 'react';

const CmpOne = () => {
  const [count, setCount] = useState(0);
  const [detail, setDetail] = useState();
  console.log('re-render');

  useEffect(() => {
    console.log('detail 更新后执行');
  }, [detail]);

  useEffect(() => {
    setDetail({ name: 'zk' });
  }, []);

  useEffect(() => {
    console.log('count', count);
  }, [count]);

  return (
    <div>
      count-CmpOne: {count}{' '}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        add
      </button>
    </div>
  );
};

const CmpTwo = () => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    console.log('number', number);
  }, [number]);

  return (
    <div>
      number-CmpTwo: {number}
      <button
        onClick={() => {
          setNumber(number + 1);
        }}
      >
        add
      </button>
    </div>
  );
};

function Cycle() {
  const list = [
    { key: 1, name: 'tab1' },
    { key: 2, name: 'tab2' },
  ];

  const [obj, setObj] = useState({});
  const { arr } = obj;
  const [test, setTest] = useState({});

  console.log('test', test);
  useEffect(() => {
    setTest((pre) => ({
      ...pre,
      arr,
    }));
  }, [arr]);

  const [current, setCurrent] = useState(1);
  return (
    <div>
      <ul>
        {list.map((item) => {
          return (
            <li
              key={item.key}
              onClick={() => {
                setCurrent(item.key);
              }}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
      <div style={current === 1 ? { display: 'block' } : { display: 'none' }}>
        <CmpOne />
      </div>
      {/* <div style={current === 2 ? { display : 'block'} : { display: 'none'}}><CmpTwo /></div> */}

      {current === 2 && <CmpTwo />}
    </div>
  );
}

export default Cycle;
