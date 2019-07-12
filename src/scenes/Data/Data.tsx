import React, { useEffect } from 'react'
import { Table, Card, Modal } from 'antd'
import { observer, useLocalStore } from 'mobx-react-lite'
import { css } from 'emotion'

import SearchForm from './SearchForm'
import DataStore, { defaultPageSize } from 'stores/local/Data'

const { Column } = Table

export default observer(() => {
  const {
    results,
    fetchData,
    isLoading,
    resultsMeta,
    onSearch,
    onPageChange,
    query
  } = useLocalStore(() => new DataStore())

  useEffect(() => {
    fetchData().catch((_err) => {
      Modal.error({
        title: 'Some error occured',
        content: 'Check your network connection and reload the page'
      })
    })
  }, [query])

  const { total } = resultsMeta || { total: 0 }
  return (
    <Card>
      <Table
        title={() => <SearchForm onSearch={onSearch} />}
        loading={isLoading}
        dataSource={results}
        pagination={{
          hideOnSinglePage: true,
          total,
          defaultPageSize,
          onChange: onPageChange
        }}
        rowKey={({ event_id, recall_number }) => `${event_id}_${recall_number}`}
        expandedRowRender={(record) => (
          <pre
            className={css`
              display: block;
              width: 100%;
              max-width: 380px;
              overflow: auto;
            `}
          >
            {JSON.stringify(record, null, 2)}
          </pre>
        )}
        className={css`
          width: 100%;
          overflow: auto;
        `}
      >
        <Column key='event_id' title='Event Id' dataIndex='event_id' />
        <Column
          key='recall_number'
          title='Recal Number'
          dataIndex='recall_number'
        />
        <Column key='country' title='Country' dataIndex='country' />
        <Column
          key='classification'
          title='Classification'
          dataIndex='classification'
        />
        <Column key='status' title='Status' dataIndex='status' />
      </Table>
    </Card>
  )
})
