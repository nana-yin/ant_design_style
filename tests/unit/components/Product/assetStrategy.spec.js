import { shallow, createLocalVue, mount } from 'vue-test-utils'
import VueRouter from 'vue-router'
import ant from 'ant-design-vue'
import AssetStrategy from '@/views/AssetStrategy/AssetStrategy.vue'
import * as myModule from '@/store/modules/assetStrategy'
import routes from '@/router/router.js'
const localVue = createLocalVue()
import Vue from 'vue'
import Vuex from 'vuex'
var sinon = require('sinon')
const actionsInjector = require('inject-loader!../../../../src/store/modules/assetStrategy')
localVue.use(ant)
localVue.use(routes)
localVue.use(Vuex)
Vue.use(ant)
const parm = {}
const action = actionsInjector.actions.fetchAssetStrategy({
  '@/model/actions/assetStrategy.js': {
    queryAssetStrategy(cb) {
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
describe('viewtargetconfig.vue', () => {
  let actions
  let state
  let store
  let mutation

  beforeEach(() => {
    state = {
      assetStrategy: [
        { type: 'capitalExpect', absVal: '-0.0041', relativeVal: '0.0137', riseProbChange: '-0.0171' },
        { type: 'liquidity', absVal: '0.2815', relativeVal: '-1.3157', riseProbChange: '0.0' },
        { type: 'bondTerm', absVal: '0.731', relativeVal: '-0.362', riseProbChange: '0.0089' },
        { type: 'longBebt', absVal: '0.5951', relativeVal: '0.1957', riseProbChange: '0.039' },
        { type: 'localGovernment', absVal: '', relativeVal: '-0.0798', riseProbChange: '-0.1215' },
        { type: 'bankReceipt', absVal: '0.0104', relativeVal: '-2.0396', riseProbChange: '0.1061' },
        { type: 'creditgradeDiff', absVal: '0.79', relativeVal: '-0.3086', riseProbChange: '0.0' },
        { type: 'liquidityDrive', absVal: '', relativeVal: '-1.1801', riseProbChange: '-0.124' },
        { type: 'cycleDrivie', absVal: '', relativeVal: '-2.1332', riseProbChange: '-0.0898' },
        { type: 'interestRateBond', absVal: '0.6631', relativeVal: '-0.6991', riseProbChange: '0.0511' }
      ]
    }
    actions = {
      fetchAssetStrategy: jest.fn()
    }
    mutation = {
      fillAssetStrategy: jest.fn()
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
    // let Cor = Vue.extend({AssetStrategy, store, router });
    // let vm = new Cor().$mount().vm;
    const Constructor = Vue.extend({ ...AssetStrategy, store, router })
    const vm = new Constructor().$mount()
    // let vm= shallow(AssetStrategy, {
    //   localVue,
    //   router,
    //   store
    // })
    const commit = sinon.spy()
    myModule.actions.fetchAssetStrategy(commit, {})
    myModule.getters.getAssetStrategy(state)
    expect(vm.getAssetStrategy[0].riseProbChange).toBe(state.assetStrategy[0].riseProbChange)
    // vm._watchers[0].cb(state.assetStrategy)
    // Vue.nextTick( () => {
    //     console.log('---------')
    //     console.log(vm.assetDataSource)
    //    // expect(vm.chartData[0].relativeVal).toBe(state.assetStrategy[0].relativeVal.toFixed(4))
    //     console.log('---------')
    //     done()
    // })
  })
  // it('触发点击事件', () => {
  //   // let Cor = Vue.extend(Assessment,{  store, router });
  //   // let wrapper = new Cor().$shallow();

  //   let wrapper= shallow(AssetStrategy, {
  //     localVue,
  //     router,
  //     store
  //   })
  //   const button = wrapper.find('.ant-radio-button-wrapper')
  //   button.trigger('click')
  //   //wrapper.rangeChange( )
  //   expect(wrapper.vm.rangeType).toBe('ALL')
  //   //console.log(button.html());
  //   expect(actions.queryAssessment).toHaveBeenCalled()

  // })
})
describe('actions', () => {
  it('fetchAssetStrategy', () => {
    const commit = sinon.spy()
    const data = {
      result: [1111]
    }
    const state = {

    }
    actionsInjector.actions.fetchAssetStrategy({ commit, state })
    // action.queryProducts({ commit, state })
    commit('fillAssetStrategy', data)
    // actionsInjector.mutations.fillAssetStrategy(state,data.result);
    // console.log(actionsInjector.state.assetStrategy);
    // expect(actionsInjector.state.assetStrategy[0]).toBe(data.result[0])
  })
})
