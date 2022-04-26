import { shallow, createLocalVue, shallowMount } from 'vue-test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import ant from 'ant-design-vue'
import PublicOpinion from '@/views/PublicOpinion/PublicOpinion.vue'
import * as myModule from '@/store/modules/publicOpinion'
import routes from '@/router/router.js'
const localVue = createLocalVue()
import { storage } from '@/assets/js/util'
import Vue from 'vue'
import jest from 'jest-mock'
var sinon = require('sinon')
const actionsInjector = require('inject-loader!../../../../src/store/modules/publicOpinion')
localVue.use(ant)
localVue.use(Vuex)
const parm = { companyCode: '', creditSubjectCode: '101730993' }

const action = actionsInjector.actions.fetchPublicOpinion({
  '@/model/actions/publicOpinion.js': {
    queryPublicOpinion(cb) {
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
      newsData: {
        data: [111111]
      },
      newsDetail: {
        data: [22222]
      }
    }
    actions = {
      fetchPublicOpinion: jest.fn(),
      fetchNewsDetail: jest.fn()
    }
    mutation = {
      updateNewsData: jest.fn(),
      updateNewsDetail: jest.fn()
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
    const wrapper = shallow(PublicOpinion, {
      localVue,
      router,
      store
    })
    expect(wrapper.vm.newsData.data[0]).toBe(state.newsData.data[0])
  })
  it('分页 关联图谱 ', () => {
    const $route = {
      query: {
        id: 'B17SD0058'
      }
    }
    const Cor = Vue.extend({ ...PublicOpinion, store, router })
    const vm = new Cor().$mount()

    vm.onPageChange(2)

    vm.handleBack()

    vm.seeDetail({ aamsNewsCode: '101730993' })
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
      pageNo: 1, pageSize: 5, socialCreditCode: '101730993'
    }
    const data = 11111
    // action.queryProducts({ commit,  state})
    actionsInjector.actions.fetchPublicOpinion({ commit, state })
    commit('updateNewsData', data)
    // expect(commit.args).to.deep.equal([
    //   ['updateProductList'],
    //   ['enableConfig', { data }]
    // ])
  })
})
