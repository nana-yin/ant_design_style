import { shallow, createLocalVue, shallowMount } from 'vue-test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import ant from 'ant-design-vue'
import RelationalGraph from '@/views/RelationalGraph/RelationalGraph.vue'
import * as myModule from '@/store/modules/relationalGraph'
import routes from '@/router/router.js'
const localVue = createLocalVue()
import { storage } from '@/assets/js/util'
import Vue from 'vue'
import jest from 'jest-mock'
var sinon = require('sinon')
const actionsInjector = require('inject-loader!../../../../src/store/modules/relationalGraph')
localVue.use(ant)
localVue.use(Vuex)
const parm = { companyCode: '', creditSubjectCode: '101730993' }

const action = actionsInjector.actions.fetchRelationalGraph({
  '@/model/actions/relationalGraph.js': {
    queryRelationalGraph(cb) {
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
describe('ProductList.vue', () => {
  let actions
  let state
  let store
  let mutation

  beforeEach(() => {
    state = {
      relationalGraph: 1111,
      managerGraph: 22222,
      companyGraph: 3333
    }
    actions = {
      fetchRelationalGraph: jest.fn(),
      fetchManagerGraph: jest.fn(),
      fetchCompanyGraph: jest.fn()
    }
    mutation = {
      handleRelationalGraph: jest.fn(),
      handleManagerGraph: jest.fn(),
      handleCompanyGraph: jest.fn()
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
  it('calls store action moduleActionClick when button is clicked', () => {
    // const wrapper = shallow(RelationalGraph, { store, localVue })
    // let Cor = Vue.extend({ ...PositionList, store, router });
    // let wrapper = new Cor().$mount();
    const wrapper = shallow(RelationalGraph, {
      localVue,
      router,
      store
    })
    expect(wrapper.vm.getRelationalGraph).toBe(state.relationalGraph)
    expect(wrapper.vm.getManagerGraph).toBe(state.managerGraph)
    expect(wrapper.vm.getCompanyGraph).toBe(state.companyGraph)
  })
})
describe('actions', () => {
  it('queryPositionList', () => {
    // testAction(actions.queryProducts, [], {}, [
    //   { type: 'updateProductList' },
    //   { type: 'enableConfig', payload: { /* mocked response */ } }
    // ], done)

    const commit = sinon.spy()
    const state = {
      pageNo: 2, pageSize: 10, parentLoanCode: 'AMP1712000634'
    }
    const data = 11111
    // action.queryProducts({ commit,  state})
    actionsInjector.actions.fetchRelationalGraph({ commit, state })
    commit('handleRelationalGraph', data)
    // expect(commit.args).to.deep.equal([
    //   ['updateProductList'],
    //   ['enableConfig', { data }]
    // ])
  })
})
