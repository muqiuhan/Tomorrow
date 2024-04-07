
import * as Either from 'fp-ts/Either'
import * as Fun from 'fp-ts/function'
import Stock from '../model/Stock'

/**
 * Returns the style, prefix and number value corresponding to percent_change.
 * @param percentChange @see Stock.percent_change
 * @returns Either<error info, [color, perfix, value]>
 */
export const PercentChangeInfo = (
  percentChange: string
): Either.Either<string, [string, string, string]> => {
  return Fun.pipe(Number.parseFloat(percentChange), (value: number) => {
    if (Number.isNaN(value)) {
      return Either.left(
        `Failed to parse the percent_change: ${percentChange}`
      )
    } else {
      return Either.right([
        value > 0 ? 'red' : 'green',
        value > 0 ? '+' : '',
        value.toFixed(1)
      ])
    }
  })
}
