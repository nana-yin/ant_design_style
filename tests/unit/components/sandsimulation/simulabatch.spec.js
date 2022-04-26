import { shallow, createLocalVue, mount } from 'vue-test-utils'
import VueRouter from 'vue-router'
import ant from 'ant-design-vue'
import Simulabatch from '@/views/Simulabatch/Simulabatch.vue'
import * as myModule from '@/store/modules/batch'
import routes from '@/router/router.js'
const localVue = createLocalVue()
import Vue from 'vue'
import Vuex from 'vuex'
var sinon = require('sinon')
const actionsInjector = require('inject-loader!../../../../src/store/modules/batch')
localVue.use(ant)
localVue.use(routes)
localVue.use(Vuex)
const parm = { productCode: 'A17SD0001' }
const action = actionsInjector.actions.fetchTaskList({
  '@/model/actions/batch.js': {
    queryTaskList(cb) {
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
describe('simulabatch.vue', () => {
  let actions
  let state
  let store
  let mutation

  beforeEach(() => {
    state = {
      taskList: [
        { taskName: 'RunTest', taskCode: 'TAS20190731130850002', taskStatus: 'SUCCESS', templateCode: 'PT20190704163852366', templateName: '回测test' }
      ]
    }
    actions = {
      fetchTaskList: jest.fn()
    }
    mutation = {
      updateTaskList: jest.fn()
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
    // let Cor = Vue.extend({ ...RiskManage, store, router });
    // let vm = new Cor().$mount();
    const vm = shallow(Simulabatch, {
      localVue,
      router,
      store
    }).vm
    const commit = sinon.spy()
    myModule.actions.fetchTaskList(commit, { productCode: 'A17SD0001' })
    myModule.getters.taskListData(state)
    expect(vm.taskListData[0].available).toBe(state.taskList[0].available)
  })
})
describe('actions', () => {
  it('fetchTaskList', () => {
    const commit = sinon.spy()
    actionsInjector.actions.fetchTaskList({ commit })
    // action.queryProducts({ commit, state })
    commit('updateTaskList')
  })
})
