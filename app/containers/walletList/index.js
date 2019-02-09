import React, { Component } from 'react'
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StyleSheet, Clipboard } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import CustomHeader from '../components/CustomHeader.js'
import CustomButton from '../components/CustomButton.js'
import CustomToast from '../components/CustomToast.js'
import Images from '../../images'
import { deviceWidth } from '../../utils'

@connect(({ app }) => ({ app }))
class WalletList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader navigation={navigation} title={'切换钱包'}/>,
    }
  }

  _copyAddress = (address) => {
    Clipboard.setString(address)
    this.refs.toast.showToast('复制成功')
  }

  _updateWalletName = (name, address) => {
    const { dispatch } = this.props
    dispatch({ type: 'app/updateWalletName', payload: { name, address } })
  }

  _selectWallet = address => {
    const { dispatch } = this.props
    dispatch({ type: 'app/selectWallet', payload: { address } })
  }

  _deleteWallet = address => {
    const { dispatch } = this.props
    dispatch({ type: 'app/deleteWallet', payload: { address } })
  }

  _goToImportWallet = () => {
    const { navigation } = this.props
    navigation.dispatch(NavigationActions.navigate({ routeName: 'ImportWallet' }))
  }

  _renderWalletList = (wallets, activeWallet, balances) => {
    let items = []
    const addresses = Object.keys(wallets)
    addresses.forEach(address => {
      items.push(this._renderWallet(address === activeWallet, wallets[address], balances[address]))
    })
    return items
  }

  _renderWallet = (selected, wallet, balance) => {
    return (
      <View style={{ alignItems: 'center', padding: 15, paddingBottom: 0 }} key={wallet.address}>
        <WalletCard selected={selected} wallet={wallet} balance={balance} onCopyAddress={this._copyAddress} onSaveWalletName={this._updateWalletName} onSelectWallet={this._selectWallet} onDeleteWallet={this._deleteWallet}/>
      </View>
    )
  }

  render() {
    const { app } = this.props
    const { wallets, balances, activeWallet } = app
    return (
      <View style={{ flex: 1 }}>
        <CustomToast ref='toast'/>
        <ScrollView style={{ flex: 1 }}>
          {this._renderWalletList(wallets, activeWallet, balances)}
        </ScrollView>
        <View style={{ alignItems: 'center', padding: 15 }}>
          <CustomButton title='导入钱包' width={deviceWidth - 30} action={this._goToImportWallet}/>
        </View>
      </View>
    )
  }
}

export default WalletList

class WalletCard extends Component {
  state = {
    editing: false,
    walletName: '',
  }

  _updateWalletName = t => {
    this.setState({ walletName: t })
  }

  _enableEditingWalletName = () => {
    const { wallet } = this.props
    this.setState({ walletName: wallet.name, editing: true })
  }

  _saveWalletName = () => {
    const { onSaveWalletName, wallet } = this.props
    const { walletName } = this.state
    if (!walletName) return
    onSaveWalletName(walletName, wallet.address)
    this.setState({ walletName: '', editing: false })
  }

  render() {
    const { selected = false, wallet, balance, onCopyAddress, onSelectWallet, onDeleteWallet } = this.props
    const { editing, walletName } = this.state
    return (
      <TouchableOpacity style={{ backgroundColor: selected ? '#3F9BEC' : '#fff', padding: 15, borderRadius: 5, width: '100%', borderWidth: selected ? 0 : 1 }} onPress={() => onSelectWallet(wallet.address)}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {editing ? (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              <TextInput placeholder='钱包名称' value={walletName} onChangeText={this._updateWalletName} underlineColorAndroid='#999' maxLength={10} style={{ padding: 3, marginRight: 10 }}/>
              <TouchableOpacity onPress={this._saveWalletName}>
                <Image source={Images.save} style={styles.image}/>
              </TouchableOpacity>
            </View>
            ) : (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              <Text style={{ fontSize: 16, marginRight: 10 }}>
                {wallet.name}
              </Text>
              <TouchableOpacity onPress={this._enableEditingWalletName}>
                <Image source={Images.edit} style={styles.image}/>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity onPress={() => onDeleteWallet(wallet.address)}>
            <Image source={Images.delete_} style={styles.image}/>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
          <Text style={{ fontSize: 16 }}>
            {'ETH'}
          </Text>
          <Text style={{ fontSize: 16 }}>
            {parseFloat(balance).toFixed(4)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
          <Text style={{ fontSize: 16, flex: 1 }} numberOfLines={1} ellipsizeMode='middle'>
            {wallet.address}
          </Text>
          <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => onCopyAddress(wallet.address)}>
            <Image source={Images.copy} style={styles.image}/>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  image: { width: 24, height: 24 },
})
