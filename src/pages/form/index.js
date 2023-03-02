import React, { useEffect } from 'react';
import { Form, Input, Menu } from 'antd';
import FormCmp1 from './formCmp1';
import FormCmp2 from './formCmp2';
import { useState } from 'react';

function FormCmp() {
  const [form] = Form.useForm();
  const list = [
    { name: 'zj', age: 34, filter: { name: 'zj' } },
    { name: 'qinghua', age: 4, filter: { name: 'qinghua' } },
  ];
  const [activeKey, setActiveKey] = useState(0);
  const [filterList, setFilterList] = useState('');
  console.log('activeKey', activeKey, 'filterList', filterList);

  // useEffect(() => {
  //   // form.setFieldsValue({ 'filterList': list })
  //   setFilterList(list);
  // }, []);

  const Menus = [
    { label: '菜单项一', key: 'item-1' }, // 菜单项务必填写 key
    { label: '菜单项二', key: 'item-2' },
  ];

  const submit = () => {
    form
      .validateFields()
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => console.log('err', err));
  };

  const menuOnClick = ({ item, keyPath }) => {
    console.log('keyPath', keyPath);
  };
  return (
    <div>
      <ul>
        {Menus.map((item, index) => {
          return (
            <li key={item.key} onClick={() => setActiveKey(index)}>
              {item.label}
            </li>
          );
        })}
      </ul>
      {activeKey === 0 && (
        <FormCmp1
          form={form}
          setFilterList={setFilterList}
          filterList={filterList}
        />
      )}
      {activeKey === 1 && (
        <FormCmp1
          form={form}
          setFilterList={setFilterList}
          filterList={filterList}
        />
      )}
    </div>
  );
}

export default FormCmp;
