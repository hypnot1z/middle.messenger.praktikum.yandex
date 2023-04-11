import tpl from './tpl.hbs'
import './DropdownModule.scss'
import Block from '../../../utils/Block/block'
import treeDots from '../../../img/three-dots.svg'
import Button from '../Button'
import Input from '../Input'
import store, { withStore } from '../../../utils/Store'
import ChatController from '../../../controllers/ChatController'
import UsersController from '../../../controllers/UserController'
import { User } from '../../../api/AuthAPI'
import { Chats } from '../../../api/ChatAPI'
import { UserList } from '../ChatItems/UserList'

const src: string = treeDots

interface DropdownProps {
  selectedChat: Chats
  tagName?: string
  searchUser?: User[]
  selChatUsers: User[]
  img?: string
  alt?: string
  className?: string
  events?: {
    click: () => void
  }
}

export class DropdownBase extends Block<DropdownProps> {
  private selectedChat: Chats
  private selChatUsers: User[]
  constructor(props: DropdownProps) {
    super({
      ...props,
      tagName: 'div',
      img: src,
      alt: 'Меню',
      className: 'dropdown',
      events: {
        click: () => this.show(),
      },
    })
    this.selChatUsers
    this.selectedChat
  }

  init() {
    this.children.deleteChat = new Button({
      text: 'Удалить чат',
      type: 'button',
      id: 'delchat-btn',
      class: 'dropdown-item',
      events: {
        click: () => this.deleteChat(),
      },
    })
    this.children.addUserBtn = new Button({
      text: '+',
      id: 'addUser-btn',
      class: 'addUser-btn',
      type: 'button',
      events: {
        click: () => this.addUser(),
      },
    })
    this.children.userLoginInput = new Input({
      type: 'text',
      name: 'addUser',
      placeholder: 'Имя пользователя...',
      class: 'user-input',
    })
    this.children.userList = new UserList({
      users: this.props.selChatUsers,
      selectedChat: this.props.selectedChat,
    })
  }

  addUser() {
    const { selectedChat } = store.getState()
    //@ts-ignore
    const userLogin = this.children.userLoginInput.value
    UsersController.addUser(userLogin, selectedChat.id)
  }

  deleteChat() {
    const { selectedChat } = store.getState()
    console.log('this delete chat ID', selectedChat.id)
    ChatController.deleteChat(selectedChat.id)
    store.set('selectedChat', '')
  }

  private userList() {
    const { selChatUsers } = store.getState()
    if (selChatUsers) {
      console.log('SELUSERS', selChatUsers)
      this.children.userList = new UserList({
        users: selChatUsers,
      })
    }
  }

  protected componentDidUpdate(
    //@ts-ignore
    oldProps: DropdownProps, newProps: DropdownProps
  ): boolean {
    const { selChatUsers, selectedChat } = store.getState()
    this.selChatUsers = selChatUsers
    this.selectedChat = selectedChat
    if (selChatUsers) {
      this.children.userList = new UserList({
        users: selChatUsers,
      })
    }
    return true
  }

  protected render(): DocumentFragment {
    return this.compile(tpl, this.props)
  }

  public show(): void {
    this.userList()
    const dropdownMenu: HTMLElement | null =
      document.querySelector('.dropdown-menu')
    const dropdown: HTMLElement | null = document.querySelector('.dropdown')
    dropdownMenu!.classList.add('show')
    window.addEventListener('click', function (event) {
      if (
        !dropdownMenu?.contains(event.target as Node) &&
        !dropdown?.contains(event.target as Node)
      ) {
        if (dropdownMenu?.classList.contains('show')) {
          dropdownMenu.classList.remove('show')
        }
      }
    })
  }
}

const withData = withStore((state) => ({
  selectedChat: state.selectedChat,
  selChatUsers: state.selChatUsers,
}))

export const Dropdown = withData(DropdownBase)
