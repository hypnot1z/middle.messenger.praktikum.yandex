import tpl from './tpl.hbs'
import './DropdownModule.scss'
import Block from '../../../utils/Block/block'
import treeDots from '../../../img/three-dots.svg'
import Button from '../Button'
import ButtonDel from '../ButtonDel'
import Input from '../Input'
import store, { withStore } from '../../../utils/Store'
import ChatController from '../../../controllers/ChatController'
import UsersController from '../../../controllers/UserController'
import { User } from '../../../api/AuthAPI'
import { Chats } from '../../../api/ChatAPI'
import { Modal } from '../Modal'

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
  private btns: any[]
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
    console.log('DROPDOWN PROPS DEL', this.props)
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
    // this.children.delUser = new ButtonDel({
    //   type: 'button',
    //   class: 'dropdown-item',
    //   text: 'ssss',
    //   users: this.selChatUsers,
    // })
  }

  addUser() {
    const { selectedChat } = store.getState()
    const userLogin = this.children.userLoginInput.value
    // UsersController.searchUser(userLogin)
    // console.log('ADD USER', UsersController.searchUser(userLogin))
    UsersController.addUser(userLogin, selectedChat.id)
  }
  deleteUser() {
    console.log('DELETEEEE')
    const { selectedChat } = store.getState()
    ChatController.getChatUsers(selectedChat)
    const { selChatUsers } = store.getState()
    // console.log('SELCHATUSR', selChatUsers)
    // this.children.deleteUserModal = new Modal({ users: selChatUsers })
  }

  deleteChat() {
    const { selectedChat } = store.getState()
    console.log('this delete chat ID', selectedChat.id)
    ChatController.deleteChat(selectedChat.id)
    store.set('selectedChat', '')
  }

  protected componentDidUpdate(
    oldProps: DropdownProps,
    newProps: DropdownProps
  ): boolean {
    console.log('NNNN', newProps.selChatUsers)
    const { selChatUsers, selectedChat } = store.getState()
    this.selChatUsers = selChatUsers
    this.selectedChat = selectedChat
    this.children.delUser = new ButtonDel({
      type: 'button',
      class: 'dropdown-item',
      text: 'ssss',
      users: newProps.selChatUsers,
    })

    // console.log('USERRRRS', selChatUsers)
    // if (selChatUsers) {
    //   this.children.delUser = selChatUsers.map((user: User) => {
    //     return (this.children.delUser = new Button({
    //       text: user.login,
    //       type: 'button',
    //       class: 'dropdown-item',
    //     }))
    //   })
    // }

    return false
  }

  protected render(): DocumentFragment {
    return this.compile(tpl, { ...this.props })
  }

  public show(): void {
    const dropdownMenu: HTMLElement | null =
      document.querySelector('.dropdown-menu')
    const dropdown: HTMLElement | null = document.querySelector('.dropdown')
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

const withData = withStore((state) => ({
  selectedChat: state.selectedChat,
  selChatUsers: state.selChatUsers,
}))

export const Dropdown = withData(DropdownBase)

// const ChatWithTitles = withData(PageChat)
// export const Chat = new ChatWithTitles({})
