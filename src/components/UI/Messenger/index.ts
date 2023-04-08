import ButtonConfirm from 'components/button-confirm/button-confirm'
import Input from 'components/input/input'
import Block from 'utils/Block'
import template from './messenger.hbs'
import Message from 'components/message/message'
import { withStore } from 'utils/store/Store'
import DropDown from 'components/drop-down/drop-down'
import UserMenu from 'components/user-menu/user-menu'
import WindowModal from 'components/window-modal/window-modal'
import MessageController, { MessageInfo } from 'services/MessageController'
import { GetUserByLoginRequestData } from 'api/typesAPI'
import UsersController from 'services/UserController'
import ChatController from 'services/ChatsController'

interface MessengerProps {
  selectedChat: number | undefined
  messages: MessageInfo[]
  userId: number
  searchUser: findUser[]
  addUsers: findUser[]
}

class MessengerBase extends Block<MessengerProps> {
  constructor(props: MessengerProps) {
    super(props)
  }
  protected init() {
    this.children.messages = this.createMessages(this.props)

    this.children.droppoint = new ButtonConfirm({
      title: '⋮',
      class:
        'text-white text-center bg-transparent text-bold w-5 h-5 rounded-full hover:bg-select-graphite',
      events: { click: () => this.userMenu() },
    })

    this.children.addUser = new UserMenu({
      title: 'Add user',
      events: {
        click: () => this.addUser(),
      },
    })

    this.children.deleteUser = new UserMenu({
      title: 'Delete user',
      events: {
        click: () => this.deleteUser(),
      },
    })

    this.children.addUserWindow = new WindowModal({
      text: 'Print user login',
      id: 'window-add',
      func: () => this.addUserChat(),
      inputId: 'input-add',
      btn: 'find',
    })

    this.children.DeleteUserWindow = new WindowModal({
      text: 'Select a user and click on it',
      id: 'deleteModal',
      inputId: 'delete-input',
      func: () => this.close(),
      btn: 'Done',
    })

    this.children.dropbutton = new ButtonConfirm({
      title: '❐',
      class: 'w-8 h-8 text-white text-bold',
      events: { click: () => this.dropDown() },
    })

    this.children.input = new Input({
      type: 'text',
      class:
        'placeholder:white pl-[6px] h-[28px] bg-select-graphite focus:outline-none w-full rounded-lg',
      placeholder: 'Write message',
      name: 'message',
      id: 'message',
    })

    this.children.dropdown = new DropDown()

    this.children.button = new ButtonConfirm({
      title: '➤',
      class:
        'rounded-full bg-blue text-white mx-2 w-[28px] h-[28px] text-center',
      events: {
        click: () => {
          const input = this.children.input as Input
          const message = input.getValue()

          input.setValue('')

          MessageController.sendMessage(this.props.selectedChat!, message)
        },
      },
    })
  }

  protected componentDidUpdate(
    oldProps: MessengerProps,
    newProps: MessengerProps
  ): boolean {
    this.children.messages = this.createMessages(newProps)

    return true
  }

  addUser() {
    document.getElementById('window-add')!.classList.remove('hidden')
  }

  close() {
    document.getElementById('deleteModal')?.classList.toggle('hidden')
  }

  deleteUser() {
    const modal = document.getElementById('deleteModal')
    document.getElementById('delete-input')?.classList.add('hidden')
    modal!.classList.toggle('hidden')
    this.createItemsDelete()
  }

  createItemsDelete() {
    const currentUsers = this.props.addUsers
    const div = document.getElementById('delete-input') as HTMLElement
    const dataReq: any[] = []
    if (currentUsers.length > 0) {
      currentUsers.forEach((item) => {
        const p = document.createElement('p')
        p.className = 'text-sm text-white p-0.5 hover:bg-select-graphite'
        div.after(p)
        p.id = item.login
        p.innerText = `User: ${item.login} name: ${item.first_name}  ✘`
        let chat_id = this.props.selectedChat!
        p.addEventListener(
          'click',
          () => this.deleteUserHandler(chat_id, item.id, item.login),
          false
        )
        dataReq.push(this.props.selectedChat!, item.id)
      })
    } else {
      const p = document.createElement('p')
      p.innerText = 'User not found'
      div.after(p)
    }
    // console.log(...new Set(dataReq))
  }

  deleteUserHandler(chat_id: number, userId: number, login: string) {
    const elp = document.getElementById(login)

    ChatController.deleteUserToChat(userId, chat_id)
    alert(`User ${login} delete from chat`)
    elp!.remove()
  }

  dropDown() {
    document.getElementById('dropdown')!.classList.toggle('hidden')
  }

  userMenu() {
    document.getElementById('user-menu')?.classList.toggle('hidden')
  }
  //TODO: перенести в отдельный компонент
  async addUserChat() {
    try {
      const modalInput = document.getElementById(
        'input-add'
      ) as HTMLInputElement
      const user = { login: modalInput.value }
      await UsersController.searchUser(user as GetUserByLoginRequestData)
      let users = this.props.searchUser
      const dataReq: any[] = []
      if (users.length > 0) {
        users.forEach((item) => {
          const p = document.createElement('p')
          p.className = 'text-sm text-white p-0.5 hover:bg-select-graphite'
          modalInput.after(p)
          p.innerText = `User: ${item.login} name: ${item.first_name}`
          let chat_id = this.props.selectedChat!
          p.addEventListener(
            'click',
            () => this.addUserHandler(chat_id, item.id, item.login),
            false
          )
          dataReq.push(this.props.selectedChat!, item.id)
          setTimeout(() => p.remove(), 5000)
        })
      } else {
        const p = document.createElement('p')
        p.innerText = 'User not found'
        modalInput.after(p)
        setTimeout(() => p.remove(), 3000)
      }
    } catch (e) {
      console.log('Все сломалось, все пропало', e)
    }
  }

  async addUserHandler(chat_id: number, userId: number, login: string) {
    try {
      await ChatController.addUserToChat(userId, chat_id)
      alert(`User ${login} added in chat`)
    } catch (e) {
      console.log('Все сломалось, все пропало', e)
    }
  }

  private createMessages(props: MessengerProps) {
    return props.messages.map((data) => {
      //TODO: debag
      return new Message({ ...data, isMine: props.userId === data.user_id })
    })
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props })
  }
}

const withSelectedChatMessages = withStore((state) => {
  const selectedChatId = state.selectedChat

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.id,
      searchUser: undefined,
      addUsers: [],
    }
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user.id,
    searchUser: state.searchUser,
    addUsers: state.addUsers,
  }
})

export const Messenger = withSelectedChatMessages(MessengerBase)
