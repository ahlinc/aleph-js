import axios from 'axios'
import {ipfs_push} from './create'
import {DEFAULT_SERVER} from './base'

export async function fetch_profile(address, {api_server = DEFAULT_SERVER} = {}) {
  let response = await axios.get(`${api_server}/api/v0/aggregates/${address}.json?keys=profile`)
  if ((response.data.data !== undefined) && (response.data.data.profile !== undefined))
  {
    return response.data.data.profile
  } else
    return null
}

export async function submit_aggregate(address, key, content, {api_server = DEFAULT_SERVER} = {}) {
  let post_content = {
    'address': address,
    'key': key,
    'content': content,
    'time': Date.now() / 1000
  }

  let hash = await ipfs_push(post_content, {api_server: api_server})
  let message = {
    'item_hash': hash,
    'chain': 'NULS',
    'channel': 'blogs',
    'sender': address,
    'type': 'AGGREGATE',
    'time': Date.now() / 1000
  }
  return message
}
