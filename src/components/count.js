import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { BaseContext } from '../provider/baseProvider';

const CountCmp = () => {
  const { menuItem, setMenuItem} = useContext(BaseContext);
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState('hello world');
  
  

  useEffect(() => {
    console.log('useEffect--count--1', new Date().getTime());
    // 是异步的 所以会比 外面的 console 后执行
  }, [count, menuItem]);

  const countClick = () => {
    setCount(count + 1);
    setMenuItem({ name: 'zj', key: 1});
  };

  useEffect(() => {
    console.log('useEffect--menuItem---', new Date().getTime(), menuItem);
  }, [menuItem]);


  const menuItemClick = () => {
    setMenuItem({ name: 'zj', key: 1});
    // console.log('menuItem', menuItem);
  };

  console.log('count-子组件render', new Date().getTime());
  return (
    <>
      <button onClick={countClick}>count-click</button>
      <button onClick={menuItemClick}>menuItem-click</button>
      {count}
      <div>{msg}</div>
    </>
  );
};

export default CountCmp;
