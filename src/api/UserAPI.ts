import BaseAPI from './BaseAPI'

export interface User {
  id: number
  first_name: string
  second_name: string
  display_name?: string
  login: string
  email: string
  password: string
  phone: string
  avatar: string
}
export interface GetUserByLogin {
  login: string
}
export interface ChangePassword {
  oldPassword: string
  newPassword: string
}

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user')
  }

  reading(): Promise<User> {
    return this.http.get('/')
  }

  updateUser(data: User) {
    return this.http.put('/', data)
  }

  public changeProfile(user: User) {
    return this.http.put('/profile', { ...user })
  }

  public changeAvatar(file: FormData) {
    return this.http.put('/profile/avatar', file)
  }

  public changePassword(passwords: ChangePassword) {
    return this.http.put('/password', { ...passwords })
  }

  getUser(id: string) {
    return this.http.get(`/${id}`)
  }

  userSearch(data: GetUserByLogin) {
    return this.http.post('/search', { login: data.login })
  }

  read = undefined
  create = undefined
  update = undefined
  delete = undefined
}

export default new UserAPI()
