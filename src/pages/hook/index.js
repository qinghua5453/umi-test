import React, { useEffect } from 'react';
import UseTime from './useTime';

function Hook() {
  const { time } = UseTime();
  console.log('time', time);
  return <div>Hook</div>;
}

export default Hook;
