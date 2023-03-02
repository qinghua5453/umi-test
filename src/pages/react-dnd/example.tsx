import React from 'react';
import sourceData from './mock';
import { Tree } from 'antd';
import BoxCmp from './box';
import BucketCmp from './bucket';

function Example() {
  return (
    <div>
      {/* <Tree  treeData={sourceData}/> */}
      <BoxCmp />
      <BucketCmp />
    </div>
  );
}

export default Example;
