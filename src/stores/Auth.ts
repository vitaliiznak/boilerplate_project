import { observable, action } from 'mobx'
import { create, persist } from 'mobx-persist'

const hydrate = create({
  storage: window.localStorage,
  jsonify: true
})
export default class Auth {
  public root
  constructor(root) {
    this.root = root
  }

  @persist('object')
  @observable
  public user

  @action
  public login = async (values) => {
    // FAKE, store something
    this.user = { ...values }
  }

  @action
  public register = async (_values) => {}

  @action
  public logout = () => {
    console.info('user had been loged out')
    this.user = null
    window.location.href = '/'
  }

  public init = async () => {
    hydrate('authStore', this).then(() =>
      console.info('observable s hydrated')
    )
  }
}
