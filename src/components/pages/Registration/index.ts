import tpl from './tpl.hbs'
import './RegistrModule.scss'
import Button from '../../UI/Button'
import Input from '../../UI/Input'
import Block from '../../../utils/Block/block'
import FormData from '../../../utils/FormData'
import Validation from '../../../utils/Validation'

class PageRegistr extends Block {
  constructor(props: any) {
    super('div', props)
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
    })
  }
}

const Registr = new PageRegistr({ events: { submit: FormData } })
export default Registr
