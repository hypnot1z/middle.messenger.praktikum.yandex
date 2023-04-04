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
import { Dropdown } from '../../UI/Dropdown'

interface ChatProps {
  tagName?: string
  chats?: Chats[]
  selectedChatName?: string
  selectedChat?: Chats
}

export class PageChat extends Block<ChatProps> {
  protected selectedChatName: string
  constructor(props: ChatProps) {
    super({ ...props, tagName: 'div' })
  }

  render() {
    return this.compile(tpl, { ...this.props, chatName: this.selectedChatName })
  }

  init() {
    this.children.profile = new Link({
      to: '/profile',
      label: 'Профиль >',
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
    const { chats, selectedChat } = store.getState()

    selectedChat
      ? (this.selectedChatName = selectedChat.title)
      : (this.selectedChatName = 'Выберите чат')

    this.children.chatList = new ChatTitle({
      chats,
    })
    this.children.treeDots = new Dropdown({
      selectedChat,
    })

    return false
  }
}

const withData = withStore((state) => ({
  ...state.chats,
  ...state.selectedChat,
}))

const ChatWithTitles = withData(PageChat)
export const Chat = new ChatWithTitles({})
