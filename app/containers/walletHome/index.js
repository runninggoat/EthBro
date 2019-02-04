import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
} from 'react-native'
import { connect } from 'react-redux'

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

  render() {
    const { text } = this.props.app
    return (
      <View>
        <Text>
          {'Wallet Home'}
        </Text>
        <TextInput
          placeholder={'输入'}
          onChangeText={this._updateText}
          value={text}
        />
      </View>
    )
  }
}

export default WalletHome
