import API, { AuthAPI, SigninData, SignupData } from '../api/AuthAPI'
import store from '../utils/Store'
import router from '../utils/Router'

export class AuthController {
  private readonly api: AuthAPI

  constructor() {
    this.api = API
  }

  async signin(data: SigninData) {
    console.log('Signin')
    try {
      await this.api.signin(data)

      router.go('/messenger')
    } catch (e: any) {
      if (e.reason === 'User already in system') router.go('/messenger')
      console.error(e)
    }
  }

  async signup(data: SignupData) {
    console.log('Signup')
    try {
      await this.api.signup(data)

      await this.fetchUser()

      router.go('/profile')
    } catch (e: any) {
      console.error(e.message)
    }
  }

  async fetchUser() {
    console.log('Fetch user')
    const user = await this.api.read()
    console.log(user)

    store.set('user', user)
    // console.log('STORE STATE',store.getState())
    // if (user) {
    //   router.go('/messenger')
    // }
  }

  async logout() {
    console.log('Logout')
    try {
      await this.api.logout()

      router.go('/')
    } catch (e: any) {
      console.error(e.message)
    }
  }
}

export default new AuthController()
