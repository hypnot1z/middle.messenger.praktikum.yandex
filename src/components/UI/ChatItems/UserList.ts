import Block from '../../../utils/Block/block'
import tpl from './list.hbs'
import './ChatItemsModule.scss'
import ChatController from '../../../controllers/ChatController'
import { User } from '../../../api/UserAPI'
import { Chats } from '../../../api/ChatAPI'

export const avatarUrl = `https://ya-praktikum.tech/api/v2/resources/`

interface ElementProps {
  users?: User[]
  tagName?: string
  src?: string
  selectedChat?: Chats
  events?: {
    click: (event: Event) => void
  }
}

export class UserList extends Block<ElementProps> {
  constructor(props: ElementProps) {
    super({
      ...props,
      tagName: 'ul',
      events: {
        click: (event: Event) => this.deleteUser(event),
      },
    })
  }

  private deleteUser(event: Event) {
    const userId = (
      (event.target as HTMLElement)!.closest('li') as HTMLLIElement
    ).id
    const users = []
    users.push(Number(userId))
    const chatId = this.props.selectedChat!.id
    ChatController.deleteUser(users, chatId)
  }

  protected render(): DocumentFragment {
    return this.compile(tpl, this.props)
  }
}
