import { shallow, createLocalVue, shallowMount } from 'vue-test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import ant from 'ant-design-vue'
import NewsDetail from '@/views/PublicOpinion/NewsDetail.vue'
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
const parm = { aamsNewsCode: '1937713100000' }

const action = actionsInjector.actions.fetchNewsDetail({
  '@/model/actions/publicOpinion.js': {
    queryNewsDetail(cb) {
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
describe('NewsDetail.vue', () => {
  let actions
  let state
  let store
  let mutation

  beforeEach(() => {
    state = {
      newsData: 111111,
      newsDetail: 22222
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
    // const wrapper = shallow(NewsDetail, { store, localVue })

    const wrapper = shallow(NewsDetail, {
      localVue,
      router,
      store
    })
    // console.log(wrapper.vm.newsDetail);
    // console.log(state.newsDetail);
    expect(wrapper.vm.newsDetail).toBe(state.newsDetail)
  })
})
describe('actions', () => {
  it('NewsDetail', () => {
    // testAction(actions.queryProducts, [], {}, [
    //   { type: 'updateProductList' },
    //   { type: 'enableConfig', payload: { /* mocked response */ } }
    // ], done)

    const commit = sinon.spy()
    const state = {
      aamsNewsCode: '1937713100000'
    }
    const data = 11111
    // action.queryProducts({ commit,  state})
    actionsInjector.actions.fetchNewsDetail({ commit, state })
    commit('updateNewsData', data)
    // expect(commit.args).to.deep.equal([
    //   ['updateProductList'],
    //   ['enableConfig', { data }]
    // ])
  })
})
