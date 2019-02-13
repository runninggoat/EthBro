import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { ethers } from 'ethers'
// import { checkForUpdate } from '../../services/codepush'
import Images from '../../images'
import Balance from './balance'
import { COLORGREEN, COLORORANGE } from '../../themes'

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

  state = {
    end: 10,
    refreshing: false,
  }

  componentDidMount() {
    const { app, navigation } = this.props
    this.willFocus = navigation.addListener('willFocus', () => {
      if (Object.keys(app.wallets).length < 1) {
        navigation.dispatch(NavigationActions.navigate({ routeName: 'ImportWallet' }))
      } else {
        this._updateBalance()
      }
    })
  }

  componentWillUnmount() {
    this.willFocus.remove()
  }

  _updateBalance = async () => {
    const { dispatch } = this.props
    dispatch({ type: 'app/updateUSDPrice' })
    dispatch({ type: 'app/getTxList', payload: {} })
    await dispatch({ type: 'app/updateBalance' })
    // console.log('balance update finish...')
    this.forceUpdate()
  }

  _goToTxDetail = item => {
    this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'TxDetail', params: item }))
  }

  _onRefresh = () => {
    const { dispatch } = this.props
    this.setState({ end: 10, refreshing: true })
    dispatch({ type: 'app/getTxList', payload: { forced: true } }).then(res => {
      this.setState({ refreshing: false })
    })
  }

  _onEndReached = () => {
    const { end } = this.state
    const { app } = this.props
    const { activeWallet, txLists } = app
    if (end >= txLists[activeWallet].length) return
    this.setState({ end: end + 10 })
  }

  _renderTxList = ({ item }) => {
    const { activeWallet } = this.props.app
    const { value, from, to } = item
    if (!to) return null
    let amount = parseFloat(ethers.utils.formatEther(value)).toFixed(4)
    let isReceive = (ethers.utils.getAddress(activeWallet) === ethers.utils.getAddress(to))
    item = { ...item, isReceive }
    return (
      <TouchableOpacity onPress={() => this._goToTxDetail(item)}>
        <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 20, paddingBottom: 20, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
              <Text style={{ color: isReceive ? COLORGREEN : COLORORANGE }}>
                {isReceive ? '收到 ' : '发送 '}
              </Text>
              <Text style={{ fontSize: 14 }} numberOfLines={1} ellipsizeMode='middle'>
                {isReceive ? from : to}
              </Text>
            </View>
            <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Text style={{ color: isReceive ? COLORGREEN : COLORORANGE }}>
                {isReceive ? `+${amount}` : `-${amount}`}
              </Text>
            </View>
            <Image source={Images.forward} style={{ width: 15, height: 15 }}/>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _renderSeperator = () => <View style={{ borderBottomColor: '#999', borderBottomWidth: 1 }}></View>

  render() {
    const { end, refreshing } = this.state
    const { app, navigation } = this.props
    const { balances, ethUSDPrice, activeWallet, txLists } = app
    if (!activeWallet) return (<View style={{ flex: 1 }}></View>)
    console.log(this.props.app.balances)
    return (
      <View style={{ flex: 1 }}>
        <Balance address={activeWallet} balance={balances[activeWallet]} ethUSDPrice={ethUSDPrice} navigation={navigation} usdPrice={ethUSDPrice} />
        <FlatList data={txLists[activeWallet].slice(0, end)} keyExtractor={(item, index) => `${item.hash}-${index}`} renderItem={this._renderTxList} ItemSeparatorComponent={this._renderSeperator} onRefresh={this._onRefresh} refreshing={refreshing} onEndReachedThreshold={0.2} onEndReached={this._onEndReached} />
      </View>
    )
  }
}

export default WalletHome
