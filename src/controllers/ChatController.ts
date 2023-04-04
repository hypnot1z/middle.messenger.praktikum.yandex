import API, { ChatAPI, Chats, TitleChat } from '../api/ChatAPI'
import store from '../utils/Store'
import router from '../utils/Router'

export class ChatController {
  private readonly api: ChatAPI

  constructor() {
    this.api = API
  }

  async createChat(data: string) {
    console.log('Create Chat')
    try {
      await this.api.create({ title: data })
      await this.getChats()
    } catch (e: any) {
      console.error(e)
    }
  }

  async deleteChat(id: number) {
    console.log('Delete Chat')
    try {
      await this.api.delete(id)
      await this.getChats()
    } catch (e: any) {
      console.error(e)
    }
  }

  async getChats() {
    console.log('getChats')
    try {
      const chats = await this.api.read()
      console.log('get Chats', chats)

      store.set('chats', chats)
    } catch (e: any) {
      console.error(e.message)
    }
  }

  async sendMsg(msg: string) {
    console.log('Sending message...')
    try {
    } catch (error) {}
  }
}

export default new ChatController()
