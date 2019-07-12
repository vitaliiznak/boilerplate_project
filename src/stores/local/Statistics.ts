import { observable, action, runInAction, computed } from 'mobx'
import qs from 'qs'

const API_URI = process.env.REACT_APP_API_URI as string

export default class Statistics {
  @observable public query
  constructor(query) {
    runInAction(() => {
      this.query = query
    })
  }

  @observable public results = []
  @observable public resultsMeta: any = null
  @observable public isLoading = true

  @action public fetchData = async () => {
    this.isLoading = true
    const resultRaw = await fetch(`${API_URI}?${qs.stringify(this.query)}`)
    if (resultRaw.ok) {
      const { results, meta } = await resultRaw.json()
      runInAction(() => {
        this.results = results
        this.resultsMeta = meta.results
        this.isLoading = false
      })
    } else if (resultRaw.status === 404) {
      runInAction(() => {
        this.results = []
        this.resultsMeta = null
        this.isLoading = false
      })
    } else {
      throw new Error('error from the server')
    }
  }

  @computed
  get resultsByYear() {
    return Object.values(
      this.results.reduce((accum, record: any) => {
        const year = record.time.substring(0, 4)
        accum[year] = {
          year,
          count: accum[year] ? accum[year].count + record.count : 0
        }
        return accum
      }, {})
    )
  }
}
