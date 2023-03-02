import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';

function FormCmp1({ form, filterList, setFilterList }) {
  const list = [
    { name: 'zj', age: 34, filter: { name: 'zj' } },
    { name: 'qinghua', age: 4, filter: { name: 'qinghua' } },
  ];

  const onValuesChange = (changedValues, allValues) => {
    console.log('allValues', allValues);
    setFilterList(allValues.filterList);
    form
      .validateFields()
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  console.log('11111', form.getFieldValue('filterList'), filterList);

  useEffect(() => {
    if (filterList) {
      form.setFieldsValue({ filterList: filterList });
    } else {
      form.setFieldsValue({ filterList: list });
    }
  }, [filterList]);

  const submit = () => {
    console.log('tijiao', form.getFieldValue('filterList'));
    form
      .validateFields()
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => console.log('err', err));
  };

  return (
    <div>
      <Form
        name="basic"
        form={form}
        style={{ width: '300px' }}
        onValuesChange={onValuesChange}
      >
        <Form.List name="filterList">
          {(fields, { add, remove }) => {
            {
              return fields.map((field) => {
                // console.log('fi', field);
                return (
                  <div>
                    <Form.Item key={field.name} shouldUpdate>
                      {({ getFieldValue }) => {
                        // const test = getFieldValue(['test', field.name]);
                        return (
                          <Form.Item
                            name={[field.name, 'name']}
                            rules={[{ required: true, message: '请输入' }]}
                          >
                            <Input />
                          </Form.Item>
                        );
                      }}
                    </Form.Item>
                    <Form.Item>
                      <div onClick={add}>添加</div>
                    </Form.Item>
                  </div>
                );
              });
            }
          }}
        </Form.List>
      </Form>
      <Button onClick={submit}>提交</Button>
    </div>
  );
}

export default FormCmp1;
