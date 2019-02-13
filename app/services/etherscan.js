export const MAINNET = 'mainnet'
export const ROPSTEN = 'ropsten'
export const NetworkName = {
  mainnet: '主网',
  ropsten: 'Ropsten',
}
const host = {
  mainnet: 'https://api.etherscan.io/api',
  ropsten: 'https://api-ropsten.etherscan.io/api',
}
const apiKey = 'JDUTPFJX2NVNBREFN1AHJHIRAD5IDEA97S'

createGetUrl = (url, params) => {
  let p = []
  Object.keys(params).forEach(key => p.push(`${key}=${params[key]}`))
  return `${url}?${p.join('&')}`
}

export const ethBlockNumber = async params => {
  let url = createGetUrl(host[params[0]], {
    module: 'proxy',
    action: 'eth_blockNumber',
    apikey: apiKey,
  })
  let resp = null
  try {
    resp = await fetch(url)
    resp = await resp.json()
  } catch (e) {
    throw e
  }
  return resp
}

/**
 * 
 * @param {Array} params network
 */
export const ethBlance = async params => {
  // console.log('send ethBlance request...', params[0], params[1])
  let url = createGetUrl(host[params[0]], {
    module: 'account',
    action: 'balance',
    address: params[1],
    tag: 'latest',
    apikey: apiKey,
  })
  console.log('request url', url)
  let resp = null
  try {
    resp = await fetch(url)
    resp = await resp.json()
  } catch (e) {
    throw e
  }
  return resp
}

/**
 * 
 * @param {Array} params network, address
 */
export const ethLastPrice = async params => {
  let url = createGetUrl(host[params[0]], {
    module: 'stats',
    action: 'ethprice',
    apikey: apiKey,
  })
  console.log('request url', url)
  let resp = null
  try {
    resp = await fetch(url)
    resp = await resp.json()
  } catch (e) {
    throw e
  }
  return resp
}

/**
 * 
 * @param {Array} params network, address
 */
export const txListForAddress = async params => {
  let url = createGetUrl(host[params[0]], {
    module: 'account',
    action: 'txlist',
    address: params[1],
    startblock: '0',
    endblock: '99999999',
    sort: 'desc',
    apikey: apiKey,
  })
  console.log('request url', url)
  let resp = null
  try {
    resp = await fetch(url)
    resp = await resp.json()
  } catch (e) {
    throw e
  }
  return resp
}
