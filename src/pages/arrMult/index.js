/* eslint-disable no-debugger */
import React from 'react';
import mockData from './mock';

function ArrMult() {
  // const buildArr = (data, parentId = null) => {
  //   const result = []
  //   data.forEach((element) => {
  //      if (element.parentId === parentId) {
  //       //  debugger
  //        const children = buildArr(data, element.id);
  //        element.children = children;
  //        result.push(element)
  //      }
  //   });
  //   return result;
  // };

  // const res = buildArr(mockData);
  // console.log('res', res);

  // const flatArr = (data) => {
  //    let result = []
  //    data.forEach(element => {
  //     // let temp;
  //     //  if (Array.isArray(element.children) && element.children.length) {
  //     //    temp = flatArr(element.children);
  //     //  } else {
  //     //   result.push(element);
  //     //  }
  //     //  if (temp) {
  //     //   result = result.concat(element, temp);
  //     //  }
  //      result = result.concat(element, Array.isArray(element.children) && element.children.length ? flatArr(element.children) : [] )
  //    });
  //    return result;
  // };

  // const res = flatArr(mockData);
  // console.log('res', res);

  // 打入key代表层级
  // const buildKey = (data, parentKey = null) => {
  //    data.forEach((element, index) => {
  //       const key = !parentKey ? '0' : `${parentKey}-${index}`;
  //       element.key = key;
  //       if (Array.isArray(element?.children) && element.children.length) {
  //          buildKey(element.children, key)
  //       }
  //    });
  //    return data;
  // };

  // const res = buildKey(mockData);
  // console.log('res', res);

  // 打入parent
  // const buildParent = (data, parent) => {
  //   data.forEach(element => {
  //     element.parent = parent;
  //     if (element?.children && element.children.length) {
  //       buildParent(element.children, element)
  //     }
  //   });
  //   return data;
  // };

  // const res = buildParent(mockData);
  // console.log('res', res);

  // const arr = [5, 8, 1];
  // // 写一个递归排序 快排
  // const fastSort = (data) => {
  //   if (data.length <= 1) return data;
  //   const middleIndex = Math.floor(data.length / 2);
  //   const middleVal = data[middleIndex];
  //   const arrLeft = [];
  //   const arrRig = [];
  //   for (let i = 0; i < data.length; i++) {
  //     const element = data[i];
  //     // debugger;
  //     if (i === Math.floor(data.length / 2)) {
  //       continue;
  //     }
  //     if (element <= middleVal) {
  //       arrLeft.push(element)
  //     } else {
  //       arrRig.push(element)
  //     }
  //   }
  //   return [...fastSort(arrLeft), middleVal, ...fastSort(arrRig)]
  // };

  // const res = fastSort(arr);
  // console.log('res', res);

  // 写一个冒泡排序
  // const arr = [3,4,1,5,100,1000,6,10000, 99, 777, 999];
  // const sortMaoPao = (arr) => {
  //   for (let i = 0; i < arr.length; i++) {
  //     for ( let j = 0; j < arr.length - 1 - i; j++) {
  //       if (arr[j] > arr[j + 1]) {
  //         // 交换元素位置
  //         var temp = arr[j];
  //         arr[j] = arr[j + 1];
  //         arr[j + 1] = temp;
  //       }
  //     }
  //   }
  //   return arr;
  // };

  // const res = sortMaoPao(arr);
  // console.log('res', res);
  // 查找并返回一个对象中特定属性的深度

  const findMaxLevel = (data, level = 1) => {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.children?.length) {
        level++;
        return findMaxLevel(item.children, level);
      }
    }
    return level;
  };

  const res = findMaxLevel(mockData);
  console.log('res', res);
  return <div>ArrMult</div>;
}

export default ArrMult;
