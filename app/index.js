import React from 'react'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { Sentry } from 'react-native-sentry'
import dva from './utils/dva'
import Router from './router'
import appModel from './models/app'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'

Sentry.config('https://c2302b014d3e4f46baca65e5f7235412@sentry.io/1387355').install()

const persistConfig = {
  version: 1.0,
  debug: __DEV__,
  key: 'root',
  storage,
  blacklist: ['router'],
  stateReconciler: autoMergeLevel2,
}

const persistEnhancer = () => createStore => (reducer, initialState, enhancer) => createStore(persistReducer(persistConfig, reducer), initialState, enhancer)

const app = dva({
  initialState: {},
  models: [
    appModel,
  ],
  extraEnhancers: [persistEnhancer()],
})

const App = app.start(<Router/>)

export default App
