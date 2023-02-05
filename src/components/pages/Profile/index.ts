import Handlebars from 'handlebars'
import tpl from 'bundle-text:./tpl.hbs'
import Button from '../../UI/Button'
import './ProfileModule.scss'
import Block from '../../../utils/Block/block'

class PageProfile extends Block {
  constructor(props) {
    super('div', props)
  }

  render() {
    const compile = Handlebars.compile(tpl)
    const res = compile()

    return res
  }
}

const Profile = new PageProfile()
export default Profile
