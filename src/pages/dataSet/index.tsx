import React from 'react';
import './index.less';
// import styles from './index.less';

function DataSet() {
  // console.log('styles', styles);
  return (
    <div
      className="box"
      data-drink="coffee"
      data-food="sushi"
      data-meal="lunch"
    >
      ¥20.12
    </div>
  );
}

export default DataSet;
