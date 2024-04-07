import stocks from '@/assets/data/top5.json'

export const TestData: Model[] = Object.values(stocks)

export interface Model {
  name: string
  symbol: string
  close: string
  percent_change: string
}
