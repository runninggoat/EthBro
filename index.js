/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from 'react-native'
import App from './app/index'
import codePush from 'react-native-code-push'

// console.log('codePush', codePush)

let { InstallMode } = codePush

const codePushOption = {
  deploymentKey: 'N55Ylq5JQWDH0rl3HMNm3QC4EqPW066ed9de-81c3-4c7e-ac8c-f292507db5a6',
  installMode: InstallMode.IMMEDIATE,
  updateDialog: {
    title: 'An update is available!',
    appendReleaseDescription: true,
    descriptionPrefix: '\n\nChange log:\n',
  },
}

AppRegistry.registerComponent('EthBro', () => codePush(codePushOption)(App))

// AppRegistry.registerComponent('EthBro', () => App)
