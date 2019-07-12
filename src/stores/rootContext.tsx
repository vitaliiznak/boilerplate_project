import React from 'react'
import { useLocalStore } from 'mobx-react-lite'
import Root from './Root'

export const rootAux = new Root()
const StoreContext = React.createContext<any>(null)

export const StoreProvider = ({ children }) => (
  <StoreContext.Provider value={useLocalStore(() => rootAux.stores)}>
    {children}
  </StoreContext.Provider>
)

export const useStore = () => {
  const store = React.useContext(StoreContext)
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('You have forgot to use StoreProvider, shame on you.')
  }
  return store
}

export default rootAux
