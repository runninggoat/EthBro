import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  button: { padding: 10, borderRadius: 5 },
})

class CustomButton extends Component {
  render() {
    const { action = () => {}, title, color = '#3F9BEC', textColor = '#fff', width = 120 } = this.props
    return (
      <TouchableOpacity onPress={action}>
        <View style={[styles.button, { backgroundColor: color, width: width }]}>
          <Text style={{ textAlign: 'center', color: textColor }}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default CustomButton
