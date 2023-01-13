import Handlebars from 'handlebars'
import tpl from 'bundle-text:./index.hbs'
import Login from './src/components/pages/Login'
import Registr from './src/components/pages/Registration'
import NotFound from './src/components/pages/NotFound'
import ServerError from './src/components/pages/ServerError'
import Chat from './src/components/pages/Chat'
import Button from './src/components/UI/Button'
import styles from './main.scss'

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
  '/chat': Chat,
  '/500': ServerError,
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
