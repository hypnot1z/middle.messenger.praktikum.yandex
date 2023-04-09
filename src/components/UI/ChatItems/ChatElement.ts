import Block from '../../../utils/Block/block'
import tpl from './element.hbs'
import { Chats } from '../../../api/ChatAPI'
import store from '../../../utils/Store'
import './ChatItemsModule.scss'
import ChatController from '../../../controllers/ChatController'

export const avatarUrl = `https://ya-praktikum.tech/api/v2/resources/`

interface ElementProps {
  chats?: Chats[]
  tagName?: string
  src?: string
  selectedChat?: Chats
  events?: any
}

export class ChatTitle extends Block<ElementProps> {
  constructor(props: ElementProps) {
    super({
      ...props,
      tagName: 'ul',
      events: {
        click: (event: Event) => this.selectChat(event),
      },
    })
  }

  private selectChat(event: Event) {
    const chatId = (
      (event.target as HTMLElement)!.closest('li') as HTMLLIElement
    ).id
    ChatController.getChatUsers(chatId)
    const chats = this.props.chats
    function selChat(arr: Chats[], id: number) {
      return arr.filter((obj) => obj.id === id)
    }
    const activeChat = selChat(chats as Chats[], Number(chatId))

    store.set('selectedChat', activeChat[0])
    store.set('selectedChatName', activeChat[0].title)
  }

  protected render(): DocumentFragment {
    return this.compile(tpl, this.props)
  }
}
