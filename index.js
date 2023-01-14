import Handlebars from 'handlebars'
import tpl from 'bundle-text:./index.hbs'
import Login from './src/components/pages/Login'
import Registr from './src/components/pages/Registration'
import NotFound from './src/components/pages/NotFound'
import ServerError from './src/components/pages/ServerError'
import Chat from './src/components/pages/Chat'
import Profile from './src/components/pages/Profile'
import Button from './src/components/UI/Button'
import styles from './main.scss'
import ProfileEdit from './src/components/pages/ProfileEdit'
import EditPassword from './src/components/pages/EditPassword'

const root = document.getElementById('root')

const compile = Handlebars.compile(tpl)
const res = compile({
  page: Login,
})

root.innerHTML = res

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

// Функция отрисовки страницы
function route(url) {
  let res
  if (url in routes) {
    for (let key in routes) {
      if (key === url) {
        res = compile({
          page: routes[key],
        })
        root.innerHTML = res
      }
    }
  } else {
    res = compile({
      page: NotFound,
    })
    root.innerHTML = res
  }
}

// Функция определения маршрута
function router(evt) {
  let url = window.location.hash.slice(1) || '/'
  route(url)
}

// Слушатели событий
window.addEventListener('load', router)
window.addEventListener('hashchange', router)
