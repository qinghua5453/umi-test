/* eslint-disable no-debugger */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';
import { Form, Select, Button } from 'antd';

const TestCmp = () => {
  const [form] = Form.useForm();
  const list = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
  ];
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // const val = form.getFieldValue('select')、
  const val = Form.useWatch('select', form);
  // console.log('val', val);

  useEffect(() => {
    console.log('6666666');
    // setTimeout(() => {
    //   setName('11111')
    // }, 1000)
  }, [val]);

  console.log('name', name);

  const ClickHandle = async () => {
    const vals = form.getFieldsValue();
    console.log('vals', vals);
  };

  const onChange = async () => {
    await async1();
    await async2();
    await async3();
    // debugger
    // setTimeout(() => {
    //   setName('6666')
    // })
  };

  const async1 = async () => {
    setTimeout(() => {
      console.log('async1');
    }, 4000);
  };

  const async2 = async () => {
    console.log('async2');
  };

  const async3 = async () => {
    console.log('async3');
  };
  return (
    <div>
      <Form form={form} name="basic">
        <Form.Item name="select">
          {/* <Select onChange={() => setCount(count + 1)}> */}
          <Select onChange={onChange}>
            {list.map((item) => {
              return (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <div>name:{name}</div>
        <Button onClick={ClickHandle}>提交</Button>
      </Form>
    </div>
  );
};

export default TestCmp;
