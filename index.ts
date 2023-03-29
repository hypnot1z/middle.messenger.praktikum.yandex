import './main.scss'
import Login from './src/components/pages/Login'
import Registr from './src/components/pages/Registration'
import Chat from './src/components/pages/Chat'
import Profile from './src/components/pages/Profile'
// import ProfileEdit from './src/components/pages/ProfileEdit'
import EditProfile from './src/components/pages/ProfileEdit'
import EditPassword from './src/components/pages/EditPassword'
import { PageErr } from './src/components/pages/ErrorPage'
import Router from './src/utils/Router'
import AuthController from './src/controllers/AuthController'
import store from './src/utils/Store'

const NotFound = new PageErr({ code: '404', text: 'Не туда попали' })
const ServerError = new PageErr({ code: '500', text: 'Мы уже фиксим' })

// Router
// Маршруты
// const Routes: Record<string, any> = {
//   '/': Login,
//   '/login': Login,
//   '/registration': Registr,
//   '/profile': Profile,
//   '/editprofile': ProfileEdit,
//   '/chat': Chat,
//   '/500': ServerError,
//   '/editpassword': EditPassword,
// }

enum Routes {
  Index = '/',
  Registr = '/sign-up',
  Profile = '/profile',
  Login = '/login',
  Chat = '/messenger',
  EditProfile = '/settings',
  EditPassword = '/password',
}

// Render
// function render(block: any) {
//   const root: HTMLElement | null = document.querySelector('.app')
//   root!.innerHTML = ''
//   root!.append(block.getContent())
//   return root
// }

// Функция отрисовки страницы
// function route(url: string) {
//   if (url in routes) {
//     for (let key in routes) {
//       if (key === url) {
//         render(routes[key])
//       }
//     }
//   } else {
//     render(NotFound)
//   }
// }

// Функция определения маршрута
// function router() {
//   let url = window.location.hash.slice(1) || '/'
//   route(url)
// }

// Слушатели событий
// window.addEventListener('load', router)
// window.addEventListener('hashchange', router)

window.addEventListener('DOMContentLoaded', async () => {
  Router.use(Routes.Index, Login)
    .use(Routes.Login, Login)
    .use(Routes.Registr, Registr)
    .use(Routes.Profile, Profile)
    .use(Routes.Chat, Chat)
    .use(Routes.EditProfile, EditProfile)
    .use(Routes.EditPassword, EditPassword)

  let isProtectedRoute = true

  // switch (window.location.pathname) {
  //   case Routes.Index:
  //   case Routes.Registr:
  //     isProtectedRoute = false
  //     break
  // }

  try {
    await AuthController.fetchUser()
    const { user } = store.getState()

    Router.start()

    if (user) {
      Router.go(Routes.Chat)
    }
  } catch (e) {
    Router.start()

    if (isProtectedRoute) {
      Router.go(Routes.Index)
    }
  }
})
