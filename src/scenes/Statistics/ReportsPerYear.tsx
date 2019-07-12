import React, { useEffect } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'
import { Skeleton, Modal } from 'antd'

import StatisticsStore from 'stores/local/Statistics'

export default observer(() => {
  const {
    resultsByYear,
    fetchData,
    isLoading,

    query
  } = useLocalStore(
    () =>
      new StatisticsStore({
        count: 'report_date'
      })
  )

  useEffect(() => {
    fetchData().catch((_err) => {
      Modal.error({
        title: 'Some error occured',
        content: 'Check your network connection and reload the page'
      })
    })
  }, [query, fetchData])

  return (
    <Skeleton loading={isLoading}>
      <h3>Reports per year</h3>
      <LineChart
        width={500}
        height={300}
        data={resultsByYear}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='year' />
        <YAxis dataKey='count' />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='count'
          stroke='#8884d8'
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </Skeleton>
  )
})
