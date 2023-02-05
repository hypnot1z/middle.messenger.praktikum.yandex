import Handlebars from 'handlebars'
import tpl from 'bundle-text:./tpl.hbs'
import Button from '../../UI/Button'
import './ProfileModule.scss'
import Block from '../../../utils/Block/block'

const button = new Button({
  text: 'Сохранить',
  id: 'edit-btn',
  type: 'submit',
  class: 'btn',
})
class PageEditPassword extends Block {
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
    const form: HTMLFormElement = document.querySelector('.pass__edit')
    form.addEventListener('submit', getFormValue)
    function getFormValue(event: SubmitEvent): void {
      event.preventDefault()
      const oldPass: HTMLElement = form.querySelector('[name="oldPassword"]')
      const newPass: HTMLElement = form.querySelector('[name="newPassword"]')
      const data: Record<string, string> = {
        oldPass: oldPass.value,
        newPass: newPass.value,
      }
      console.log('Password edit data :', data)
    }
  }
}

const EditPassword = new PageEditPassword()
export default EditPassword
