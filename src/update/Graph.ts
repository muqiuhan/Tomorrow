import { GraphPoint } from 'react-native-graph'
import * as Fun from 'fp-ts/function'
import * as Option from 'fp-ts/Option'
import { Alert } from 'react-native'

/** This is the parameter of react-native-graph/LineGraph component. */
export const OnPointSelected =
  (
    _selectedPoint: GraphPoint | undefined,
    setSelectedPoint: React.Dispatch<
    React.SetStateAction<GraphPoint | undefined>
    >
  ) =>
    (point: GraphPoint): void => {
      setSelectedPoint(point)
    }

/** Convert selectPoint from GraphPoint | undefined to Option<GraphPoint> */
export const SafeGetSelectPoint = (
  selectPoint: GraphPoint | undefined
): Option.Option<GraphPoint> => {
  if (selectPoint === undefined) {
    return Option.none
  } else {
    return Option.some(selectPoint)
  }
}

export const SelectedPointValue = (
  selectedPoint: GraphPoint | undefined,
  lastPoint: Option.Option<GraphPoint>
): string => {
  return Fun.pipe(
    selectedPoint,
    SafeGetSelectPoint,
    Option.match(
      (): string => {
        return Fun.pipe(
          lastPoint,
          Option.match(
            () => {
              Alert.alert('Failed to get the last close value')
              return 'ERROR'
            },
            (lastPoint) => lastPoint.value.toFixed(1)
          )
        )
      },
      (selectedPoint) => selectedPoint.value.toFixed(1)
    )
  )
}

export const SelectedPointDate = (
  selectedPoint: GraphPoint | undefined,
  lastPoint: Option.Option<GraphPoint>
): string => {
  return Fun.pipe(
    selectedPoint,
    SafeGetSelectPoint,
    Option.match(
      (): string => {
        return Fun.pipe(
          lastPoint,
          Option.match(
            () => {
              Alert.alert('Failed to get the last close date')
              return 'ERROR'
            },
            (lastPoint) => lastPoint.date.toDateString()
          )
        )
      },
      (selectedPoint) => selectedPoint.date.toDateString()
    )
  )
}
