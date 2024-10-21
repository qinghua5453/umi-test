/* eslint-disable no-debugger */
import React, { useEffect, useState } from 'react';
import multData from './data';
import TestCmp from './cmp';

function ArrTest() {
  const featureList = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 4 }];

  const subjectList = [
    { id: 1, parentId: null },
    { id: 2, parentId: 1 },
    { id: 3, parentId: 2 },
    { id: 4, parentId: 3 },
    { id: 4, parentId: 3 },
  ];

  // 利用上面两个数组的关系，在subjectList中增加一个count变量，count的含义是获取本身以及子集数量总和

  const treeData = [
    {
      id: 1,
      parentId: null,
      children: [
        {
          id: 2,
          parentId: 1,
          children: [
            {
              id: 3,
              parentId: 2,
              children: [
                {
                  id: 4,
                  parentId: 3,
                },
                {
                  id: 5,
                  parentId: 3,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const obj = {};
  const buildCount = (data) => {
    let Count = 0;
    data.forEach((item) => {
      let count = 1;
      if (Array.isArray(item?.children) && item.children.length) {
        Count = buildCount(item.children);
      }
      Count = Count + count;
      item.Count =
        Array.isArray(item?.children) && item.children.length ? Count : count;
    });
    return Count;
  };

  const res = buildCount(treeData);
  console.log('res', treeData, 'obj', obj);

  return <TestCmp />;
}

export default ArrTest;
