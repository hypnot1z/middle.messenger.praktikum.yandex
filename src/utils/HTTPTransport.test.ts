import Sinon = require('sinon')
import { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon'
import { expect } from 'chai'
import HTTPTransport from './HTTPTransport'

describe('HTTPTransport', () => {
  const requests: SinonFakeXMLHttpRequest[] = []
  const client = new HTTPTransport('/auth')
  let xhr: SinonFakeXMLHttpRequestStatic

  beforeEach(() => {
    xhr = Sinon.useFakeXMLHttpRequest()
    // @ts-ignore
    global.XMLHttpRequest = xhr
    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request)
    }
  })

  it('make GET request', () => {
    client.get('/user')
    const [request] = requests
    expect(request.method).to.eq('Get')
  })

  it('make POST request', () => {
    client.post('/chats')
    const [request] = requests
    expect(request.method).to.eq('Post')
  })

  it('make PUT request', () => {
    client.put('/chats', {})
    const [request] = requests
    expect(request.method).to.eq('Put')
  })

  it('make DELETE request', () => {
    client.delete('/chat/id')
    const [request] = requests
    expect(request.method).to.eq('Delete')
  })

  afterEach(() => {
    requests.length = 0
    xhr.restore()
  })
})
