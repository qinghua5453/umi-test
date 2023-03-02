import { useEffect, useState, useRef } from 'react';

function CountInputChanges() {
  const [value, setValue] = useState('');
  const countRef = useRef(0);

  useEffect(() => countRef.current++);
  const onChange = ({ target }) => {
    setValue(target.value);
    console.log('value', value);
  };

  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
      <div>Number of changes: {countRef.current}</div>
    </div>
  );
}

export default CountInputChanges;
