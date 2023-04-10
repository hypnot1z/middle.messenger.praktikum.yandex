import { expect } from 'chai'
import Router from './Router'
import Sinon = require('sinon')
import type Block from './Block/block'

describe('Router', () => {
  global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent)
    }
  }
  global.window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent)
    }
  }

  const getContentFake = Sinon.fake.returns(document.createElement('div'))

  const BlockMock = class {
    getContent = getContentFake
  } as unknown as typeof Block

  it('return router instance', () => {
    const result = Router.use('/',new BlockMock({}))
    expect(result).to.eq(Router)
  })
  
  describe('Back', () => {
    
    it('should render a page on history back action', () => {
      Router.use('/',new BlockMock({})).start()

      Router.back()

      expect(getContentFake.callCount).to.eq(1)
    })
  })
  it('should render a page on start', () => {
    Router.use('/',new BlockMock({})).start()

    expect(getContentFake.callCount).to.eq(1)
  })
  
})
