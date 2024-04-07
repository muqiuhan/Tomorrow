import timeseries from '@/assets/data/timeseries.json'

export const TestData: Model[] = Object.values(timeseries.values)

export interface Model {
  datetime: string
  close: string
}
