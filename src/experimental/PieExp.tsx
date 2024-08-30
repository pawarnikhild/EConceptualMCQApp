import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'

//@ts-ignore
import PieChart from 'react-native-pie-chart'

const PieExp = () => {
    const widthAndHeight = 250
    // const series = [123, 321, 123, 789, 537]
    // const sliceColor = ['#fbd203', '#ffb300', '#ff9100', '#ff6c00', '#ff3c00']
    const series = [1, ]
    const sliceColor = ['#fbd203',]
  return (
    <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Basic</Text>
          <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor} />
          <Text style={styles.title}>Doughnut</Text>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.45}
            coverFill={'#FFF'}
          />
        </View>
      </ScrollView>
  )
}

export default PieExp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
      },
      title: {
        fontSize: 24,
        margin: 10,
      },
    
})