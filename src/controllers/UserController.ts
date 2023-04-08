import API, {
  UserAPI,
  User,
  GetUserByLogin,
  ChangePassword,
} from '../api/UserAPI'
import ChatAPI from '../api/ChatAPI'
import store from '../utils/Store'

export class UserController {
  private readonly api: UserAPI

  constructor() {
    this.api = API
  }

  async getUser() {
    try {
      const user = await this.api.reading()

      store.set('user', user)
    } catch (e) {
      console.log('get user catch error cntrlUsr', e)
    }
  }

  async changeProfile(user: Partial<User>) {
    try {
      await this.api.changeProfile({
        first_name: user.first_name,
        second_name: user.second_name,
        display_name: user.display_name,
        login: user.login,
        email: user.email,
        phone: user.phone,
      })
      store.set('user', user)
    } catch (e: any) {
      console.log(e, 'Change profile error')
    }
  }

  async changeAvatar(file: FormData) {
    try {
      await this.api.changeAvatar(file)
    } catch (e) {
      alert(e.reason)
    }
  }

  async changePassword(passwords: ChangePassword) {
    try {
      await this.api.changePassword({
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      })
    } catch (e) {
      alert(e.reason)
    }
  }

  async searchUser(data: GetUserByLogin) {
    try {
      await this.api
        .userSearch(data)
        // .then((res) => alert(`Find User ${res[0].login}`))
        .then((res) => store.set('searchUser', res))
        .catch((e) => console.log('Error serch', e))
      // const serchUser = await this.api.userSearch(data)
      // store.set('userSerch', serchUser)
    } catch (e) {
      console.log(e, 'error search')
    }
  }

  async addUser(user: GetUserByLogin, chatId: number) {
    console.log('USER CONTRL', user, 'CHAT', chatId)
    try {
      await this.searchUser(user).then((res) =>
        console.log('RES ADDUSER', store.getState())
      )
      const { searchUser } = store.getState()
      const users = searchUser.map((u) => u.id)
      try {
        await ChatAPI.addUser(users, chatId)
      } catch (e) {
        console.log('Cant add usr', e)
      }
      //   console.log('AFTER AWAIT', users)
    } catch (e) {
      // try {
      //   await this.api
      //     .userSearch(user)
      //     .then((res) => (
      //         let users = res.map((i) => i.id)
      //         ))
      //     // .then((res) => console.log('RES', res))
      //     // .then((res) => ChatAPI.addUser(res, chatId))
      // }
      console.log(e, 'error search')
    }
  }
}

const UsersController = new UserController()

export default UsersController
