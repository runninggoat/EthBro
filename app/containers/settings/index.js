import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
} from 'react-native'
import { connect } from 'react-redux'
import Images from '../../images'

class Settings extends Component {
  static navigationOptions = ({ navigation }) => {
    const { settings,  settingsFocused} = Images
    return {
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return (
          <Image source={focused ? settingsFocused : settings} style={{ width: 24, height: 24 }}/>
        )
      },
      tabBarLabel: '设置',
      swipeEnabled: true,
      animationEnabled: true,
    }
  }

  render() {
    return (
      <View>
        <Text>
          {'Settings'}
        </Text>
      </View>
    )
  }
}

export default Settings
