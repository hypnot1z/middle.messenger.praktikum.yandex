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
import { Image } from '../../UI/Img'
import treeDots from '../../../img/three-dots.svg'
import { Dropdown } from '../../UI/Dropdown'

interface ChatProps {
  tagName?: string
  chats: Chats
  chatName?: string
}
export class PageChat extends Block<ChatProps> {
  protected selectedChat = {}
  constructor(props: ChatProps) {
    super({ ...props, tagName: 'div', chatName: 'Выберите чат' })
    // console.log('ALL PROPS', this.props)
    const { selectedChat } = store.getState()
    this.selectedChat = selectedChat
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
    this.children.treeDots = new Dropdown({
      selectedChat: this.selectedChat,
      // events: {
      //   click: () => console.log('tree dots but'),
      // },
    })
    this.children.buttonDots = new Image({
      src: treeDots,
      alt: 'Меню',
      class: 'dots-btn',
      size: '20',
      events: {
        click: () => console.log('wo navigate'),
      },
    })
  }

  selectChat(e: Event) {
    const chatId = (e.target! as HTMLLIElement).id
    function selChat(arr: Chats[], id: number) {
      return arr.filter((obj) => obj.id === id)
    }
    const activeChat = selChat(this.props.chats, Number(chatId))
    store.set('selectedChat', activeChat[0])
    this.props.chatName = activeChat[0].title
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
    // console.log('CDU STATE', store.getState())
    const state = store.getState()
    const selectedChat = Number(state.selectedChat)
    if (selectedChat) {
      this.children.delButton = new Button({
        id: 'del-btn',
        text: 'Удалить чат',
        type: 'button',
        events: { click: () => ChatController.deleteChat(selectedChat) },
      })
    }
    this.children.chatList = new ChatTitle({
      chats: this.props.chats.map((el) => el),
      events: { click: (e: Event) => this.selectChat(e) },
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
