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
import ImportWallet from './containers/importWallet'
import WalletList from './containers/walletList'

const AppNavigator = createBottomTabNavigator(
  {
    WalletHome: { screen: WalletHome },
    Settings: { screen: Settings },
  }
)

AppNavigator.navigationOptions = {
  headerBackTitle: null,
  headerTitle: null,
  header: null,
  gesturesEnabled: true,
  swipeEnabled: true,
  animationEnabled: true,
}

const MainNavigator = createStackNavigator(
  {
    AppNavigator: { screen: AppNavigator },
    ImportWallet: { screen: ImportWallet },
    WalletList: { screen: WalletList },
  },
  {
    headerMode: 'screen',
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
