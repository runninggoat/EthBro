import React from 'react'
import { create } from 'dva-core'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import Loading from '../containers/components/Loading'

let _app

export const getStore = () => _app._store
export const getState = () => getStore().getState()
export const getApp = () => _app

export default options => {
  const app = create(options)
  if (!global.registered) options.models.forEach(model => app.model(model))
  global.registered = true
  app.start()
  const store = app._store
  const persistor = persistStore(store)
  app.start = container => () => (
    <Provider store={store}>
      <PersistGate loading={<Loading/>} persistor={persistor}>
        {container}
      </PersistGate>
    </Provider>
  )
  _app = app
  return app
}
