import tpl from './tpl.hbs'
import Button from '../../UI/Button'
import Input from '../../UI/Input'
import './LoginModule.scss'
import Block from '../../../utils/Block/block'
import Validation from '../../../utils/Validation'
import { SignupData } from '../../../api/AuthAPI'
import AuthController from '../../../controllers/AuthController'
import { Link } from '../../UI/Link'

export class PageLogin extends Block {
  constructor(props: any) {
    super('div', props)
  }

  render() {
    return this.compile(tpl, this.props)
  }

  init() {
    this.children.inputLogin = new Input({
      type: 'text',
      name: 'login',
      placeholder: 'Логин',
      class: 'auth-input',
      events: {
        blur: Validation,
      },
    })
    this.children.inputPass = new Input({
      type: 'password',
      name: 'password',
      placeholder: 'Пароль',
      class: 'auth-input',
      events: {
        blur: Validation,
      },
    })
    this.children.button = new Button({
      text: 'Войти',
      id: 'login-btn',
      type: 'submit',
      class: 'btn',
      events: { click: (e: Event) => this.onSubmit(e) },
    })
    this.children.logout = new Button({
      text: 'Выйти',
      id: 'logout-btn',
      type: 'submit',
      class: 'btn',
      events: { click: this.logout },
    })
    this.children.registr = new Link({
      to: '/sign-up',
      label: 'Нет аккаунта?',
    })
  }

  onSubmit(e: Event) {
    e.preventDefault()
    const values = Object.values(this.children)
      .filter((child) => child instanceof Input)
      .map((child) => [(child as Input).name, (child as Input).value])

    const data = Object.fromEntries(values)
    console.log(data)

    AuthController.signin(data as SignupData)
  }

  logout() {
    AuthController.logout()
  }
}

const Login = new PageLogin({})
export default Login
