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
        await this.api.create(data)
  
      } catch (e: any) {
        console.error(e)
      }
    }
  
    async getChats() {
      console.log('getChats')
      try {
        const chats = await this.api.read()
        console.log(chats)
  
        store.set('chats', chats)
      } catch (e: any) {
        console.error(e.message)
      }
    }
  
    
  }
  
  export default new ChatController()
