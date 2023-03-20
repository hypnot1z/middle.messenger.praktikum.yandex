import tpl from './tpl.hbs'
import './ProfileModule.scss'
import Block from '../../../utils/Block/block'
import { Link } from '../../UI/Link'
import AuthController from '../../../controllers/AuthController'

interface PageProfileProps {}
class PageProfile extends Block {
  constructor(props: PageProfileProps) {
    super('div', props)
  }

  render() {
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
  }
}

const Profile = new PageProfile({})
export default Profile
