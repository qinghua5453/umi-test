/* eslint-disable no-debugger */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Table } from 'antd';
import { tableData, columns } from './mock';
import { useState, useCallback, useRef, useEffect } from 'react';
import { getParam, buildStandardArr, getParent } from './utils';

const DraggableTableRow = ({ index, record, updateRow, ...restProps }) => {
  const ref = useRef(null);

  const itemObj = {
    id: record.id,
    index,
  };

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

      const opt = {
        dragId: item.id, // 拖拽id
        dropId: record.id, // 要放置位置行的id
        dropParentId: record.parentId,
        dragKey: record.dragKey,
        dropKey: record.dropKey,
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
    const { dragId, dropId } = opt;
    const params = getParam(dataSource, dragId, dropId);
    const { dragKey, dropKey, dragRow, dropRow } = params;
    const parent = getParent(dataSource, dragRow.parentId);
    console.log('parent', parent);
    console.log('params', params);

    const data = [...dataSource];
    if (dragKey === dropKey) return;
    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };

    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    // if (Array.isArray(dropRow.children)) {
    //   console.log('进去了')
    //   dropRow.children.unshift(dragObj);
    // } else {
    //   let ar = [];
    //   let i;
    //   loop(data, dropKey, (_item, index, arr) => {
    //     ar = arr;
    //     i = index;
    //   });
    //   const dragKeyArr = dragKey.split('-');
    //   const dropKeyArr = dropKey.split('-');
    //   const dropPosition = dragKeyArr[dragKeyArr.length - 1] - dropKeyArr[dropKeyArr.length - 1];
    //   // 同级 相邻node拖拽分情况
    //   if (dropPosition === -1) {
    //     ar.splice(i + 1, 0, dragObj);
    //   } else {
    //     ar.splice(i, 0, dragObj);
    //   }
    //   console.log('ar', ar);
    // }
    let ar = [];
    let i;
    loop(data, dropKey, (_item, index, arr) => {
      ar = arr;
      i = index;
    });
    const dragKeyArr = dragKey.split('-');
    const dropKeyArr = dropKey.split('-');
    const dropPosition =
      dragKeyArr[dragKeyArr.length - 1] - dropKeyArr[dropKeyArr.length - 1];
    // 同级 相邻node拖拽分情况
    if (dropPosition === -1) {
      ar.splice(i + 1, 0, dragObj);
    } else {
      ar.splice(i, 0, dragObj);
    }
    console.log('ar', ar);
    setDataSource(data);
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
              record,
              updateRow,
            };
          }}
        />
      )}
    </DndProvider>
  );
};

export default App;
