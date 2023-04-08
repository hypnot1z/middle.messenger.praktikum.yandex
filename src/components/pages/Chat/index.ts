import tpl from './tpl.hbs'
import './ChatModule.scss'
import Block from '../../../utils/Block/block'
import Button from '../../UI/Button'
import { Link } from '../../UI/Link'
import ChatController from '../../../controllers/ChatController'
import MessageController, {
  MessageInfo,
} from '../../../controllers/MessageController'
import store, { withStore } from '../../../utils/Store'
import Input from '../../UI/Input'
import { ChatTitle } from '../../UI/ChatItems/ChatElement'
import { Chats } from '../../../api/ChatAPI'
import { Dropdown } from '../../UI/Dropdown'
import { Dialog } from '../../UI/Dialog'
import { Message } from '../../UI/Message'
import DefaultImg from '../../../img/chat-def.svg'

export const avatarUrl = `https://ya-praktikum.tech/api/v2/resources/`

interface ChatProps {
  tagName?: string
  chats?: Chats[]
  selectedChatName?: string
  selectedChatId?: number
  selectedChat?: Chats | undefined
  messages: MessageInfo[]
  userId: number
}

export class PageChat extends Block<ChatProps> {
  protected selectedChatName: string
  protected selectedChatId: number
  protected selectedChatUsers: string[]
  constructor(props: ChatProps) {
    super({ ...props, tagName: 'div' })
    console.log('CHAT PROPS', this.props)
  }

  render() {
    return this.compile(tpl, {
      ...this.props,
      chatName: this.selectedChatName,
      chatUsers: this.selectedChatUsers,
    })
  }

  init() {
    // this.children.messages = this.createMessages(this.props)

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
  }

  sendMessage(e: Event) {
    e.preventDefault()
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

  private createMessages(chatId: number, data: any, userId: number) {
    // console.log('MSG', data)
    // return data.map((el: MessageInfo) => {
    //   return (this.children.messages = new Message({
    //     content: el.content,
    //     isMine: el.user_id === userId,
    //   }))
    // })
    const content = data.map((m) => {
      return { content: m.content, isMine: m.user_id === userId }
    })
    return (this.children.messages = new Message(content))
    // return props.messages.map((data) => {
    //   return new Message({ ...data })
    //   // return new Message({ ...data, isMine: props.userId === data.user_id })
    // })
  }

  protected componentDidUpdate(
    oldProps: ChatProps,
    newProps: ChatProps
  ): boolean {
    let { chats, selectedChat, selChatUsers, user } = store.getState()
    // console.log('CHAT USER', user)
    // console.log('CHAT NWE PROPS', newProps)

    // this.children.messages = this.createMessages(newProps)

    if (selChatUsers) {
      this.selectedChatUsers = selChatUsers.map((u) => u.login)
    }
    if (selectedChat) {
      this.selectedChatName = selectedChat.title
      this.selectedChatId = selectedChat.id
      this.createMessages(
        this.selectedChatId,
        newProps.messages[this.selectedChatId],
        user.id
      )
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
      // this.children.dialog = new Dialog(selectedChat)
      this.children.buttonSend = new Button({
        text: 'Отправить',
        id: 'send-btn',
        type: 'submit',
        events: {
          click: (e: Event) => this.sendMessage(e),
        },
      })
      this.children.messageInput = new Input({
        type: 'text',
        name: 'message',
        placeholder: '...',
      })
      this.children.treeDots = new Dropdown({
        selectedChat,
      })
    }
    this.children.chatList = new ChatTitle({
      chats,
    })

    return false
  }
}

const withData = withStore((state) => ({
  chats: state.chats,
  selectedChat: state.selectedChat,
  messages: state.messages,
}))

const ChatWithTitles = withData(PageChat)
export const Chat = new ChatWithTitles({})
