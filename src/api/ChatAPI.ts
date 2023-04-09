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

  public read(): Promise<Chats[]> {
    return this.http.get('')
  }

  public delete(id: number) {
    console.log('CHAT ID', { chatId: id })
    return this.http.delete('', { chatId: id })
  }

  public addUser(users: number[], chatId: number) {
    return this.http.put('/users', { users, chatId })
  }

  public deleteUser(users: number[], chatId: number) {
    return this.http.delete('/users', { users, chatId })
  }

  public getChatUsers(chatId: string) {
    console.log(`/${chatId}/users`)
    return this.http.get(`/${chatId}/users`)
  }

  async getToken(id: number): Promise<string | void> {
    try {
      const response = await this.http.post<{ token: string }>(`/token/${id}`)

      return response.token
    } catch (e) {
      console.log('error get token', e)
    }
  }

  update = undefined
}

export default new ChatAPI()
