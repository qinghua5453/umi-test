import React, { useEffect, useState, useContext } from 'react';
import { BaseContext } from '../provider/baseProvider';

function Layout(props) {
  console.log('base-cmp-render');
  useEffect(() => {
    console.log('useEffect--base');
  }, []);
  const { menuItem, setMenuItem} = useContext(BaseContext);
  return (
    <div>
      base
    </div>
  );
}

export default Layout;
