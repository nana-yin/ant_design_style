import { shallow, createLocalVue, mount } from 'vue-test-utils'
import VueRouter from 'vue-router'
import ant from 'ant-design-vue'
import AssetStyStraChart from '@/views/AssetStrategy/AssetStyStraChart.vue'
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
const parm = { choseType: 'capitalExpect' }
const action = actionsInjector.actions.fetchStyStraChart({
  '@/model/actions/assetStrategy.js': {
    queryAssetStyStraChart(cb) {
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
      assetStyStraChart: 1111
    }
    actions = {
      fetchStyStraChart: jest.fn()
    }
    mutation = {
      fillAssetStyStraChart: jest.fn()
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
    const Constructor = Vue.extend({ ...AssetStyStraChart, store, router })
    const vm = new Constructor().$mount()
    // let vm= shallow(AssetStrategy, {
    //   localVue,
    //   router,
    //   store
    // })
    const commit = sinon.spy()
    myModule.actions.fetchAssetStrategy(commit, {})
    myModule.getters.getAssetStyStraChart(state)
    // console.log(vm.getAssetStyStraChart);
    // console.log(myModule.state.assetStyStraChart);
    // expect(vm.getAssetStrategy).toBe(myModule.state.assetStyStraChart)
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
      choseType: 'capitalExpect'
    }
    actionsInjector.actions.fetchStyStraChart({ commit, state })
    // action.queryProducts({ commit, state })
    commit('fillAssetStyStraChart', data)
    // actionsInjector.mutations.fillAssetStrategy(state,data.result);
    // console.log(actionsInjector.state.assetStrategy);
    // expect(actionsInjector.state.assetStrategy[0]).toBe(data.result[0])
  })
})
