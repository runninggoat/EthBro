import React, {Component} from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import Images from '../../images'

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'center', padding: 10 },
  back: { width: 24, height: 24 },
  title: { textAlign: 'center', fontSize: 18, fontWeight: '500' },
  subTitle: { textAlign: 'right', fontSize: 14, fontWeight: '400', color: '#999' }
})

class CustomHeader extends Component {
  _goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  render() {
    const { title, subTitle, subAction } = this.props
    if (!title) return null
    return (
      <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: '#999' }]}>
        <TouchableOpacity onPress={this._goBack} style={{ flex: 1 }}>
          <Image source={Images.back} style={styles.back}/>
        </TouchableOpacity>
        <Text style={[styles.title, { flex: 10 }]}>
          {title}
        </Text>
        <View style={{ flex: 1 }}>
          {(subTitle && subAction) ? (
            <TouchableOpacity onPress={() => subAction()}>
              <Text style={styles.subTitle}>
                {subTitle}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    )
  }
}

export default CustomHeader
