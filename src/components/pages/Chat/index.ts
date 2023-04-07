import tpl from './tpl.hbs'
import './ChatModule.scss'
import Block from '../../../utils/Block/block'
import Button from '../../UI/Button'
import { Link } from '../../UI/Link'
import ChatController from '../../../controllers/ChatController'
import MessageController from '../../../controllers/MessageController'
import store, { withStore } from '../../../utils/Store'
import Input from '../../UI/Input'
import { ChatTitle } from '../../UI/ChatItems/ChatElement'
import { Chats } from '../../../api/ChatAPI'
import { Dropdown } from '../../UI/Dropdown'
import { Dialog } from '../../UI/Dialog'
import DefaultImg from '../../../img/chat-def.svg'

export const avatarUrl = `https://ya-praktikum.tech/api/v2/resources/`

interface ChatProps {
  tagName?: string
  chats?: Chats[]
  selectedChatName?: string
  selectedChat?: Chats
}

export class PageChat extends Block<ChatProps> {
  protected selectedChatName: string
  protected selectedChatId: number
  constructor(props: ChatProps) {
    super({ ...props, tagName: 'div' })
    console.log('CHAT PROPS', this.props)
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
    console.log(this.selectedChatId)
    MessageController.sendMessage(this.selectedChatId, msg)
    this.children.messageInput.value = ''
  }
  createChat() {
    const chatName = this.children.chatNameInput.value
    // console.log('createChat', chatName)
    ChatController.createChat(chatName)
    this.children.chatNameInput.value = ''
  }

  protected componentDidUpdate(
    oldProps: ChatProps,
    newProps: ChatProps
  ): boolean {
    let { chats, selectedChat } = store.getState()

    if (selectedChat){
      this.selectedChatName = selectedChat.title
      this.selectedChatId = selectedChat.id
      // : (this.selectedChatName = 'Выберите чат')

    }
    if (chats) {
      const chatsWithSrc = chats.map((chat: Chats) => {
        return {
          ...chat,
          src: chat.avatar ? `${avatarUrl}${chat.avatar}` : DefaultImg,
        }
      })
      chats = chatsWithSrc
    }

    if (selectedChat) {
      console.log('SLEVCTED CHAT', selectedChat)
      this.children.dialog = new Dialog(selectedChat) 
    }
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
