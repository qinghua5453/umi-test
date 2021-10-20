import React, { useLayoutEffect, useRef, useState } from 'react';

const RefCmp = () => {
  const inputRef = useRef(null);
  const [inputVal, setInputVal] = useState('');
  const textRef = useRef(null);

    useLayoutEffect(() => {
      textRef.current.value = inputVal;
      console.log('textRef', textRef);
    });
  return (
    <>
      <input ref={textRef}/>
      <input
        ref={inputRef}
        value={inputVal}
        onChange={(e) => {
          let { value } = e.target;
          setInputVal(value);
        }}
      />
      <button
        onClick={() => {
            inputRef.current.value = 'hello world';
          console.log('inputRef', inputRef);
        }}
      >
        button
      </button>
    </>
  );
};

export default RefCmp;
