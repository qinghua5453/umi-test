/* eslint-disable camelcase */
import React, { useState, useEffect, Children } from 'react';
import { Checkbox } from 'antd';
import { mockSettingData } from './mock';

const CheckboxGroup = Checkbox.Group;
// 权限设置 edit 和detail 公用。（btn级别的）

const PrivilegeSettingCmp = () => {
  const [dataSource, setDataSource] = useState(mockSettingData);
  console.log('dataSource', dataSource);

  const CheckboxCmp = (props) => {
    const { checkboxData } = props;
    // console.log('checkboxData', checkboxData);

    const onChange = (item) => {
      console.log('item', item);
      if (item.value.includes(item.id)) {
        // debugger
        const index = item.value.findIndex((v) => item.id === v);
        item.value.splice(index, 1);
      } else {
        item.value.push(item.id);
      }
      setDataSource([...dataSource]);
    };

    return checkboxData.map((item, index) => {
      const style = item.block ? 'block' : 'inline';
      return (
        <span style={{ display: style }}>
          <CheckboxGroup
            key={index}
            options={[{ value: item.id, label: item.name }]}
            value={item.value}
            onChange={() => {
              onChange(item);
            }}
          />
          {item.children && <CheckboxCmp checkboxData={item.children} />}
        </span>
      );
    });
  };

  return (
    <div style={{ margin: '200px 0px' }}>
      <CheckboxCmp checkboxData={dataSource} />
    </div>
  );
};

export default PrivilegeSettingCmp;
