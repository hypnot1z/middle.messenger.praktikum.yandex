import tpl from './tpl.hbs'
import './ProfileModule.scss'
import Block from '../../../utils/Block/block'
import { Link } from '../../UI/Link'
import Button from '../../UI/Button'
import AuthController from '../../../controllers/AuthController'
import { withStore } from '../../../utils/Store'
import { User } from '../../../api/AuthAPI'
import { ProfileField } from '../../UI/ProfileFields'
import Avatar from '../../UI/Avatar'

interface ProfileProps extends User {}

export interface PageProfileProps {
  tagName?: string
  user: User
}
export class PageProfile extends Block {
  constructor(props: PageProfileProps) {
    props.tagName = 'div'
    super(props)
    console.log('Pageprofile props', this.props)
  }

  render() {
    return this.compile(tpl, this.props)
  }

  init() {
    // this.children.fields = userFields.map((name) => {
    //   return new ProfileField({ name, value: this.props[name] })
    // })
    
    // this.children.avatar = new Image({
    //   to: '/settings',
    //   src: ava,
    //   alt: 'Аватарка',
    //   size: '10',
    //   class: 'avatar'
    // })
    this.children.settings = new Link({
      to: '/settings',
      label: 'Изменить данные',
    })
    this.children.password = new Link({
      to: '/password',
      label: 'Изменить пароль',
    })
    this.children.chat = new Link({
      to: '/messenger',
      label: 'В чат',
    })
    this.children.logout = new Button({
      text: 'Выйти',
      id: 'logout-btn',
      type: 'button',
      class: 'btn',
      events: {
        click: () => AuthController.logout(),
      },
    })
  }

  protected componentDidUpdate(
    //@ts-ignore
    oldProps: ProfileProps,
    newProps: ProfileProps
  ): boolean {
    for (let key in newProps) {
      //@ts-ignore
      this.children.key = new ProfileField({ value: newProps[key] })
    }
    this.children.avatar = new Avatar({})
    return false
  }
}

// const Profile = new PageProfile({})

const withUser = withStore((state) => ({ ...state.user }))
const ProfileWU = withUser(PageProfile)
const Profile = new ProfileWU({})
export default Profile
// export const Profile = withUser(PageProfile)
