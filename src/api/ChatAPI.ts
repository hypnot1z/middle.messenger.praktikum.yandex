import BaseAPI from './BaseAPI'

export interface Chats {
  id: number
  title: string
  avatar: any
  created_by: number
  last_message: any
  unread_count: number
}

export interface TitleChat {
  title: string
}

export class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats')
  }

  public create(data: TitleChat): Promise<unknown> {
    return this.http.post('', data)
  }

  public read(): Promise<Chats> {
    return this.http.get('')
  }

  public delete(id: number) {
    console.log('CHAT ID', { chatId : id})
    return this.http.delete('', { chatId : id})
  }
  update = undefined
}

export default new ChatAPI()
