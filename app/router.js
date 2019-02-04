import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  NavigationActions,
} from 'react-navigation'
import React, { Component } from 'react'
import { BackHandler, View, Text } from 'react-native'
import { connect } from 'react-redux'
import WalletHome from './containers/walletHome'
import Settings from './containers/settings'

const AppNavigator = createBottomTabNavigator(
  {
    WalletHome: { screen: WalletHome },
    Settings: { screen: Settings },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
  }
)

const MainNavigator = createStackNavigator(
  {
    AppNavigator: { screen: AppNavigator },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: true,
    },
  }
)

const AppContainer = createAppContainer(MainNavigator)

@connect(({ router }) => ({ router }))
class Router extends Component {
  render() {
    const { dispatch, router } = this.props
    return <AppContainer />
  }
}

export default Router
