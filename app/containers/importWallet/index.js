import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import CustomHeader from '../components/CustomHeader.js'
import CustomButton from '../components/CustomButton.js'
import { deviceWidth } from '../../utils'

const styles = StyleSheet.create({
  primaryText: { fontSize: 18, fontWeight: '500' },
  secondaryText: { fontSize: 14, fontWeight: '400', color: '#999' }
})

@connect(({ app }) =>({ app }))
class ImportWallet extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader navigation={navigation} title={'导入钱包'}/>,
    }
  }

  state = {
    privateKey: '',
  }

  _updatePrivateKey = t => {
    this.setState({ privateKey: t })
  }

  _importWallet = async () => {
    const { dispatch, navigation } = this.props
    const { privateKey } = this.state
    const success = await dispatch({ type: 'app/importWallet', payload: { privateKey } })
    if (success) {
      navigation.dispatch(NavigationActions.navigate({ routeName: 'WalletHome' }))
    } else {
      console.log('import fail')
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
        <View style={{ padding: 15, flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.primaryText, { textAlign: 'left' }]}>
              {'输入以太坊私钥导入钱包'}
            </Text>
            <TextInput
              placeholder='私钥'
              underlineColorAndroid='#999'
              numberOfLines={1}
              onChangeText={this._updatePrivateKey}
            />
          </View>
          <View>
            <CustomButton title='导入' width={deviceWidth - 30} action={this._importWallet}/>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default ImportWallet
