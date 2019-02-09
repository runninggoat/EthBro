import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { deviceWidth, deviceHeight } from '../../utils'

const LONG = 8000
const SHORT = 4000

class CustomToast extends Component {
  state = {
    display: false,
    duration: 0,
    text: '',
    intervalTask: null,
  }

  componentDidMount() {
    let id = setInterval(() => {
      const { duration, display } = this.state
      if (duration <= 0 && display) {
        this.setState({ display: false })
      }
      this.setState({ duration: duration - 1000 })
    }, 1000)
    this.setState({ intervalTask: id })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalTask)
  }

  showToast = (text, duration = SHORT) => {
    this.setState({ display: true, duration, text })
  }

  render() {
    const { display, text } = this.state
    if (!display) return null
    return (
      <View style={{ width: deviceWidth, height: deviceHeight, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0 }}>
        <View style={{ backgroundColor: '#454545', borderRadius: 10, padding: 10 }}>
          <Text style={{ color: '#fff', textAlign: 'center' }}>
            {text}
          </Text>
        </View>
      </View>
    )
  }
}

export default CustomToast

const styles = StyleSheet.create({
  container: {},
})
