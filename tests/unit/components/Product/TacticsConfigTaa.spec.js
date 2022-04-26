import { shallow, createLocalVue, shallowMount } from 'vue-test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import ant from 'ant-design-vue'
import TacticsConfig from '@/views/TacticsConfig/TacticsConfig.vue'
import * as myModule from '@/store/modules/tacticsConfig'
import routes from '@/router/router.js'
const localVue = createLocalVue()
import { storage } from '@/assets/js/util'
import Vue from 'vue'
import jest from 'jest-mock'
var sinon = require('sinon')
const actionsInjector = require('inject-loader!../../../../src/store/modules/tacticsConfig')
localVue.use(ant)
localVue.use(Vuex)
const parm = { pageNo: 2, pageSize: 10 }
Vue.use(ant)
const action = actionsInjector.actions.fetchTaaTrial({
  '@/model/actions/TacticsConfig.js': {
    queryTaaTrial(cb) {
      setTimeout(() => {
        const data = {
          code: 200,
          msg: 'success',
          data: 'test'
        }
        return cb([data])
      }, 100)
    }
  }
}, parm)
describe('TacticsConfig.vue', () => {
  let actions
  let state
  let store
  let mutation

  beforeEach(() => {
    state = {
      statisticsDate: '',
      macroState: [],
      macroStrategy: [],
      taaTrialRequest: {},
      taaTrialOriginResult: {},
      taaTrialResult: {},
      taaAssetsBack: {},
      detailThird: {}

    }
    actions = {
      fetchTaaTrial: jest.fn(),
      fetchMacroStra: jest.fn(),
      fetchTaaAssetsBack: jest.fn(),
      fetachDetailThird: jest.fn(),
      fetchTaaCommit: jest.fn()
    }
    mutation = {
      updateStatisticsDate: jest.fn(),
      updateMacroState: jest.fn(),
      updateMacroStrategy: jest.fn(),
      updateTaaTrialRequest: jest.fn(),
      resetTaaTrialRequest: jest.fn(),
      updateTaaTrialOriginResult: jest.fn(),
      updateTaaTrialResult: jest.fn(),
      updateTaaAssetsBack: jest.fn(),
      addTaaTrialOriginResult: jest.fn(),
      resetTaaTrialResult: jest.fn(),
      resetTaaAssetsBack: jest.fn(),
      updateDetailThird: jest.fn()

    }
    store = new Vuex.Store({
      modules: {
        myModule: {
          state,
          actions,
          mutation,
          getters: myModule.getters
        }
      }
    })
  })
  const router = new VueRouter(routes)
  it('检查数据是否正确', () => {
    const Cor = Vue.extend({ ...TacticsConfig, store, router })
    const vm = new Cor().$mount()
    const commit = sinon.spy()
    myModule.actions.fetchMacroStra(commit, { productCode: 'A17SD0001', saaCode: '89528811-e157-4aaf-8880-36a95a2d8715' })
    myModule.getters.statisticsDate(state)
    expect(vm.statisticsDate).toBe(state.statisticsDate)
  })
  it('点击事件是否触发', () => {
    storage.set('target', JSON.stringify({ cash: {}, equity: {}, fixed: {}, alternative: {}, saaTable: {}}))
    const wrapper = shallow(TacticsConfig, {
      localVue,
      router,
      store
    })
    const commit = sinon.spy()
    const upBtn = wrapper.findAll('.btn-config').at(1)
    upBtn.trigger('click')
    const cacle = wrapper.findAll('.btn-config').at(2)
    cacle.trigger('click')
    const btn = wrapper.findAll('.btn-config').at(0)
    btn.trigger('click')
    const taaBtn = wrapper.findAll('.taa-btn').at(0)
    taaBtn.trigger('click')
  })
})
describe('actions', () => {
  it('queryProducts', () => {
    const commit = sinon.spy()
    const state = {}

    const data = 11111
    // action.queryProducts({ commit,  state})
    actionsInjector.actions.fetchTaaTrial({ commit, state })
    commit('updateTaaTrialOriginResult', data)
    commit('updateTaaTrialResult', data)
  })
})
