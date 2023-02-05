import Handlebars from 'handlebars'
import tpl from 'bundle-text:./tpl.hbs'
import './RegistrModule.scss'
import Button from '../../UI/Button'
import Block from '../../../utils/Block/block'

const button = new Button({
  text: 'Регистрация',
  id: 'register-btn',
  type: 'submit',
  class: 'btn',
})
class PageRegistr extends Block {
  constructor(props) {
    super('div', props)
  }

  render() {
    const compile = Handlebars.compile(tpl)
    const res = compile({
      button: button.render(),
    })

    return res
  }

  //form data
  formData() {
    const form: HTMLFormElement = document.querySelector('.registr')
    form.addEventListener('submit', getFormValue)
    function getFormValue(event: SubmitEvent): void {
      event.preventDefault()
      const log: HTMLElement = form.querySelector('[name="login"]')
      const pass: HTMLElement = form.querySelector('[name="password"]')
      const email: HTMLElement = form.querySelector('[name="email"]')
      const firstName: HTMLElement = form.querySelector('[name="first_name"]')
      const secondName: HTMLElement = form.querySelector('[name="second_name"]')
      const phone: HTMLElement = form.querySelector('[name="phone"]')
      const data: Record<string, string> = {
        login: log.value,
        password: pass.value,
        email: email.value,
        firstName: firstName.value,
        secondName: secondName.value,
        phone: phone.value,
      }
      console.log('Registr data :', data)
    }
  }
}

const Registr = new PageRegistr()
export default Registr
