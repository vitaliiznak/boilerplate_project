import React, { useEffect, Fragment } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'
import { Skeleton, Modal } from 'antd'
import { PieChart, Pie, Cell } from 'recharts'
import { css } from 'emotion'

import StatisticsStore from 'stores/local/Statistics'

const getColor = (status) => {
  switch (status) {
    case 'terminated':
      return 'red'
    case 'ongoing':
      return 'blue'
    case 'completed':
      return 'green'
    default:
      return 'white'
  }
}

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const styleLegendItem = css`
  display: flex:
  align-items; center;
  padding-right:20px;
    & div {
      width: 14px;
      height: 14px;
      margin-right: 4px;
    }
`

const legendView = (
  <Fragment>
    <div className={styleLegendItem}>
      <div
        className={css`
          background-color: red;
        `}
      />
      <span>- terminated</span>
    </div>
    <div className={styleLegendItem}>
      <div
        className={css`
          background-color: blue;
        `}
      />
      <span>- ongoing</span>
    </div>
    <div className={styleLegendItem}>
      <div
        className={css`
          background-color: green;
        `}
      />
      <span>- completed</span>
    </div>
  </Fragment>
)

export default observer(() => {
  const { results, fetchData, isLoading, query } = useLocalStore(
    () =>
      new StatisticsStore({
        count: 'status'
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
      <h3>Statuses</h3>
      {legendView}
      <PieChart width={400} height={400}>
        <Pie
          data={results}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill='#8884d8'
          dataKey='count'
        >
          {Object.values(results).map(({ term }) => (
            <Cell key={term} fill={getColor(term)} />
          ))}
        </Pie>
      </PieChart>
    </Skeleton>
  )
})
