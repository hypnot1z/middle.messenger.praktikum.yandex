import tpl from './tpl.hbs'
import Button from '../../UI/Button'
import Input from '../../UI/Input'
import './LoginModule.scss'
import Block from '../../../utils/Block/block'
import FormData from '../../../utils/FormData'
import Validation from '../../../utils/Validation'

interface PageProps {
  events: any
}
class PageLogin extends Block<PageProps> {
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
    })
  }
}

const Login = new PageLogin({ events: { submit: FormData } })
export default Login
