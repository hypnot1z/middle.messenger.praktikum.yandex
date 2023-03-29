import BaseAPI from './BaseAPI'

export interface ChatData {
    title: string
}

export class ChatAPI extends BaseAPI {
    constructor() {
        super('/chats')
    }

    public create(data: ChatData): Promise<unknown> {
        return this.http.post('', data)
    }

    public read(): Promise<unknown> {
        return this.http.get('')
    }

    update = undefined
    delete = undefined
}

export default new ChatAPI()