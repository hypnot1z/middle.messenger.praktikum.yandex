import tpl from './tpl.hbs'
import './RegistrModule.scss'
import Button from '../../UI/Button'
import Input from '../../UI/Input'
import Block from '../../../utils/Block/block'
// import FormData from '../../../utils/FormData'
import Validation from '../../../utils/Validation'
import AuthController from '../../../controllers/AuthController'
import { SignupData } from '../../../api/AuthAPI'
import { Link } from '../../UI/Link'

interface PageRegistrProps {
  events?: any
  tagName?: string
}
export class PageRegistr extends Block {
  constructor(props: PageRegistrProps) {
    props.tagName = 'div'
    super(props)
  }

  render() {
    return this.compile(tpl, this.props)
  }

  init() {
    this.children.inputMail = new Input({
      type: 'email',
      name: 'email',
      placeholder: 'Почта',
      class: 'registr-input',
      events: {
        blur: Validation,
      },
    })
    this.children.inputLogin = new Input({
      type: 'text',
      name: 'login',
      placeholder: 'Логин',
      class: 'registr-input',
      events: {
        blur: Validation,
      },
    })
    this.children.inputFname = new Input({
      type: 'text',
      name: 'first_name',
      placeholder: 'Имя',
      class: 'registr-input',
      events: {
        blur: Validation,
      },
    })
    this.children.inputSname = new Input({
      type: 'text',
      name: 'second_name',
      placeholder: 'Фамилия',
      class: 'registr-input',
      events: {
        blur: Validation,
      },
    })
    this.children.inputTel = new Input({
      type: 'tel',
      name: 'phone',
      placeholder: 'Телефон',
      class: 'registr-input',
      events: {
        blur: Validation,
      },
    })
    this.children.inputPass = new Input({
      type: 'password',
      name: 'password',
      placeholder: 'Пароль',
      class: 'registr-input',
      events: {
        blur: Validation,
      },
    })
    this.children.inputPassRep = new Input({
      type: 'password',
      name: 'password',
      placeholder: 'Пароль еще раз',
      class: 'registr-input',
      events: {
        blur: Validation,
      },
    })
    this.children.button = new Button({
      text: 'Регистрация',
      id: 'register-btn',
      type: 'submit',
      class: 'btn',
      events: { click: (e: Event) => this.onSubmit(e) },
    })
    this.children.login = new Link({
      to: '/login',
      label: 'Войти',
    })
  }

  onSubmit(e: Event) {
    e.preventDefault()
    const values = Object.values(this.children)
      .filter((child) => child instanceof Input)
      .map((child) => [(child as Input).name, (child as Input).value])

    const data = Object.fromEntries(values)

    AuthController.signup(data as SignupData)
  }
}

const Registr = new PageRegistr({})
export default Registr
