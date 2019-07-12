import { observable, action, runInAction } from 'mobx'
import qs from 'qs'

const API_URI = process.env.REACT_APP_API_URI as string
export const defaultPageSize = 20

export default class Data {
  @observable public results = []
  @observable public resultsMeta: any = null
  @observable public isLoading = true
  @observable public query = {
    skip: 0,
    limit: defaultPageSize
  }

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

  @action public onSearch = ({ type, term }) => {
    const newQuery = { ...this.query, ...{ search: `${type}:"${term}"` } }
    if (!term) {
      delete newQuery.search
    }
    this.query = newQuery
  }

  @action public onPageChange = (page, _pageSize) => {
    this.query = {
      ...this.query,
      ...{ skip: (page - 1) * defaultPageSize }
    }
  }
}
