import React, { useEffect } from 'react';
import { Form, Input } from 'antd';

function FormCmp2({ form, filterList, setFilterList }) {
  const onValuesChange = (changedValues, allValues) => {
    console.log('allValues2222', allValues);
    form.setFieldsValue({ filterList: allValues.filterList });
  };

  console.log('2222', form.getFieldValue('filterList'));

  useEffect(() => {
    form.setFieldsValue({ filterList: filterList });
  }, [filterList]);

  return (
    <div>
      <Form name="basic" form={form} style={{ width: '300px' }}>
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
                          <Form.Item name={[field.name, 'name']}>
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
    </div>
  );
}

export default FormCmp2;
