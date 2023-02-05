import './main.scss'
import Login from './src/components/pages/Login'
import Registr from './src/components/pages/Registration'
import NotFound from './src/components/pages/NotFound'
import ServerError from './src/components/pages/ServerError'
import Chat from './src/components/pages/Chat'
import Profile from './src/components/pages/Profile'
import ProfileEdit from './src/components/pages/ProfileEdit'
import EditPassword from './src/components/pages/EditPassword'

// Router
// Маршруты
const routes = {
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
function render(query: string, block: any) {
  const root = document.querySelector(query)
  root.innerHTML = ''
  root.appendChild(block.getContent())
  return root
}

// Функция отрисовки страницы
function route(url: string) {
  if (url in routes) {
    for (let key in routes) {
      if (key === url) {
        render('.app', routes[key])
        if (key === '/login') {
          Login.formData()
        }
        if (key === '/registration') {
          Registr.formData()
        }
        if (key === '/editpassword') {
          EditPassword.formData()
        }
        if (key === '/editprofile') {
          ProfileEdit.formData()
        }
      }
    }
  } else {
    render('.app', NotFound)
  }
}

// Функция определения маршрута
function router(evt: Event) {
  let url = window.location.hash.slice(1) || '/'
  route(url)
}

// Слушатели событий
window.addEventListener('load', router)
window.addEventListener('hashchange', router)
