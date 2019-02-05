import codePush from 'react-native-code-push'

export const checkForUpdate = () => {
  console.log('checkForUpdate...')
  codePush.getUpdateMetadata(codePush.UpdateState.RUNNING).then(info => {
    console.log(info)
  }).catch(err => {
    console.error(e)
  })
}
