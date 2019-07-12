import React from 'react'
import { Input, Select, Form } from 'antd'
import { css } from 'emotion'
import { ReactComponentLike } from 'prop-types'

const { Search } = Input
const { Option } = Select

const searchTypes = [
  {
    id: 'recall_number',
    title: 'Recall Number'
  },
  {
    id: 'city',
    title: 'City'
  },
  {
    id: 'recalling_firm',
    title: 'Recalling Firm'
  }
]

interface IProps {
  form
  onSearch: (values: any) => void
}

export default Form.create()(({ form, onSearch }: IProps) => {
  const onSearchLocal = () => {
    form.validateFields((err, values) => {
      if (err) {
        console.error('Received values of form: ', values)
        return
      }
      onSearch(values)
    })
  }
  const { getFieldDecorator } = form
  return (
    <Form
      className={css`
        width: 80%;
        margin: 0 auto;
      `}
    >
      <Form.Item>
        {getFieldDecorator('term')(
          <Search
            addonBefore={getFieldDecorator('type', {
              initialValue: searchTypes[0].id
            })(
              <Select style={{ width: 150 }}>
                {searchTypes.map(({ id, title }) => (
                  <Option value={id} key={id}>
                    {title}
                  </Option>
                ))}
              </Select>
            )}
            placeholder='input search term'
            onSearch={onSearchLocal}
            style={{ width: '100%' }}
          />
        )}
      </Form.Item>
    </Form>
  )
}) as ReactComponentLike
