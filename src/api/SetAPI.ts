import BaseAPI from './BaseAPI'

export interface ProfileData {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface PassData {
  oldPassword: string
  newPassword: string
}

export interface AvaData {
  file: File
}

export interface User {
  id: number
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
  avatar: string
}

export class SetAPI extends BaseAPI {
  constructor() {
    super('/user')
  }

  profile(data: ProfileData) {
    return this.http.put('/profile', data)
  }

  password(data: PassData) {
    return this.http.put('/password', data)
  }

  avatar(data: AvaData) {
    return this.http.put('/profile/avatar', data)
  }

  read(): Promise<User> {
    console.log('Get user by ID')
    return this.http.get(`/user`)
  }

  getUser(id: number): Promise<User> {
    return this.http.get(`/user/${id}`)
  }

  create = undefined
  update = undefined
  delete = undefined
}

export default new SetAPI()
