import tpl from './tpl.hbs'
import './ProfileModule.scss'
import Block from '../../../utils/Block/block'
import { Link } from '../../UI/Link'
import AuthController from '../../../controllers/AuthController'
import { withStore } from '../../../utils/Store'
import { User } from '../../../api/AuthAPI'

export interface PageProfileProps {
  tagName?: string
  user: User
}
export class PageProfile extends Block {
  constructor(props: PageProfileProps) {
    props.tagName = 'div'
    super(props)
    console.log('Profile PROPS-----------', this.props)
    console.log('Profile User?', this.props)
  }

  render() {
    // console.log('TARGET', store.getState())
    return this.compile(tpl, this.props)
  }

  init() {
    this.children.settings = new Link({
      to: '/settings',
      label: 'Изменить данные',
    })
    this.children.password = new Link({
      to: '/password',
      label: 'Изменить пароль',
    })
    this.children.logout = new Link({
      to: '/',
      label: 'Выйти',
      events: {
        click: AuthController.logout,
      },
    })
    // this.children.user = this.props
    // console.log('THS CHILDR', this.children.user)
  }
}

// const Profile = new PageProfile({})

const withUser = withStore((state) => ({ ...state.user }))
const ProfileWU = withUser(PageProfile)
const Profile = new ProfileWU({})
export default Profile
// export const Profile = withUser(PageProfile)
