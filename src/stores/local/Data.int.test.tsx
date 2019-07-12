import { toJS } from 'mobx'
import Data from './Data'

/* integrational testing */
/* use mockup server for uit testing */
const statisticsDataStore = new Data()
it('makes api call and gets food data 20 pages default', async () => {
  await statisticsDataStore.fetchData()
  expect(toJS(statisticsDataStore.results).length).toBe(20)
})
