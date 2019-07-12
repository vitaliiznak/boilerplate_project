/* eslint-disable import/no-named-as-default */
import { configure, observable, runInAction } from 'mobx'

/*   import Board from "./Board"; */
import Auth from './Auth'

configure({
  enforceActions: 'always'
})
export class Root {
  @observable public ready = false
  public stores = {
    rootStore: this,
    authStore: new Auth(this)
  }

  public init = async () => {
    await this.stores.authStore.init()
    await Promise.all([])
    runInAction(() => {
      this.ready = true
    })
  }
}

export default Root
