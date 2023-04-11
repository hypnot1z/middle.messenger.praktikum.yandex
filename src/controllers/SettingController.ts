import API, { SetAPI, ProfileData, PassData } from '../api/SetAPI'
import router from '../utils/Router'
import AuthController from './AuthController'

export class SettingController {
  private readonly api: SetAPI

  constructor() {
    this.api = API
  }

  async updateProfile(data: ProfileData) {
    console.log('Update Profile')
    try {
      await this.api.profile(data)

      AuthController.fetchUser()

      router.go('/profile')
    } catch (e: any) {
      console.error(e)
    }
  }

  async updatePassword(data: PassData) {
    console.log('Update password')
    try {
      await this.api.password(data)

      AuthController.logout()
      router.go('/profile')
    } catch (e: any) {
      console.error(e.message)
    }
  }
}

export default new SettingController()
