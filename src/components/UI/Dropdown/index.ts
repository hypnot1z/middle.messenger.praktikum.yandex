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

const src: string = treeDots

interface DropdownProps {
  selectedChat: Chats
  tagName?: string
  searchUser?: User[]
  img?: string
  alt?: string
  className?: string
  events?: {
    click: () => void
  }
}

export class Dropdown extends Block<DropdownProps> {
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
    // console.log('DROPDOWN PROPS', this.props)
  }

  init() {
    this.children.deleteChat = new Button({
      text: 'Delete chat',
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
  }

  addUser() {
    const { selectedChat } = store.getState()
    const userLogin = this.children.userLoginInput.value
    // UsersController.searchUser(userLogin)
    // console.log('ADD USER', UsersController.searchUser(userLogin))
    UsersController.addUser(userLogin, selectedChat.id)
  }

  deleteChat() {
    const { selectedChat } = store.getState()
    console.log('this delete chat ID', selectedChat.id)
    ChatController.deleteChat(selectedChat.id)
    store.set('selectedChat', '')
  }

  protected render(): DocumentFragment {
    return this.compile(tpl, this.props)
  }

  public show(): void {
    const dropdownMenu: HTMLElement | null =
      document.querySelector('.dropdown-menu')
    const dropdown: HTMLElement | null = document.querySelector('.dropdown')
    console.log('SHOW', dropdownMenu)
    dropdownMenu!.classList.add('show')
    window.addEventListener('click', function (event) {
      // if (!event.target.matches('.dots-btn')) {
      if (
        !dropdownMenu?.contains(event.target) &&
        !dropdown?.contains(event.target)
      ) {
        if (dropdownMenu?.classList.contains('show')) {
          dropdownMenu.classList.remove('show')
        }
      }
    })
  }
}
