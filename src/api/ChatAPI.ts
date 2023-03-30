import BaseAPI from './BaseAPI'

export interface CreateChatData {
    title: string
}

export interface Chats {
    id: number
    title: string
    avatar: any
    created_by: number
    last_message: any
    unread_count: number
}

export class ChatAPI extends BaseAPI {
    constructor() {
        super('/chats')
    }

    public create(data: CreateChatData): Promise<unknown> {
        return this.http.post('', data)
    }

    public read(): Promise<Chats> {
        return this.http.get('')
    }

    update = undefined
    delete = undefined
}

export default new ChatAPI()