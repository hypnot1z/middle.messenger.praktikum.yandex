import './main.scss'
import Login from './src/components/pages/Login'
import Registr from './src/components/pages/Registration'
import { Chat } from './src/components/pages/Chat'
import Profile from './src/components/pages/Profile'
// import ProfileEdit from './src/components/pages/ProfileEdit'
import EditProfile from './src/components/pages/ProfileEdit'
import EditPassword from './src/components/pages/EditPassword'
// import { PageErr } from './src/components/pages/ErrorPage'
import Router from './src/utils/Router'
import AuthController from './src/controllers/AuthController'
import store from './src/utils/Store'
import ChatController from './src/controllers/ChatController'

// const NotFound = new PageErr({ code: '404', text: 'Не туда попали' })
// const ServerError = new PageErr({ code: '500', text: 'Мы уже фиксим' })

enum Routes {
  Index = '/',
  Registr = '/sign-up',
  Profile = '/profile',
  Login = '/login',
  Chat = '/messenger',
  EditProfile = '/settings',
  EditPassword = '/password',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router.use(Routes.Index, Login)
    .use(Routes.Login, Login)
    .use(Routes.Registr, Registr)
    .use(Routes.Profile, Profile)
    .use(Routes.Chat, Chat)
    .use(Routes.EditProfile, EditProfile)
    .use(Routes.EditPassword, EditPassword)

  let isProtectedRoute = true

  switch (window.location.pathname) {
    case Routes.Login:
    case Routes.Registr:
      isProtectedRoute = false
      break
  }

  try {
    await AuthController.fetchUser()

    await ChatController.getChats()

    Router.start()
    Router.go(Routes.Chat)
  } catch (e) {
    Router.start()

    if (isProtectedRoute) {
      Router.go(Routes.Index)
      Router.go(Routes.Registr)
    }
  }
})
