import React, { useEffect, useState } from 'react';
import { Form, Select, Button } from 'antd';

function Layout(props) {
  let obj = new Map({});
  console.log('obj', obj);

  return <div>{props.children}</div>;
}

export default Layout;
