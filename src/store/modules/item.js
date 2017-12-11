import {cloneDeep} from 'lodash-es'

import types from '../mutation-types'
import initialState from '../initialState/itemList'
import qiitaApi from '../../api/qiitaApi'

const namespaced = true

const state = cloneDeep(initialState)

const getters = {
  state: state => state,
  queryParams: state => state.queryParams
}

const actions = {
  setQueryParams ({commit, state}, queryParams) {
    commit(types.SET_ITEM_LIST_SORT_DATA, {queryParams})
  },

  execGetItems ({commit, state}, queryParams) {
    commit(types.SEND_ITEM_LIST_REQUEST)

    return qiitaApi.getItems(queryParams)
  },

  setItems ({commit, state}, payload) {
    commit(types.RECEIVE_ITEM_LIST_RESPONSE, payload)
  }
}

const mutations = {
  [types.SET_ITEM_LIST_SORT_DATA] (state, {queryParams}) {
    Object.assign(state.queryParams, queryParams)
  },

  [types.SEND_ITEM_LIST_REQUEST] (state) {
    state.isLoading = true
  },

  [types.RECEIVE_ITEM_LIST_RESPONSE] (state, payload) {
    state.isLoading = false
    Object.assign(state, {items: payload})
  }
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
