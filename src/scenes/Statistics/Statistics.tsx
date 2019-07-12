import React from 'react'
import { Card } from 'antd'
import ReportsPerYear from './ReportsPerYear'
import Statuses from './Statuses'

export default () => {
  return (
    <Card>
      <Statuses />
      <ReportsPerYear />
    </Card>
  )
}
