import React, { useEffect, useState } from 'react';
import { Form, Switch } from 'antd';

function SwitchCmp() {
  const [form] = Form.useForm();
  // useEffect(() => {
  //   form.setFields([
  //     {
  //       name: 'switch',
  //       value: true
  //     },
  //   ]);
  // }, []);

  const f = form.getFieldValue('switch');
  console.log(f);
  const [show, setShow] = useState(true);
  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="switch"
          name="switch"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Switch
            checked={f}
            onChange={(e) => {
              // setShow(e)
              form.setFields([
                {
                  name: 'switch',
                  value: e,
                },
              ]);
            }}
          />

          {/* <Switch checked={f} onChange={(e) => {
            setShow(e)
          }} /> */}
        </Form.Item>
      </Form>
    </div>
  );
}

export default SwitchCmp;
