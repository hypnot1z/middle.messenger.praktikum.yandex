import './main.scss'
import Login from './src/components/pages/Login'
import Registr from './src/components/pages/Registration'
import Chat from './src/components/pages/Chat'
import Profile from './src/components/pages/Profile'
import ProfileEdit from './src/components/pages/ProfileEdit'
import EditPassword from './src/components/pages/EditPassword'
import { PageErr } from './src/components/pages/ErrorPage'

const NotFound = new PageErr({ code: '404', text: 'Не туда попали' })
const ServerError = new PageErr({ code: '500', text: 'Мы уже фиксим' })

// Router
// Маршруты
const routes: Record<string, any> = {
  '/': Login,
  '/login': Login,
  '/registration': Registr,
  '/profile': Profile,
  '/editprofile': ProfileEdit,
  '/chat': Chat,
  '/500': ServerError,
  '/editpassword': EditPassword,
}

// Render
function render(block: any) {
  const root: HTMLElement | null = document.querySelector('.app')
  root!.innerHTML = ''
  root!.append(block.getContent())
  return root
}

// Функция отрисовки страницы
function route(url: string) {
  if (url in routes) {
    for (let key in routes) {
      if (key === url) {
        render(routes[key])
      }
    }
  } else {
    render(NotFound)
  }
}

// Функция определения маршрута
function router() {
  let url = window.location.hash.slice(1) || '/'
  route(url)
}

// Слушатели событий
window.addEventListener('load', router)
window.addEventListener('hashchange', router)

