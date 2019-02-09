import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { ROPSTEN, NetworkName } from '../../services/etherscan'
import Images from '../../images'
import { deviceWidth } from '../../utils'
import CustomButton from '../components/CustomButton.js'

const styles = StyleSheet.create({
  network: { color: '#DE8100', fontSize: 14, position: 'absolute', right: 15, top: 10 },
  addressRow: { flexDirection: 'row', paddingLeft: 30, paddingRight: 30, justifyContent: 'center', marginTop: 15 },
})

class Balance extends Component {
  _goToWalletList = () => {
    const { navigation } = this.props
    navigation.dispatch(NavigationActions.navigate({ routeName: 'WalletList' }))
  }

  render() {
    let { network, address, balance } = this.props
    if (!network) network = ROPSTEN
    let networkName = NetworkName[network]
    const { ETH, qrCode } = Images
    return (
      <View style={{ borderBottomColor: '#999', borderBottomWidth: 1 }}>
        <Text style={styles.network}>
          {networkName}
        </Text>
        <View style={{ alignItems: 'center', width: deviceWidth, marginTop: 30 }}>
          <Image source={ETH} style={{ width: 70, height: 70 }}/>
        </View>
        <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 20 }}>
          {'以太坊(Ether)'}
        </Text>
        <Text style={{ fontSize: 30, textAlign: 'center', color: '#000' }}>
          {parseFloat(balance).toFixed(4)}
        </Text>
        <View style={styles.addressRow}>
          <Text style={{ fontSize: 16, marginRight: 15, flex: 1 }}>
            {'地址'}
          </Text>
          <Text style={{ fontSize: 16, flex: 8 }} numberOfLines={1} ellipsizeMode='middle'>
            {address}
          </Text>
          <Image source={qrCode} style={{ width: 24, height: 24, marginLeft: 15 }}/>
        </View>
        <View style={{ flexDirection: 'row', paddingLeft: 30, paddingRight: 30, justifyContent: 'space-between', marginTop: 15, marginBottom: 15 }}>
          <CustomButton title={'切换钱包'} action={this._goToWalletList}/>
          <CustomButton title={'转账'}/>
        </View>
      </View>
    )
  }
}

export default Balance
