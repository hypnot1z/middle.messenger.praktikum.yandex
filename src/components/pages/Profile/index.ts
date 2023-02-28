import tpl from './tpl.hbs'
import './ProfileModule.scss'
import Block from '../../../utils/Block/block'

class PageProfile extends Block {
  constructor(props) {
    super('div', props)
  }

  render() {
    return this.compile(tpl, this.props)
  }
}

const Profile = new PageProfile()
export default Profile
