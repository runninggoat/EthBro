import React, { Component } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import { checkForUpdate } from '../../services/codepush'

@connect(({ app }) => ({ app }))
class WalletHome extends Component {
  componentDidMount() {
    console.log('WalletHome mounted...')
  }

  _updateText = t => {
    const { dispatch } = this.props
    dispatch({
      type: 'app/updateState',
      payload: {
        text: t,
      },
    })
  }

  _checkForUpdate = () => {
    checkForUpdate()
  }

  render() {
    const { text } = this.props.app
    return (
      <View>
        <Text>{'Wallet Home'}</Text>
        <TextInput
          placeholder={'输入'}
          onChangeText={this._updateText}
          value={text}
        />
        <Button title={'检查更新'} onPress={this._checkForUpdate} />
      </View>
    )
  }
}

export default WalletHome
