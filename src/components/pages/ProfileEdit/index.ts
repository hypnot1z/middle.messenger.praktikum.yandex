import tpl from './tpl.hbs'
import Button from '../../UI/Button'
import Input from '../../UI/Input'
import Block from '../../../utils/Block/block'
import { Image } from '../../UI/Img'
import avatar from '../../../img/avatarCap.svg'
import Validation from '../../../utils/Validation'
import './ProfileModule.scss'
import AuthController from '../../../controllers/AuthController'
import SettingController from '../../../controllers/SettingController'
import { ProfileData } from '../../../api/SetAPI'
import { withStore } from '../../../utils/Store'
import { User } from '../../../api/AuthAPI'
import { ProfileField } from '../../UI/ProfileFields'
import Avatar from '../../UI/Avatar'

interface ProfileProps extends User {}
interface EditProfileProps extends User {
  display_name?: string
  events?: any
  tagName?: string
}
class PageEditProfile extends Block {
  constructor(props: EditProfileProps) {
    props.tagName = 'div'
    super(props)
    console.log('PROF EDIT PROPS', this.props)
  }

  render() {
    return this.compile(tpl, this.props)
  }

  init() {
    // this.children.avatar = new Image({
    //   to: '/settings',
    //   src: avatar,
    //   size: '50',
    //   class: 'avatar',
    //   alt: 'Аватарка',
    // })
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
    console.log('EditProf data', data)

    SettingController.updateProfile(data)
  }

  protected componentDidUpdate(
    oldProps: EditProfileProps,
    newProps: EditProfileProps
  ): boolean {
    this.children.inputMail = new Input({
      type: 'email',
      name: 'email',
      value: newProps['email'],
      events: {
        blur: Validation,
      },
    })
    this.children.inputLogin = new Input({
      type: 'text',
      name: 'login',
      value: newProps['login'],
      events: {
        blur: Validation,
      },
    })
    this.children.inputFname = new Input({
      type: 'text',
      name: 'first_name',
      value: newProps['first_name'],
      events: {
        blur: Validation,
      },
    })
    this.children.inputSname = new Input({
      type: 'text',
      name: 'second_name',
      value: newProps['second_name'],
      events: {
        blur: Validation,
      },
    })
    this.children.inputDname = new Input({
      type: 'text',
      name: 'display_name',
      value: newProps['display_name'],
      events: {
        blur: Validation,
      },
    })
    this.children.inputTel = new Input({
      type: 'tel',
      name: 'phone',
      value: newProps['phone'],
      events: {
        blur: Validation,
      },
    })
    this.setProps
    const userName = newProps['first_name']

    this.children.avatar = new Avatar({})
    return false
  }
}

const withUser = withStore((state) => ({ ...state.user }))
const ProfileWU = withUser(PageEditProfile)
const EditProfile = new ProfileWU({})
export default EditProfile
