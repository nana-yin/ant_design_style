import { shallow, createLocalVue, mount } from 'vue-test-utils'
import VueRouter from 'vue-router'
import ant from 'ant-design-vue'
import Assessment from '@/views/Assessment/Assessment.vue'
import * as myModule from '@/store/modules/assessment'
import routes from '@/router/router.js'
const localVue = createLocalVue()
import { storage } from '@/assets/js/util'
import Vue from 'vue'
import Vuex from 'vuex'
var sinon = require('sinon')
const actionsInjector = require('inject-loader!../../../../src/store/modules/assessment')
localVue.use(ant)
localVue.use(routes)
localVue.use(Vuex)
const parm = { productCode: 'A17SD0001',
  rangeType: 'ALL' }
const action = actionsInjector.actions.queryAssessment({
  '@/model/actions/assessment.js': {
    queryAssessment(cb) {
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
      historyResult: [{ prodCleanPrice: 0, statisticsDate: '2018/12/20', taaCleanPrice: 0 }],
      trialResult: {
        calmar: 6.2803,
        infoRatio: 2.2148,
        maxWd: 0.0233,
        rtnYearly: 0.1462,
        sharpe: 2.2919,
        var95: 0.0139,
        volYearly: 0.0529,
        winOdds120: null,
        winOdds240: null,
        winRates120: null,
        winRates240: null
      }
    }
    actions = {
      queryAssessment: jest.fn()
    }
    mutation = {
      historyResult: jest.fn(),
      trialResult: jest.fn()
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
    // let Cor = Vue.extend({ ...Assessment, store, router });
    // let vm = new Cor().$mount();
    const vm = shallow(Assessment, {
      localVue,
      router,
      store
    }).vm
    const commit = sinon.spy()
    myModule.actions.queryAssessment(commit, { productCode: 'A17SD0001', rangeType: 'ALL' })
    myModule.getters.assessmentHistoryRes(state)
    expect(vm.assessmentHistoryRes.statisticsDate).toBe(state.historyResult.statisticsDate)
    myModule.getters.assessmentTrialRes(state)
    expect(vm.assessmentTrialRes.volYearly).toBe(state.trialResult.volYearly)
  })
  it('触发点击事件', () => {
    // let Cor = Vue.extend(Assessment,{  store, router });
    // let wrapper = new Cor().$shallow();

    const wrapper = shallow(Assessment, {
      localVue,
      router,
      store
    })
    const button = wrapper.find('.ant-radio-button-wrapper')
    button.trigger('click')
    // wrapper.rangeChange( )
    expect(wrapper.vm.rangeType).toBe('ALL')
    // console.log(button.html());
    expect(actions.queryAssessment).toHaveBeenCalled()
  })
})
describe('actions', () => {
  it('queryAssessment', () => {
    const commit = sinon.spy()
    const data = 11111
    const state = {
      productCode: 'A17SD0001',
      rangeType: 'ALL'
    }
    actionsInjector.actions.queryAssessment({ commit, state })
    // action.queryProducts({ commit, state })
    commit('updateAssessment', data)
  })
})
