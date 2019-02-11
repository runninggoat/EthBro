import React, { Component } from 'react'
import { View, Text, TextInput, Button, Image } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { checkForUpdate } from '../../services/codepush'
import Images from '../../images'
import Balance from './balance'

@connect(({ app }) => ({ app }))
class WalletHome extends Component {
  static navigationOptions = ({ navigation }) => {
    const { wallet,  walletFocused} = Images
    return {
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return (
          <Image source={focused ? walletFocused : wallet} style={{ width: 24, height: 24 }}/>
        )
      },
      tabBarLabel: '钱包',
      swipeEnabled: true,
      animationEnabled: true,
    }
  }

  componentDidMount() {
    const { app, navigation } = this.props
    if (Object.keys(app.wallets).length < 1) {
      navigation.dispatch(NavigationActions.navigate({ routeName: 'ImportWallet' }))
    }
    this.willFocus = navigation.addListener('willFocus', () => {
      this._updateBalance()
    })
  }

  componentWillUnmount() {
    this.willFocus.remove()
  }

  _updateBalance = async () => {
    const { dispatch } = this.props
    dispatch({ type: 'app/updateUSDPrice' })
    await dispatch({ type: 'app/updateBalance' })
    console.log('balance update finish...')
    this.forceUpdate()
  }

  // _ethBlockNumber = async () => {
  //   const { dispatch } = this.props
  //   let resp = null
  //   resp = await dispatch({
  //     type: 'app/getEthBlockNumber',
  //   })
  // }

  render() {
    const { app, navigation } = this.props
    const { wallets, balances, ethUSDPrice, activeWallet } = app
    if (!activeWallet) return (<View style={{ flex: 1 }}></View>)
    let wallet = wallets[activeWallet]
    console.log(this.props.app.balances)
    return (
      <View style={{ flex: 1 }}>
        <Balance address={activeWallet} balance={balances[activeWallet]} ethUSDPrice={ethUSDPrice} navigation={navigation} />
      </View>
    )
  }
}

export default WalletHome
