import { Form, Input } from 'antd';
import { useEffect } from 'react';

const Demo = () => {
  const [form] = Form.useForm();
  const userName = Form.useWatch('username', form);
  // const userName = form.getFieldValue('username');
  console.log('userName', userName);

  useEffect(() => {
    form.setFieldsValue({ userName: 'dddd' });
  }, [form]);

  return (
    <Form form={form}>
      <Form.Item name="username">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default Demo;
