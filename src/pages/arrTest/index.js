/* eslint-disable no-debugger */
import React, { useEffect, useState } from 'react';
import multData from './data';
import TestCmp from './cmp';

function ArrTest() {
  const arr = [
    {
      id: 1,
      parentId: null,
    },
    {
      id: 2,
      parentId: 1,
    },
    {
      id: 3,
      parentId: 2,
    },
    {
      id: 4,
      parentId: 3,
    },
    {
      id: 5,
      parentId: 3,
    },
    {
      id: 6,
      parentId: 2,
    },
    {
      id: 6,
      parentId: 2,
    },
    {
      id: 7,
      parentId: 4,
    },
  ];

  // 返回一个映射, 输入包含父子关系的数量
  // const obj = {
  //   1: 5,
  //   2: 2,
  //   3: 1,
  //   4: 2,
  // };
  const obj = {};

  //  const buildArr = (data, type = 'slef', parentId = null) => {
  //   for ( let i = 0; i < data.length; i++) {
  //      const item = data[i];
  //      if (!obj[item.id]) obj[item.id] = 0;
  //      if (type === 'self') {
  //       obj[item.id]++;
  //      }
  //      if (item.id === parentId && type === 'parent') {
  //       obj[item.id]++
  //       break;
  //      }
  //      if (item.parentId) {
  //        buildArr(data, 'parent', item.parentId)
  //      }
  //   };
  //  }

  const buildArr = (data) => {
    const map = {};

    // 创建一个映射，方便查找每个节点的子节点
    data.forEach((item) => {
      if (!map[item.id]) {
        map[item.id] = [];
      }
      if (item.parentId !== null) {
        if (!map[item.parentId]) {
          map[item.parentId] = [];
        }
        map[item.parentId].push(item.id);
      }
    });
    console.log('map', map);

    // 递归函数，计算子集数量
    const countChildren = (id) => {
      let count = 1; // 包括自身
      if (map[id]) {
        for (const childId of map[id]) {
          count += countChildren(childId);
        }
      }
      return count;
    };

    // 遍历每个节点，计算子集数量
    for (const item of data) {
      obj[item.id] = countChildren(item.id);
    }
  };

  buildArr(arr);
  console.log('dd', obj);

  return <TestCmp />;
}

export default ArrTest;
