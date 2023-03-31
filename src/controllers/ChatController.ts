import API, { ChatAPI, ChatData } from "../api/ChatAPI";
import store from "../utils/Store";
import router from "../utils/Router";

export class ChatController {
    private readonly api: ChatAPI
  
    constructor() {
      this.api = API
    }
  
    async createChat(data: ChatData) {
      console.log('Create Chat')
      try {
        await this.api.create({title: data})
  
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
        
      } catch (error) {
        
      }
    }
  
    
  }
  
  export default new ChatController()