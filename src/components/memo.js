import React, { useEffect, useMemo } from 'react';

const MemoCmp = ({ name, children }) => {
  console.log('render-memo', new Date().getTime());
  function changeName() {
    console.log('改变name的方法')
    return name + '改变name的方法'
  }

//   const otherName =  changeName(name)
//   useEffect(() => {
//    console.log('改变name的方法');
//   }, [name]);
  const memoChangeName = useMemo(() => {
    console.log('改变useMemo_name的方法');
    return () => name;
  }, [name]);

  return (
    <div>
      <div>{changeName()}</div>
      <div>{memoChangeName()}</div>
      <div>{children}</div>
    </div>
  );
};

export default MemoCmp;
