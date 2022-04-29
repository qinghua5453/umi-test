/* eslint-disable camelcase */
import React, { useState, useEffect, Children } from 'react';
import { Checkbox } from 'antd';
import { mockSettingData } from './mock';

const CheckboxGroup = Checkbox.Group;
// 权限设置 edit 和detail 公用。（btn级别的）

const PrivilegeSettingCmp = () => {
  const [dataList, setDataList] = useState(mockSettingData);

  const CheckboxCmp = (props) => {
    const { checkboxData } = props;
    console.log('checkboxData', checkboxData);
    return checkboxData.map((item, index) => {
      const style = item.block ? 'block' : 'inline';
      // console.log('index', index, 'item', item);
      if (item.children) {
        const level = '0';
        // return (
        //   <span style={{ display: style }}>
        //     <Checkbox key={index} checked={item.checked} id={item.id} level={level} onChange={(e) => {
        //       // console.log('checkboxData----有几个儿子', checkboxData);
        //       console.log('e', e, 'e.target.id', e.target.id)
        //       recursionFindItem(e.target.id)
        //     }} >
        //       {item.name}
        //     </Checkbox>
        //     <CheckboxCmp checkboxData={item.children} />
        //   </span>
        // )
        return (
          <Checkbox
            key={index}
            checked={item.checked}
            id={item.id}
            level={level}
            onChange={(e) => {
              // console.log('checkboxData----有几个儿子', checkboxData);
              console.log('e', e, 'e.target.id', e.target.id);
              recursionFindItem(e.target.id);
            }}
          >
            {item.name}
          </Checkbox>
        );
      } else {
        return (
          <Checkbox
            key={index}
            checked={item.checked}
            id={item.id}
            onChange={(e) => {
              // console.log('checkboxData----没有儿子', checkboxData, e);
              console.log('e', e, 'e.target.id', e.target.id);
              recursionFindItem(e.target.id);
            }}
          >
            {item.name}
          </Checkbox>
        );
      }
    });
  };

  //   const recursionFindItem = (target, id) => {
  //     target.map((item, index) => {
  //       if (item.children) {
  //         recursionFindItem(item.children, id);
  //       } else {
  //         if (item.id === id) {
  //           debugger
  //           item.checked = true;
  //           setDataList(dataList);
  //         }
  //       }
  //     });
  //  };

  const recursionFindItem = (id) => {
    dataList.forEach((item1) => {
      if (item1.id == id) {
        debugger;
        item1.checked = true;
        if (item1.children) {
          item1.children.forEach((item2) => {
            console.log('item2', item2);
            if (item2.id == id) {
              debugger;
              item2.checked = true;
              if (item2.children) {
                item2.children.forEach((item3) => {
                  if (item3.id == id) {
                    item3.checked = true;
                  }
                });
              }
            }
          });
        }
      }
    });

    setDataList(dataList);
  };

  console.log('datalist', dataList);
  return (
    <div style={{ margin: '200px 50px' }}>
      <CheckboxCmp checkboxData={dataList} />
    </div>
  );
};

export default PrivilegeSettingCmp;
