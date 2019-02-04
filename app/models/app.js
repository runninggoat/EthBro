
const defaultAppState = {
  text: 'hello, world!'
}

export default {
  namespace: 'app',
  state: defaultAppState,
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
