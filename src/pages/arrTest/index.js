/* eslint-disable no-debugger */
import React from 'react';

function ArrTest() {
  // 给定一个数组,返回满足水仙花的所有数的集合（数组）
  // 水仙花 三位数的自幂数， 1^3 + 5^3+ 3^3 = 153
  // const arr = [153, 500, 370, 678, 900, 371, 409, 407];

  // const findRes = () => {
  //   const res = []
  //   arr.forEach((item) => {
  //      const str = item + '';
  //      if ((Math.pow(str[0], 3) + Math.pow(str[1], 3) + Math.pow(str[2], 3)) === item) {
  //        res.push(item)
  //      }
  //   });
  //   return res;
  // };

  // 题目： 给定一个数组 nums 和一个目标值 target，在该数组中找出和为目标值的两个数
  // 输入： nums: [8, 2, 6, 5, 4, 1, 3] ； target:7
  // 输出： [2, 5]
  const arr = [8, 2, 6, 5, 4, 1, 3];
  const findRes = (data, target) => {
    const res = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = 1; j < data.length - 1; j++) {
        console.log('arr[j]', arr[j], 'arr[j+1]', arr[j + 1]);
        if (arr[i] + arr[j] === target) {
          res.push(arr[i]);
          res.push(arr[j]);
          return res;
        }
      }
    }
    return res;
  };

  const res = findRes(arr, 7);
  console.log('res', res);
  return <div>ArrTest</div>;
}

export default ArrTest;
