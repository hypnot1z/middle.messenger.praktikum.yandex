import Block from '../../../utils/Block/block'
import tpl from './element.hbs'
import { Chats } from '../../../api/ChatAPI'
import store from '../../../utils/Store'
import './ChatItemsModule.scss'

interface ElementProps {
  chats: Chats[]
  tagName?: string
  selectedChat?: number
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
    const chatId = (event.target! as HTMLLIElement).id
    const chats = Array.from(this.props.chats)
    function selChat(arr: Chats[], id: number) {
      return arr.filter((obj) => obj.id === id)
    }
    const activeChat = selChat(chats, Number(chatId))
    store.set('selectedChat', activeChat[0])
    store.set('selectedChatName', activeChat[0].title)
  }

  // public activeItem(id: string): void {
  //   const chatItem: HTMLElement | null =
  //     document.getElementById(id)
  //   chatItem!.classList.add('active')
  // }

  protected render(): DocumentFragment {
    return this.compile(tpl, this.props)
  }
}
