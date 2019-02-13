import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Clipboard } from 'react-native'
import { ethers } from 'ethers'
import moment from 'moment'
import CustomHeader from '../components/CustomHeader.js'
import { COLORGREEN, COLORORANGE } from '../../themes'
import Images from '../../images'
import CustomToast from '../components/CustomToast'

class TxDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader navigation={navigation} title={'交易详情'}/>,
    }
  }

  _copyValue = value => {
    Clipboard.setString(value)
    this.refs.toast.showToast('复制成功')
  }

  _renderCopyableValue = (title, value) => (
    <View style={[styles.bottomLine, { flexDirection: 'row', padding: 20, }]}>
      <Text style={{ flex: 1, textAlign: 'left', fontSize: 16 }}>
        {title}
      </Text>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Text style={{ flex: 1, textAlign: 'right', fontSize: 16, marginRight: 10 }} numberOfLines={1} ellipsizeMode='middle'>
          {value}
        </Text>
        <TouchableOpacity onPress={() => this._copyValue(value)}>
          <Image source={Images.copy} style={{ width: 20, height: 20 }}/>
        </TouchableOpacity>
      </View>
    </View>
  )

  _renderReadOnlyValue = (title, value) => (
    <View style={[styles.bottomLine, { flexDirection: 'row', padding: 20, }]}>
      <Text style={{ flex: 1, textAlign: 'left', fontSize: 16 }}>
        {title}
      </Text>
      <Text style={{ flex: 1, textAlign: 'right', fontSize: 16 }} numberOfLines={1} ellipsizeMode='middle'>
        {value}
      </Text>
    </View>
  )

  render() {
    const { navigation } = this.props
    console.log('navigation param', navigation.state.params)
    const { value, isReceive, hash, from, to, blockNumber, timeStamp } = navigation.state.params
    return (
      <View>
        <CustomToast ref='toast'/>
        <View style={styles.bottomLine}>
          <Text style={{ fontSize: 20, fontWeight: '500', textAlign: 'center', marginTop: 30, }}>
            {'交易额'}
          </Text>
          <Text style={{ fontSize: 24, fontWeight: '500', textAlign: 'center', marginTop: 5, marginBottom: 30, color: isReceive ? COLORGREEN : COLORORANGE }}>
            {parseFloat(ethers.utils.formatEther(value))}
          </Text>
        </View>
        {this._renderCopyableValue('交易哈希', hash)}
        {this._renderCopyableValue('发送地址', from)}
        {this._renderCopyableValue('接收地址', to)}
        {this._renderReadOnlyValue('区块高度', blockNumber)}
        {this._renderReadOnlyValue('发送时间', moment(parseInt(`${timeStamp}000`)).format('YYYY-MM-DD HH:mm:ss'))}
      </View>
    )
  }
}

export default TxDetail

const styles = StyleSheet.create({
  bottomLine: { borderBottomColor: '#999', borderBottomWidth: 1 },
})
