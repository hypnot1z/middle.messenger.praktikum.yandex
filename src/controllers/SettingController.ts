import API, { SetAPI, ProfileData, PassData } from '../api/SetAPI'
import store from '../utils/Store'
import router from '../utils/Router'

export class SettingController {
  private readonly api: SetAPI

  constructor() {
    this.api = API
  }

  async updateProfile(data: ProfileData) {
    console.log('Update Profile')
    try {
      await this.api.profile(data)

      router.go('/profile')
    } catch (e: any) {
      console.error(e)
    }
  }

  async updatePassword(data: PassData) {
    console.log('Update password')
    try {
      await this.api.password(data)

      // await this.fetchUser()

      router.go('/profile')
    } catch (e: any) {
      console.error(e.message)
    }
  }

  async fetchUser() {
    const user = await this.api.read()
    store.set('user', user)
  }
}

export default new SettingController()
