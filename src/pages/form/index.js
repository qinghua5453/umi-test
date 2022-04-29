import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Radio, Tabs, Switch, message } from 'antd';

const AddForm = () => {
  const [form] = Form.useForm();
  const onClick = () => {
    form
      .validateFields()
      .then((res) => {
        console.log('res', res);
      })
      .catch(() => {
        console.log('dddd', form.getFieldValue());
      });
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        // autoComplete="off"
        className="ccResetForm"
        // initialValues={initialValues}
        form={form}
      >
        <Form.Item
          label="用户组名称"
          name="name"
          rules={[{ required: true, message: '请输入用户组名称!' }]}
        >
          <Input placeholder="支持中英文字符输入，最长限制50个字符" />
        </Form.Item>
      </Form>
      <Button onClick={onClick}>asdasd</Button>
    </>
  );
};

export default AddForm;
