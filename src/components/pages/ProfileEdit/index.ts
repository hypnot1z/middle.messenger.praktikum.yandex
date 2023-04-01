import tpl from './tpl.hbs'
import Button from '../../UI/Button'
import Input from '../../UI/Input'
import Block from '../../../utils/Block/block'
import { Avatar } from '../../UI/Avatar'
import Validation from '../../../utils/Validation'
import './ProfileModule.scss'
import AuthController from '../../../controllers/AuthController'
import SettingController from '../../../controllers/SettingController'
import { ProfileData } from '../../../api/SetAPI'
import { withStore } from '../../../utils/Store'
import { User } from '../../../api/AuthAPI'
import { ProfileField } from '../../UI/ProfileFields'

interface ProfileProps extends User {}
interface EditProfileProps {
  events?: any
  tagName?: string
}
class PageEditProfile extends Block {
  constructor(props: EditProfileProps) {
    props.tagName = 'div'
    super(props)
    console.log('PP Props', this.props)
  }

  render() {
    return this.compile(tpl, this.props)
  }

  init() {
    this.children.avatar = new Avatar({
      to: '/settings',
    })
    this.children.button = new Button({
      text: 'Сохранить',
      id: 'edit-btn',
      type: 'submit',
      class: 'btn',
      events: { click: (e: Event) => this.onSubmit(e) },
    })
  }

  protected componentDidUpdate(
    oldProps: ProfileProps,
    newProps: ProfileProps
  ): boolean {
    this.children.inputMail = new Input({
      type: 'email',
      name: 'email',
      placeholder: newProps['email'],
      events: {
        blur: Validation,
      },
    })
    this.children.inputLogin = new Input({
      type: 'text',
      name: 'login',
      placeholder: newProps['login'],
      events: {
        blur: Validation,
      },
    })
    this.children.inputFname = new Input({
      type: 'text',
      name: 'first_name',
      placeholder: newProps['first_name'],
      events: {
        blur: Validation,
      },
    })
    this.children.inputSname = new Input({
      type: 'text',
      name: 'second_name',
      placeholder: newProps['second_name'],
      events: {
        blur: Validation,
      },
    })
    this.children.inputDname = new Input({
      type: 'text',
      name: 'display_name',
      placeholder: newProps['display_name'],
      events: {
        blur: Validation,
      },
    })
    this.children.inputTel = new Input({
      type: 'tel',
      name: 'phone',
      placeholder: newProps['phone'],
      events: {
        blur: Validation,
      },
    })
    this.setProps
    const userName = newProps['first_name']

    return false
  }
}

const withUser = withStore((state) => ({ ...state.user }))
const ProfileWU = withUser(PageEditProfile)
const EditProfile = new ProfileWU({})
export default EditProfile
