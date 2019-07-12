import React from 'react'
import { observer } from 'mobx-react-lite'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Spin } from 'antd'
import { css } from 'emotion'

import { useStore } from 'stores/rootContext'
import AppHeader from './AppHeader'

import Page404 from 'scenes/Page404'
import Login from 'scenes/Login'
import Data from 'scenes/Data'
import Statistics from 'scenes/Statistics'

export default observer(() => {
  const {
    rootStore: { ready },
    authStore: { user }
  } = useStore()

  if (!ready) {
    return (
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <Spin size='large' />
      </div>
    )
  }

  if (!user) {
    return (
      <Switch>
        <Route exact={true} path='/login' component={Login} />
        <Route render={() => <Redirect to='/login' />} />
      </Switch>
    )
  }
  return (
    <>
      <AppHeader />
      <div
        className={css`
          padding-top: 40px;
          max-width: 1000px;
          margin: 0 auto;
          padding-right: 30px;
          padding-left: 30px;
        `}
      >
        <Switch>
          <Route exact={true} path='/data' component={Data} />
          <Route exact={true} path='/statistics' component={Statistics} />

          <Route exact={true} path='/' render={() => <Redirect to='/data' />} />
          <Route
            exact={true}
            path='/login'
            render={() => <Redirect to='/data' />}
          />
          <Route component={Page404} />
        </Switch>
      </div>
    </>
  )
})
