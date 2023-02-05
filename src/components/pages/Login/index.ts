import Handlebars from 'handlebars'
import tpl from 'bundle-text:./tpl.hbs'
import Button from '../../UI/Button'
import './LoginModule.scss'
import Block from '../../../utils/Block/block'
import EventBus from '../../../utils/Block/event-bus'

const button = new Button({
  text: 'Войти',
  id: 'login-btn',
  type: 'submit',
  class: 'btn',
})

class PageLogin extends Block {
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
    const form: HTMLFormElement = document.querySelector('.auth')
    form.addEventListener('submit', getFormValue)
    form.addEventListener('submit', this.validation)
    function getFormValue(event: SubmitEvent): void {
      event.preventDefault()
      const log: HTMLElement = form.querySelector('[name="login"]')
      const pass: HTMLElement = form.querySelector('[name="password"]')
      const data: Record<string, string> = {
        login: log.value,
        password: pass.value,
      }
      console.log('Login data :', data)
    }
  }
}

const Login = new PageLogin()
export default Login
