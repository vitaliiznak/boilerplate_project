import React from 'react'
import { Layout, Button } from 'antd'
import { css } from 'emotion'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { useStore } from 'stores/rootContext'

const { Header } = Layout

const styleContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid rgb(235, 237, 240);
  padding-left: 30px !important;
`

const styleNavLink = css`
  padding: 0 10px;
  padding-bottom: 8px;
  border-bottom: 2px solid transparent;
`

const activeClassName = css`
  border-bottom-color: #1890ff;
`

export default () => {
  const { t } = useTranslation('common')

  const {
    authStore: { logout }
  } = useStore()

  return (
    <Header className={styleContainer}>
      <div>
        <NavLink
          className={styleNavLink}
          activeClassName={activeClassName}
          to='/data'
        >
          Data
        </NavLink>
        <NavLink
          className={styleNavLink}
          activeClassName={activeClassName}
          to='/statistics'
        >
          Statistics
        </NavLink>
      </div>
      <Button type='primary' ghost={true} onClick={logout}>
        Logout
      </Button>
    </Header>
  )
}
