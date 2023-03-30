import tpl from './tpl.hbs'
import Button from '../../UI/Button'
import Input from '../../UI/Input'
import Block from '../../../utils/Block/block'
import FormData from '../../../utils/FormData'
import Validation from '../../../utils/Validation'
import './ProfileModule.scss'
import AuthController from '../../../controllers/AuthController'
import SettingController from '../../../controllers/SettingController'
import { ProfileData } from '../../../api/SetAPI'
import { withStore } from '../../../utils/Store'

interface EditProfileProps {
  events?: any
  tagName?: string
}
class PageEditProfile extends Block {
  constructor(props: EditProfileProps) {
    props.tagName = 'div'
    super(props)
    // const usr = SettingController.fetchUser()
  }

  render() {
    return this.compile(tpl, this.props)
  }

  init() {
    this.children.inputMail = new Input({
      type: 'email',
      name: 'email',
      placeholder: 'ivan@mail.mu',
      events: {
        blur: Validation,
      },
    })
    this.children.inputLogin = new Input({
      type: 'text',
      name: 'login',
      placeholder: 'ivan',
      events: {
        blur: Validation,
      },
    })
    this.children.inputFname = new Input({
      type: 'text',
      name: 'first_name',
      placeholder: 'Иван',
      events: {
        blur: Validation,
      },
    })
    this.children.inputSname = new Input({
      type: 'text',
      name: 'second_name',
      placeholder: 'Иванов',
      events: {
        blur: Validation,
      },
    })
    this.children.inputDname = new Input({
      type: 'text',
      name: 'display_name',
      placeholder: 'Иван01',
      events: {
        blur: Validation,
      },
    })
    this.children.inputTel = new Input({
      type: 'tel',
      name: 'phone',
      placeholder: 'Телефон',
      events: {
        blur: Validation,
      },
    })
    this.children.button = new Button({
      text: 'Сохранить',
      id: 'edit-btn',
      type: 'submit',
      class: 'btn',
      events: { click: (e: Event) => this.onSubmit(e) },
    })
  }

  
}

const EditProfile = new PageEditProfile({})
export default EditProfile

// const withUser = withStore((state) => ({ ...state.user }))
// export const EditProfile = withUser(PageEditProfile)
