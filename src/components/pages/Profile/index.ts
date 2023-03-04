import tpl from './tpl.hbs'
import './ProfileModule.scss'
import Block from '../../../utils/Block/block'

interface PageProfileProps {}
class PageProfile extends Block {
  constructor(props: PageProfileProps) {
    super('div', props)
  }

  render() {
    return this.compile(tpl, this.props)
  }
}

const Profile = new PageProfile({})
export default Profile
