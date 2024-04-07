import * as Either from 'fp-ts/Either'
import * as Fun from 'fp-ts/function'
import * as TimeSeriesModel from '@/src/model/TimeSeries'

export const NumberCloseValue = (
  timeseries: TimeSeriesModel.Model
): Either.Either<string, number> => {
  return Fun.pipe(Number.parseFloat(timeseries.close), (value: number) => {
    if (Number.isNaN(value)) {
      return Either.left(`Failed to get the close value: ${timeseries.close}`)
    } else {
      return Either.right(value)
    }
  })
}
