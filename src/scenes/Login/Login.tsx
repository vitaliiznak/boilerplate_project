import React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import { css } from 'emotion'

import { useStore } from 'stores/rootContext'

interface IProps {
  form
}

export default Form.create()((props: IProps) => {
  const {
    authStore: { login }
  } = useStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (err) {
        console.log('Received values of form: ', values)
      }
      login(values)
    })
  }

  const { getFieldDecorator } = props.form
  return (
    <Form
      onSubmit={handleSubmit}
      className={css`
        max-width: 400px;
        margin: 0 auto;
        padding-top: 10%;
      `}
    >
      <h1>Any username and password will be accepted</h1>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }]
        })(
          <Input
            prefix={
              <Icon
                type='user'
                className={css`
                  color: rgba(0, 0, 0, 0.25);
                `}
              />
            }
            placeholder='Username'
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }]
        })(
          <Input
            prefix={
              <Icon
                type='lock'
                className={css`
                  color: rgba(0, 0, 0, 0.25);
                `}
              />
            }
            type='password'
            placeholder='Password'
          />
        )}
      </Form.Item>
      <div
        className={css`
          display: flex;
          justify-content: flex-end;
        `}
      >
        <Button type='primary' ghost={true} htmlType='submit'>
          Login
        </Button>
      </div>
    </Form>
  )
})
