/* eslint-disable no-debugger */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Table } from 'antd';
import { tableData, columns } from './mock';
import { useState, useCallback, useRef, useEffect } from 'react';
import { getParam, buildStandardArr } from './utils';

const DraggableTableRow = ({
  index,
  dataSource,
  record,
  parentId,
  parentIndex,
  updateRow,
  ...restProps
}) => {
  const ref = useRef(null);

  const itemObj = {
    id: record.id,
    index,
  };
  let dropPosition;

  const [{ handlerId }, drop] = useDrop({
    accept: 'table-row',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // console.log('monitor', monitor, 'getClientOffset', monitor.getClientOffset());
      // console.log('clientOffset.y', clientOffset.y);
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // 拖拽对象在目标对象上方
      if (hoverClientY < hoverMiddleY) {
        console.log('上方');
        dropPosition = -1;
      }
      // 拖拽对象在目标对象下方
      else if (
        hoverClientY >
        hoverBoundingRect.bottom - hoverBoundingRect.top - hoverMiddleY
      ) {
        console.log('下方');
        dropPosition = 1;
      }
      // 拖拽对象在目标对象的缝隙处
      else {
        console.log('间隙');
        dropPosition = 0;
      }
      let dropPosition;

      const opt = {
        dragId: item.id, // 拖拽id
        dropId: record.id, // 要放置位置行的id
        dropParentId: record.parentId,
        dragKey: record.dragKey,
        dropKey: record.dropKey,
        dropPosition,
      };
      console.log('opt', opt);
      item.index = hoverIndex;
    },
    drop: (item) => {
      const opt = {
        dragId: item.id, // 拖拽id
        dropId: record.id, // 要放置位置行的id
        dropParentId: record.parentId,
        dragKey: record.dragKey,
        dropKey: record.dropKey,
        dropPosition,
      };
      updateRow(opt);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'table-row',
    item: itemObj,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      clientOffset: monitor.getClientOffset(),
    }),
  });

  drag(drop(ref));

  return <tr ref={ref} {...restProps} />;
};

// 在应用程序中使用 DraggableTable
const App = () => {
  const [dataSource, setDataSource] = useState(tableData); // 设置你的数据源

  const updateRow = (opt) => {
    const { dragId, dropId, dropPosition } = opt;
    const params = getParam(dataSource, dragId, dropId);
    const { dragKey, dropKey, dragRow, dropRow } = params;
    const newData = [...dataSource];

    function findParent(data, parentId, parent) {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];

        if (item.id === parentId) {
          return parent;
        }

        if (item.children && item.children.length > 0) {
          const parent = findParent(item.children, parentId, item); // 递归查找子元素的父级元素
          if (parent) {
            return parent; // 如果找到了父级元素，立即返回
          }
        }
      }

      return null; // 没有找到父级元素，返回 null
    }

    function traverse(data, dragId, dropId, dragLevel, dropLevel) {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item.id === dragId) {
          data.splice(i, 1); // 从原位置删除拖拽元素
          if (dragLevel === dropLevel) {
            // 同级拖拽
            const insertIndex = data.findIndex((row) => row.id === dropId); // 找到目标位置的索引
            data.splice(insertIndex, 0, item);
          } else if (dragLevel < dropLevel) {
            // 向上跨级拖拽
            const parent = findParent(data, dropId); // 找到目标位置的父级元素
            if (parent && !parent.children) {
              parent.children = [];
            }
            parent.children.unshift(item);
          } else {
            // 向下跨级拖拽
            if (!item.children) {
              item.children = [];
            }
            const parent = findParent(data, dropId); // 找到目标位置的父级元素
            if (parent) {
              parent.children.push(item);
            }
          }

          // 结束递归
          return;
        }

        if (item.children && item.children.length > 0) {
          traverse(item.children, dragId, dropId, dragLevel, dropLevel); // 递归遍历子元素
        }
      }
    }
    traverse(newData, dragRow.id, dropRow.id, dragRow.level, dropRow.level);

    setDataSource(newData);
  };

  console.log('dataSource', dataSource);
  return (
    <DndProvider backend={HTML5Backend}>
      {Array.isArray(dataSource) && dataSource.length && (
        <Table
          columns={columns}
          dataSource={dataSource}
          components={{
            body: {
              row: DraggableTableRow,
            },
          }}
          rowKey={(record) => record.id}
          onRow={(record, index) => {
            return {
              index,
              dataSource,
              record,
              parentId: 0,
              parentIndex: 0,
              updateRow,
            };
          }}
        />
      )}
    </DndProvider>
  );
};

export default App;
