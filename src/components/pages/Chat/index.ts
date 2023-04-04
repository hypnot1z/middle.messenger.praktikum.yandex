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
  chats: Chats[]
  selectedChatName?: string
  selectedChat?: Chats
}
interface Meta {
  chats: Chats[]
  selectedChatName: string
  selectedChat: Chats
}
export class PageChat extends Block<ChatProps> {
  // protected selectedChat = {}
  // protected chats = []
  private meta: Meta
  constructor(props: ChatProps) {
    super({ ...props, tagName: 'div' })
    console.log('ALL PROPS', this.props)
    this.meta = {
      chats: [],
      selectedChat: {},
      selectedChatName: ''
    }
    // this.chats = this.props.chats
    
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
  }

  selectChat(e: Event) {
    const chatId = (e.target! as HTMLLIElement).id
    function selChat(arr: Chats[], id: number) {
      return arr.filter((obj) => obj.id === id)
    }
    const activeChat = selChat([...this.meta.chats], Number(chatId))
    store.set('selectedChat', activeChat[0])
    // this.setChatName()
    // this.props.chatName = activeChat[0].title
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
    if (newProps.chats) {this.meta.chats = Array.from(newProps.chats)}
    // if (newProps.selectedChat) {this.meta.selectedChat = newProps.selectedChat}
    // if (newProps.selectedChatName) {this.meta.selectedChatName = newProps.selectedChatName}
    // const {chats, chatName, selectedChat } = this.props
    // console.log('CHATS LIST', this.props.chats)
    this.children.chatList = new ChatTitle({
      chats: this.meta.chats.map((el) => el),
      events: { click: (e: Event) => this.selectChat(e) },
    })
    // this.children.treeDots = new Dropdown({
    //   selectedChat: this.selectedChat,
    // })
    
    // const { selectedChat } = store.getState()
    // this.selectedChat = selectedChat
    return false
  }
  // setChatName() {
  //   if (JSON.stringify(this.selectedChat) === '{}') {
  //     console.log('Rename chatName')
  //     this.props.chatName = 'Выберите чат!'
  //   } else {
  //     const { selectedChat } = store.getState()
  //     this.props.chatName = selectedChat.title
  //   }
  // }
}

const withData = withStore((state) => {
  let chats: any[]
  let chatName: string
  let selectedChat: any
  state.chats ? chats = [...state.chats] : chats = []
  state.selectedChatName ? chatName = state.selectedChatName : chatName = 'Выберите чат!'
  state.selectedChat ? selectedChat = state.selectedChat : selectedChat = {}
  return {chats: chats, chatName: chatName, selectedChat: selectedChat}
})
    
// const withData = withStore((state) =>
//   state.chats
//     ? {
//         chats: [...state.chats],

//       }
//     : { chats: [] }
// )

const ChatWithTitles = withData(PageChat)
export const Chat = new ChatWithTitles({})
