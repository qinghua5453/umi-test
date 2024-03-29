/* eslint-disable no-debugger */
const buildMapDataSource = (
  dataSource,
  target = {},
  level = 1,
  parentKey = null,
) => {
  for (let i = 0; i < dataSource.length; i++) {
    const item = dataSource[i];
    let key = !parentKey ? `${i}` : `${parentKey}-${i}`;
    if (!target[item.id]) {
      target[item.id] = item;
      item.level = level;
      item.key = key;
    }
    if (Array.isArray(item?.children)) {
      buildMapDataSource(item.children, target, level + 1, key);
    }
  }
  return target;
};

export const getParam = (dataSource, dragId, dropId) => {
  const result = buildMapDataSource(dataSource);
  console.log('result', result);
  const dragRow = result[dragId];
  const dropRow = result[dropId];
  return {
    dragRow,
    dropRow,
    dragKey: dragRow.key,
    dropKey: dropRow.key,
  };
};

// 生成新的dataSource后 跨层拖拽 index 和parentId 和parentIndex 会发生变化
// 此函数用于重新规整下
export const buildStandardArr = (
  oldData,
  newData = [],
  parentIndex = null,
  parentId = 0,
) => {
  for (let i = 0; i < oldData.length; i++) {
    const item = oldData[i];
    item.index = i;
    item.parentIndex = parentIndex;
    item.parentId = parentId;
    if (Array.isArray(item?.children) && item.children.length > 0) {
      buildStandardArr(item.children, newData, i, item.id);
    }
    newData.push(item);
  }
  return newData;
};

export const getParent = (data, parentId = null, parent = null) => {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item.parentId === parentId) {
      return parent;
    }
    if (Array.isArray(item?.children) && item.children.length) {
      const parent = getParent(item.children, parentId, item);
      if (parent) {
        return parent;
      }
    }
  }
  return null;
};

// 将多维打成一维
export const buildManyArr = (data) => {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    let children = [];
    if (item.children) {
      children = buildManyArr(item.children);
    }
    result = result.concat([item], children);
  }
  return result;
};
