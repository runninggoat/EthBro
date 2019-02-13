import { ethers } from 'ethers'
import {
  // MAINNET,
  ROPSTEN,
  ethBlockNumber,
  ethBlance,
  ethLastPrice,
  txListForAddress,
} from '../services/etherscan'
import ImportWallet from '../containers/importWallet';

const defaultAppState = {
  network: ROPSTEN,
  wallets: {},
  activeWallet: '',
  balances: {},
  txLists: {},
  ethUSDPrice: 1,
  ethUSDLastTime: 0,
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
  effects: {
    *getEthBlockNumber(action, { select, call }) {
      const { network } = yield select(state => state.app)
      console.log('network', network)
      // console.log('ethBlockNumber', ethBlockNumber)
      const resp = yield call(ethBlockNumber, [network])
      console.log('resp', resp)
      return resp
    },
    *importWallet({ payload }, { select, put }) {
      let { privateKey } = payload
      if (!privateKey.startsWith('0x')) privateKey = `0x${privateKey}`
      let wallet
      try {
        wallet = new ethers.Wallet(privateKey)
        wallet = wallet.signingKey
      } catch (e) {
        console.log(e)
        return false
      }
      let { wallets, balances } = yield select(state => state.app)
      console.log('before import wallet', wallets)
      if (wallets[wallet.address]) return false // 已经存在钱包地址
      const addresses = Object.keys(wallets)
      wallet.name = `钱包 ${addresses.length + 1}`
      wallets[wallet.address] = wallet
      balances[wallet.address] = 0
      console.log('after import wallet', wallets)
      yield put({ type: 'updateState', payload: { wallets, balances, activeWallet: wallet.address } })
      return true
    },
    *updateWalletName({ payload }, { select, put }) {
      const { name, address } = payload
      let { wallets } = yield select(state => state.app)
      wallets[address].name = name
      yield put({ type: 'updateState', payload: { wallets } })
    },
    *selectWallet({ payload }, { put }) {
      const { address } = payload
      yield put({ type: 'updateState', payload: { activeWallet: address } })
    },
    *updateBalance(action, { select, put, call }) {
      const { network, activeWallet } = yield select(state => state.app)
      console.log('updateBalance ', activeWallet)
      const resp = yield call(ethBlance, [network, activeWallet])
      let { balances } = yield select(state => state.app)
      if (resp.message === 'OK') {
        balances[activeWallet] = ethers.utils.formatEther(resp.result)
        console.log('updateBalance result', activeWallet, resp.result)
      } else {
        console.log('updateBalance response', resp)
      }
    },
    *deleteWallet({ payload }, { select, put }) {
      const { address } = payload
      let { wallets, balances, activeWallet } = yield select(state => state.app)
      if (address === activeWallet) return
      delete wallets[address]
      delete balances[address]
      const addresses = Object.keys(wallets)
      yield put({ type: 'updateState', payload: { wallets, balances, activeWallet: addresses[0] } })
    },
    *updateUSDPrice(action, { select, put, call }) {
      const { network } = yield select(state => state.app)
      const resp = yield call(ethLastPrice, [network])
      // console.log('resp', resp)
      if (resp.message === 'OK') {
        let { ethusd = 1, ethusd_timestamp = new Date().getTime() } = resp.result
        yield put({ type: 'updateState', payload: { ethUSDPrice: ethusd, ethUSDLastTime: ethusd_timestamp } })
      } else {
        console.log('updatePrice response', resp)
      }
    },
    *getTxList({ payload }, { select, put, call }) {
      const { forced = false } = payload
      const { network, activeWallet, txLists } = yield select(state => state.app)
      if (!forced && txLists[activeWallet] && txLists[activeWallet].length > 0) return
      console.log('get tx list ', activeWallet)
      const resp = yield call(txListForAddress, [network, activeWallet])
      // console.log('resp', resp)
      if (resp.message === 'OK') {
        txLists[activeWallet] = resp.result
        // console.log('get tx list result', resp.result)
      } else {
        console.log('get tx list response', resp)
      }
      yield put({ type: 'updateState', payload: { txLists } })
    },
  },
}
