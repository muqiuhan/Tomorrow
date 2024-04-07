import { Alert, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'
import { Text, View } from './Themed'
import { GraphPoint, LineGraph } from 'react-native-graph'
import * as Array from 'fp-ts/Array'
import * as TimeSeriesFun from '../update/TimeSeries'
import * as TimeSeriesModel from '../model/TimeSeries'
import * as Fun from 'fp-ts/function'
import * as GraphFun from '@/src/update/Graph'
import * as Either from 'fp-ts/Either'
import { useState } from 'react'
import { MonoText } from './StyledText'

const points: GraphPoint[] = Array.map((value: TimeSeriesModel.Model) => ({
  date: new Date(value.datetime),
  value: Fun.pipe(
    TimeSeriesFun.NumberCloseValue(value),
    Either.match(
      (err) => {
        Alert.alert(err)
        return 0
      },
      (value) => value
    )
  )
}))(TimeSeriesModel.TestData)

const Graph = () => {
  const [selectedPoint, setSelectedPoint] = useState<GraphPoint>()
  const lastPoint = Array.last(points)

  return (
    <View>
      <MonoText style={styles.selectPointValue}>
        $ {GraphFun.SelectedPointValue(selectedPoint, lastPoint)}
      </MonoText>

      <Text style={styles.selectedPointDate}>
        {GraphFun.SelectedPointDate(selectedPoint, lastPoint)}
      </Text>

      <LineGraph
        points={points}
        animated
        color={Colors.light.graphColor}
        style={styles.graph}
        enablePanGesture
        enableIndicator
        indicatorPulsating
        enableFadeInMask
        gradientFillColors={[
          Colors.light.graphGradient[0],
          Colors.light.graphGradient[1]
        ]}
        onPointSelected={GraphFun.OnPointSelected(
          selectedPoint,
          setSelectedPoint
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  graph: {
    width: '100%',
    height: 300
  },

  selectPointValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.graphColor
  },

  selectedPointDate: {
    color: 'grey'
  }
})

export default Graph
