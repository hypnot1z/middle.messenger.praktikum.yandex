import tpl from './tpl.hbs'
import './ChatModule.scss'
import Block from '../../../utils/Block/block'
import Button from '../../UI/Button'
import { Link } from '../../UI/Link'
import ChatController from '../../../controllers/ChatController'
import store, { withStore } from '../../../utils/Store'
import Input from '../../UI/Input'
import { ChatTitle } from '../../UI/ChatItems/ChatElement'
import { Chats } from '../../../api/ChatAPI'

interface ChatProps {
  tagName?: string
  chats: Chats
}
export class PageChat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super({ ...props, tagName: 'div' })
  }

  render() {
    return this.compile(tpl, this.props)
  }

  init() {
    this.children.profile = new Link({
      to: '/profile',
      label: 'Профиль',
    })
    this.children.createChat = new Button({
      text: '+',
      id: 'createChat-btn',
      class: 'createChat-btn',
      type: 'button',
      events: {
        click: () => this.createChat(),
      },
    })
    this.children.chatNameInput = new Input({
      type: 'text',
      name: 'createChat',
      placeholder: 'Создать чат...',
      class: 'chat-input',
    })
    this.children.getChats = new Button({
      text: 'Получить чаты',
      id: 'getChats-btn',
      type: 'button',
      events: {
        click: () => ChatController.getChats(),
      },
    })
    this.children.buttonSend = new Button({
      text: 'Отправить',
      id: 'send-btn',
      type: 'button',
      events: {
        click: () => this.sendMessage(),
      },
    })
    this.children.messageInput = new Input({
      type: 'text',
      name: 'message',
      placeholder: '...',
      class: 'msg-input',
    })
    this.children.buttonDots = new Button({
      text: '3 Dots',
      id: 'dots-btn',
      type: 'button',
    })
  }

  sendMessage() {
    console.log('sendMessage', this.children.messageInput.value)
    const msg = this.children.messageInput.value
    this.children.messageInput.value = ''
  }
  createChat() {
    const chatName = this.children.chatNameInput.value
    console.log('createChat', chatName)
    ChatController.createChat(chatName)
    this.children.chatNameInput.value = ''
  }

  protected componentDidUpdate(
    oldProps: ChatProps,
    newProps: ChatProps
  ): boolean {
    this.children.chatList = new ChatTitle({
      title: this.props.chats.map((el) => el.title),
    })
    return false
  }
}

const withData = withStore((state) =>
  state.chats
    ? {
        chats: [...state.chats],
      }
    : { chats: [] }
)

const ChatWithTitles = withData(PageChat)
export const Chat = new ChatWithTitles({})
