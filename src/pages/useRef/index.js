import React, { useState, useRef } from 'react';

function UseRef() {
  const counterRef = useRef(0);
  const [counter, setCounter] = useState(0);

  console.log('chonghui', counterRef.current);
  const handleClick = () => {
    // setCounter(counter + 1);
    counterRef.current += 1;
    console.log('111', counterRef.current);
  };

  return (
    <div>
      <p>Counter: {counter}</p>
      <p>Counter (ref): {counterRef.current}</p>
      <button onClick={handleClick}>Increment Counter</button>
    </div>
  );
}

export default UseRef;
