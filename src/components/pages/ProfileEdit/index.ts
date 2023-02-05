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
class PageEditProfile extends Block {
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
    const form: HTMLFormElement = document.querySelector('.profile__edit')
    form.addEventListener('submit', getFormValue)
    function getFormValue(event: SubmitEvent): void {
      event.preventDefault()
      const log: HTMLElement = form.querySelector('[name="login"]')
      const displayName: HTMLElement = form.querySelector(
        '[name="display_name"]'
      )
      const email: HTMLElement = form.querySelector('[name="email"]')
      const firstName: HTMLElement = form.querySelector('[name="first_name"]')
      const secondName: HTMLElement = form.querySelector('[name="second_name"]')
      const phone: HTMLElement = form.querySelector('[name="phone"]')
      const data: Record<string, string> = {
        login: log.value,
        displayName: displayName.value,
        email: email.value,
        firstName: firstName.value,
        secondName: secondName.value,
        phone: phone.value,
      }
      console.log('Profile edit data :', data)
    }
  }
}

const ProfileEdit = new PageEditProfile()
export default ProfileEdit
