import tpl from './tpl.hbs'
import Button from '../../UI/Button'
import Input from '../../UI/Input'
import Block from '../../../utils/Block/block'
import FormData from '../../../utils/FormData'
import Validation from '../../../utils/Validation'
import { Image } from '../../UI/Img'
import './ProfileModule.scss'
import SettingController from '../../../controllers/SettingController'
import AuthAPI from '../../../api/AuthAPI'
import ava from '../../../img/avatarCap.svg'

interface EditPasswordProps {
  events: any
  tagName?: string
}
class PageEditPassword extends Block<EditPasswordProps, HTMLDivElement> {
  constructor(props: EditPasswordProps) {
    props.tagName = 'div'
    super(props)
  }

  render() {
    return this.compile(tpl, this.props)
  }

  init() {
    this.children.avatar = new Image({
      to: '/settings',
      src: ava,
      alt: 'Аватарка',
      size: '10',
      class: 'avatar'
    })
    this.children.inputOldPass = new Input({
      type: 'password',
      name: 'oldPassword',
      placeholder: 'Старый пароль',
      class: 'input',
      events: {
        blur: Validation,
      },
    })
    const inputOld: Input = <Input>this.children.inputOldPass
    inputOld.value = 'OldPass'

    this.children.inputNewPass = new Input({
      type: 'password',
      name: 'newPassword',
      placeholder: 'Новый пароль',
      class: 'input',
      events: {
        blur: Validation,
      },
    })
    const inputNew: Input = <Input>this.children.inputNewPass
    inputNew.value = 'NewPassword'

    this.children.inputPassRep = new Input({
      type: 'password',
      name: 'newPasswordRep',
      placeholder: 'Повторите пароль',
      class: 'input',
      events: {
        blur: Validation,
      },
    })
    const inputRepeat: Input = <Input>this.children.inputPassRep
    inputRepeat.value = 'NewPassword'

    this.children.button = new Button({
      text: 'Сохранить',
      id: 'edit-btn',
      type: 'submit',
      class: 'btn',
      events: { click: (event: Event) => this.onSubmit(event) },
    })
  }
  onSubmit(event: Event) {
    event.preventDefault()
    const values = Object.values(this.children)
      .filter((child) => child instanceof Input)
      .map((child) => [(child as Input).name, (child as Input).value])

    const data = Object.fromEntries(values)
    console.log('EditPass data', data)

    SettingController.updatePassword(data)
  }
}

const EditPassword = new PageEditPassword({ events: { submit: FormData } })
export default EditPassword
